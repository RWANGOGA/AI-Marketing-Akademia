from pydantic import BaseModel, ConfigDict


class PublishLogBase(BaseModel):
    product_id: str
    platform: str
    status: str = "pending"
    post_url: str = ""
    error: str = ""
    created_at: str = ""


class PublishLogCreate(PublishLogBase):
    id: str


class PublishLogOut(PublishLogBase):
    model_config = ConfigDict(from_attributes=True)
    id: str
