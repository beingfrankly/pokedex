import httpx

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.main import api_router
from backend.app.core.db import create_tables

base_url = "https://pokeapi.co/api/v2/pokemon/"

origins = ["http://localhost:4200"]


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    async with httpx.AsyncClient(base_url=base_url) as client:
        yield {"client": client}
    await client.aclose()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
