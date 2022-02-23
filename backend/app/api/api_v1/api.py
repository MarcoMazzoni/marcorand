from fastapi import APIRouter
from endpoints import rounds, transactions, address

api_router = APIRouter()
api_router.include_router(rounds.router, prefix="/rounds", tags=["rounds"])
api_router.include_router(transactions.router, prefix="/transactions", tags=["transactions"])
api_router.include_router(address.router, prefix="/address", tags=["address"])
