from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Lead(Base):
    __tablename__ = "leads"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    company: Mapped[str] = mapped_column(String, nullable=False)
    website: Mapped[str] = mapped_column(String, default="")
    industry: Mapped[str] = mapped_column(String, default="")
    location: Mapped[str] = mapped_column(String, default="")
    contact: Mapped[str] = mapped_column(String, default="")
    email: Mapped[str] = mapped_column(String, default="")
    product_id: Mapped[str] = mapped_column(ForeignKey("products.id"))
    status: Mapped[str] = mapped_column(String, default="new")
    problem: Mapped[str] = mapped_column(Text, default="")
    reasoning: Mapped[str] = mapped_column(Text, default="")
    last_contact: Mapped[str] = mapped_column(String, default="")
