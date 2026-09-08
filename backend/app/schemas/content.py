from pydantic import BaseModel, ConfigDict


class ContentBase(BaseModel):
    type: str
    title: str
    status: str = "draft"
    date: str = ""
    excerpt: str = ""
    image_url: str = ""
    tag: str = ""


class ContentCreate(ContentBase):
    id: str


class ContentOut(ContentBase):
    model_config = ConfigDict(from_attributes=True)
    id: str
