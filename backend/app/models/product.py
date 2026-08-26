from sqlalchemy import Boolean, String, Text
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Product(Base):
    __tablename__ = "products"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    slug: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    published: Mapped[bool] = mapped_column(Boolean, default=False)
    problem: Mapped[str] = mapped_column(Text)
    target: Mapped[str] = mapped_column(Text)
    description: Mapped[str] = mapped_column(Text)
    features: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
    benefits: Mapped[list[str]] = mapped_column(ARRAY(String), default=list)
