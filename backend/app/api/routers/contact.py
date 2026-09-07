from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
import uuid

from app.core.database import get_db
from app.models.lead import Lead
from app.models.product import Product
from app.schemas.lead import LeadOut


class ContactForm(BaseModel):
    name: str
    email: str
    company: str
    message: str
    product_slug: str | None = None


router = APIRouter()


@router.post("/", response_model=LeadOut, status_code=201)
async def create_contact(form: ContactForm, db: AsyncSession = Depends(get_db)):
    product_id = ""
    if form.product_slug:
        result = await db.execute(select(Product).where(Product.slug == form.product_slug))
        product = result.scalar_one_or_none()
        if product:
            product_id = product.id

    lead = Lead(
        id=str(uuid.uuid4()),
        company=form.company,
        email=form.email,
        contact=form.name,
        product_id=product_id,
        problem=form.message,
        status="new",
    )
    db.add(lead)
    await db.commit()
    await db.refresh(lead)
    return lead
