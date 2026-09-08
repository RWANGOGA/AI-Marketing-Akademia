from pydantic import BaseModel, ConfigDict


class GeneratedContentBase(BaseModel):
    product_id: str
    platform: str
    caption: str = ""
    hashtags: str = ""
    call_to_action: str = ""
    status: str = "generated"


class GeneratedContentCreate(GeneratedContentBase):
    id: str


class GeneratedContentOut(GeneratedContentBase):
    model_config = ConfigDict(from_attributes=True)
    id: str
