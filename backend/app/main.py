import uvicorn
from fastapi import FastAPI, Request, APIRouter
from fastapi import status as statuscode
from backend import settings
from api.api_v1.api import api_router

app = FastAPI(title="Recipe API")

app.include_router(api_router, prefix=settings.API_V1_STR)


if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")