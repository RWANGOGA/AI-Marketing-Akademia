from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Campaign(Base):
    __tablename__ = "campaigns"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    product_id: Mapped[str] = mapped_column(ForeignKey("products.id"))
    target: Mapped[str] = mapped_column(Text, default="")
    status: Mapped[str] = mapped_column(String, default="running")
    found: Mapped[int] = mapped_column(Integer, default=0)
    contacted: Mapped[int] = mapped_column(Integer, default=0)
    responded: Mapped[int] = mapped_column(Integer, default=0)
    interested: Mapped[int] = mapped_column(Integer, default=0)
    meetings: Mapped[int] = mapped_column(Integer, default=0)
    customers: Mapped[int] = mapped_column(Integer, default=0)
