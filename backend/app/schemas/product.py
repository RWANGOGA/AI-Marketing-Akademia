from pydantic import BaseModel, ConfigDict


class ProductBase(BaseModel):
    name: str
    slug: str
    published: bool = False
    problem: str
    target: str
    description: str
    features: list[str] = []
    benefits: list[str] = []
    capabilities: list[dict] = []


class ProductCreate(ProductBase):
    id: str


class ProductOut(ProductBase):
    model_config = ConfigDict(from_attributes=True)
    id: str
