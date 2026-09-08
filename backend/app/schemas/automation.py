from pydantic import BaseModel, ConfigDict


class AutomationBase(BaseModel):
    name: str
    status: str = "stopped"
    last_run: str = ""
    result: str = ""


class AutomationCreate(AutomationBase):
    id: str


class AutomationOut(AutomationBase):
    model_config = ConfigDict(from_attributes=True)
    id: str
