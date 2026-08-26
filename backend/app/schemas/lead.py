from pydantic import BaseModel, ConfigDict


class LeadBase(BaseModel):
    company: str
    website: str = ""
    industry: str = ""
    location: str = ""
    contact: str = ""
    email: str = ""
    product_id: str
    status: str = "new"
    problem: str = ""
    reasoning: str = ""
    last_contact: str = ""


class LeadCreate(LeadBase):
    id: str


class LeadOut(LeadBase):
    model_config = ConfigDict(from_attributes=True)
    id: str
