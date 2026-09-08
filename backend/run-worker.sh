#!/bin/bash
set -a
source .env
set +a
exec .venv/bin/celery -A app.core.celery_app.celery_app worker --loglevel=info -n akademia_worker@%h
