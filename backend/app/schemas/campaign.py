from pydantic import BaseModel, ConfigDict


class CampaignBase(BaseModel):
    name: str
    product_id: str
    target: str = ""
    status: str = "running"
    found: int = 0
    contacted: int = 0
    responded: int = 0
    interested: int = 0
    meetings: int = 0
    customers: int = 0


class CampaignCreate(CampaignBase):
    id: str


class CampaignOut(CampaignBase):
    model_config = ConfigDict(from_attributes=True)
    id: str
