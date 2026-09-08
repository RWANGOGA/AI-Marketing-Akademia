#!/bin/bash
set -a
source .env
set +a
exec .venv/bin/uvicorn app.main:app --reload --port 9000
