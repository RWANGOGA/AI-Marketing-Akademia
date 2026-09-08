from pydantic import BaseModel, ConfigDict


class EmailBase(BaseModel):
    lead_name: str = ""
    product_name: str = ""
    status: str = "draft"
    subject: str = ""
    body: str = ""


class EmailCreate(EmailBase):
    id: str


class EmailOut(EmailBase):
    model_config = ConfigDict(from_attributes=True)
    id: str
