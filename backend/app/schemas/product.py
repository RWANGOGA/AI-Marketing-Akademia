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
    category: str = "general"
    price: str = ""
    image_url: str = ""


class ProductCreate(ProductBase):
    id: str


class ProductUpdate(BaseModel):
    name: str | None = None
    slug: str | None = None
    published: bool | None = None
    problem: str | None = None
    target: str | None = None
    description: str | None = None
    features: list[str] | None = None
    benefits: list[str] | None = None
    capabilities: list[dict] | None = None
    category: str | None = None
    price: str | None = None
    image_url: str | None = None


class ProductOut(ProductBase):
    id: str
    marketing_status: str = "pending"
    marketing_result: str = ""

    model_config = ConfigDict(from_attributes=True)
