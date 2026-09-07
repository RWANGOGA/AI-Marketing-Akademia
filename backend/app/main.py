from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routers import campaigns, contact, dashboard, leads, products
from app.core.config import settings

app = FastAPI(title="Akademia AI Marketing System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])
app.include_router(leads.router, prefix="/api/leads", tags=["leads"])
app.include_router(campaigns.router, prefix="/api/campaigns", tags=["campaigns"])
app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(contact.router, prefix="/api/contact", tags=["contact"])


@app.get("/health")
def health():
    return {"status": "ok"}
