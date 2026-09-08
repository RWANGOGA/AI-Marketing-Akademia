from celery import Celery
from app.core.config import settings

celery_app = Celery(
    "akademia_automator",
    broker=f"redis://{settings.redis_host}:{settings.redis_port}/0",
    backend=f"redis://{settings.redis_host}:{settings.redis_port}/0",
    include=["app.tasks.automation", "app.tasks.content"],
)

celery_app.conf.update(
    result_extended=True,
    task_track_started=True,
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="UTC",
    enable_utc=True,
)
