from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Content(Base):
    __tablename__ = "content"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    type: Mapped[str] = mapped_column(String, nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    status: Mapped[str] = mapped_column(String, default="draft")
    date: Mapped[str] = mapped_column(String, default="")
    excerpt: Mapped[str] = mapped_column(Text, default="")
    image_url: Mapped[str] = mapped_column(String, default="")
    tag: Mapped[str] = mapped_column(String, default="")
