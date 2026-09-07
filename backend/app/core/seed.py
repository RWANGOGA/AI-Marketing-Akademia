import uuid
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import AsyncSessionLocal
from app.models.product import Product


PRODUCTS = [
    {
        "id": str(uuid.uuid4()),
        "name": "AI Port",
        "slug": "port",
        "published": True,
        "problem": "Scaling personalized outreach is slow and inconsistent.",
        "target": "Growth teams and founders doing outbound.",
        "description": "AI Port finds, qualifies, and drafts outreach to high-fit leads at scale.",
        "features": ["Lead discovery", "Enrichment", "Personalized drafts", "Sequences"],
        "benefits": ["More meetings", "Less manual research", "Consistent follow-up"],
    },
    {
        "id": str(uuid.uuid4()),
        "name": "AI Recruiter",
        "slug": "recruiter",
        "published": True,
        "problem": "Screening candidates is time-consuming and prone to bias.",
        "target": "Recruiting teams and talent ops.",
        "description": "AI Recruiter surfaces top candidates, ranks fit, and automates initial outreach.",
        "features": ["Resume parsing", "Fit scoring", "Outreach templates", "Pipeline sync"],
        "benefits": ["Faster shortlists", "Reduced bias", "Better candidate experience"],
    },
    {
        "id": str(uuid.uuid4()),
        "name": "AI Dojo",
        "slug": "dojo",
        "published": True,
        "problem": "Sales reps lose deals because they are not practiced on objection handling.",
        "target": "Revenue teams and sales enablement.",
        "description": "AI Dojo runs realistic objection-handling drills with instant feedback and scoring.",
        "features": ["Scenario generator", "Real-time feedback", "Progress tracking", "Team leaderboards"],
        "benefits": ["Higher win rates", "Faster ramp", "Confident reps"],
    },
    {
        "id": str(uuid.uuid4()),
        "name": "AI World",
        "slug": "world",
        "published": True,
        "problem": "Global expansion requires local market knowledge.",
        "target": "Marketing and expansion leads.",
        "description": "AI World monitors regional trends, competitors, and regulations so you can enter new markets faster.",
        "features": ["Market reports", "Competitor tracking", "Regulatory alerts", "Localized playbooks"],
        "benefits": ["Faster market entry", "Lower risk", "Local credibility"],
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
