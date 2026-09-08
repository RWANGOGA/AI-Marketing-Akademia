"""
Tests for the Celery automation tasks.

These tests mock the Groq API calls so they can run without network access.
"""
import pytest
from sqlalchemy import select

from app.models.product import Product
from app.models.lead import Lead
from app.models.automation import Automation


@pytest.fixture
async def seed_product(db_session):
    product = Product(
        id="prod-test-1",
        name="AI Pod",
        slug="pod",
        published=True,
        problem="Work scattered across tools",
        target="Teams and departments",
        description="Task management and reporting",
        features=[],
        benefits=[],
        capabilities=[],
    )
    db_session.add(product)
    await db_session.commit()
    return product


@pytest.fixture
async def seed_automation(db_session):
    automation = Automation(
        id="A1",
        name="Lead Discovery",
        status="running",
        last_run="",
        result="",
    )
    db_session.add(automation)
    await db_session.commit()
    return automation


MOCK_LEADS = [
    {
        "company": "Test Company",
        "website": "https://test.com",
        "industry": "Technology",
        "location": "Nairobi, Kenya",
        "contact": "Jane Doe",
        "email": "jane@test.com",
        "problem": "Needs task management",
    },
    {
        "company": "Another Co",
        "website": "https://another.com",
        "industry": "Technology",
        "location": "Kampala, Uganda",
        "contact": "John Smith",
        "email": "john@another.com",
        "problem": "Needs reporting",
    },
    {
        "company": "Third Inc",
        "website": "https://third.com",
        "industry": "Technology",
        "location": "Lagos, Nigeria",
        "contact": "Sam Wilson",
        "email": "sam@third.com",
        "problem": "Needs AI chat",
    },
]


async def mock_call_groq_json(prompt, system_prompt, **kwargs):
    return MOCK_LEADS


async def mock_call_groq(prompt, system_prompt, **kwargs):
    return "This company is a good fit because they need task management solutions."


@pytest.mark.anyio
async def test_discover_leads_creates_leads(db_session, seed_product, seed_automation, monkeypatch):
    monkeypatch.setattr("app.tasks.automation.call_groq_json", mock_call_groq_json)
    monkeypatch.setattr("app.tasks.automation.call_groq", mock_call_groq)

    monkeypatch.setattr(
        "app.tasks.automation.AsyncSessionLocal",
        lambda: db_session,
    )

    from app.tasks.automation import discover_leads_for_product

    result = await discover_leads_for_product("pod")

    assert result["product"] == "AI Pod"
    assert result["leads_found"] == 3
    assert len(result["lead_ids"]) == 3

    lead_result = await db_session.execute(
        select(Lead).where(Lead.product_id == "prod-test-1")
    )
    leads = lead_result.scalars().all()
    assert len(leads) == 3

    lead = leads[0]
    assert lead.company == "Test Company"
    assert lead.email == "jane@test.com"
    assert lead.status == "new"
    assert len(lead.reasoning) > 0


@pytest.mark.anyio
async def test_discover_leads_product_not_found(db_session, monkeypatch):
    from app.tasks.automation import discover_leads_for_product

    monkeypatch.setattr(
        "app.tasks.automation.AsyncSessionLocal",
        lambda: db_session,
    )

    with pytest.raises(ValueError, match="Product with slug 'nonexistent' not found"):
        await discover_leads_for_product("nonexistent")


@pytest.mark.anyio
async def test_discover_leads_updates_automation(db_session, seed_product, seed_automation, monkeypatch):
    monkeypatch.setattr("app.tasks.automation.call_groq_json", mock_call_groq_json)
    monkeypatch.setattr("app.tasks.automation.call_groq", mock_call_groq)

    monkeypatch.setattr(
        "app.tasks.automation.AsyncSessionLocal",
        lambda: db_session,
    )

    from app.tasks.automation import discover_leads_for_product

    result = await discover_leads_for_product("pod")
    assert result["leads_found"] == 3

    automation_result = await db_session.execute(
        select(Automation).where(Automation.id == "A1")
    )
    automation = automation_result.scalar_one_or_none()
    assert automation is not None
    assert automation.last_run != ""
    assert "Discovered 3 new leads" in automation.result
