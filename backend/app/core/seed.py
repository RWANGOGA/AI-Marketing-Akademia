import uuid
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import AsyncSessionLocal
from app.models.product import Product


PRODUCTS = [
    {
        "id": str(uuid.uuid4()),
        "name": "AI Pod",
        "slug": "pod",
        "published": True,
        "problem": "Work is scattered across tools and pulling together an honest picture of progress takes hours every week.",
        "target": "Best for: Teams and departments who need one shared view of what's being worked on, without chasing status updates.",
        "description": "A task management and reporting system with AI built in.",
        "features": [],
        "benefits": [],
        "capabilities": [
            {"icon": "pod", "title": "Task management", "body": "Shared boards keep every task, owner and deadline visible in one place."},
            {"icon": "report", "title": "Reporting", "body": "Progress is turned into clear reports automatically, no manual compiling."},
            {"icon": "chat", "title": "AI chat", "body": "Ask AI Pod a direct question about your team's work and get a plain answer."},
        ],
    },
    {
        "id": str(uuid.uuid4()),
        "name": "AI Recruiter",
        "slug": "recruiter",
        "published": True,
        "problem": "HR teams post a job, then spend hours manually reading applications to work out who is actually worth a call.",
        "target": "Best for: HR teams and recruiters who need to match open roles with suitable candidates faster, without losing quality.",
        "description": "An AI-powered recruiting and HR platform.",
        "features": [],
        "benefits": [],
        "capabilities": [
            {"icon": "jobs", "title": "Job matching", "body": "Open roles are connected with relevant candidate information automatically."},
            {"icon": "match", "title": "Candidate insight", "body": "See why a candidate fits a role, not just that they applied."},
            {"icon": "recruiter", "title": "HR workflow", "body": "Built around how HR teams actually review and shortlist people."},
        ],
    },
    {
        "id": str(uuid.uuid4()),
        "name": "AI Dojo",
        "slug": "dojo",
        "published": True,
        "problem": "Working with AI often feels flat and impersonal, hidden behind a plain text box.",
        "target": "Best for: Anyone who wants a more engaging, personalised way to interact with AI — for training, support, or simply exploring.",
        "description": "Interactive AI avatars for a more personal experience.",
        "features": [],
        "benefits": [],
        "capabilities": [
            {"icon": "avatar", "title": "AI avatars", "body": "Choose an avatar and interact with it directly, in real time."},
            {"icon": "spark", "title": "Personalised", "body": "Each interaction adapts to you, not a generic script."},
            {"icon": "chat", "title": "Engaging by design", "body": "Built to be more memorable than a plain chat window."},
        ],
    },
    {
        "id": str(uuid.uuid4()),
        "name": "AI World",
        "slug": "world",
        "published": True,
        "problem": "Experiencing a place before you visit — or without being able to travel at all — is usually limited to photos and video.",
        "target": "Best for: Travellers planning a trip, tourism organisations and anyone curious about exploring Japan virtually.",
        "description": "A virtual world built around Japan.",
        "features": [],
        "benefits": [],
        "capabilities": [
            {"icon": "map", "title": "Explore Japan", "body": "Move through a virtual representation of Japan's places and culture."},
            {"icon": "guide", "title": "Guided tours", "body": "Supports guided, tour-style experiences, not just free roaming."},
            {"icon": "world", "title": "Tourism-ready", "body": "Built to support real tourism and travel-preparation use cases."},
        ],
    },
]


async def seed_products(db: AsyncSession) -> None:
    for product_data in PRODUCTS:
        result = await db.execute(select(Product).where(Product.slug == product_data["slug"]))
        existing = result.scalar_one_or_none()
        if existing:
            for key, value in product_data.items():
                setattr(existing, key, value)
        else:
            product = Product(**product_data)
            db.add(product)
    await db.commit()


if __name__ == "__main__":
    import asyncio

    async def main() -> None:
        async with AsyncSessionLocal() as db:
            await seed_products(db)

    asyncio.run(main())
