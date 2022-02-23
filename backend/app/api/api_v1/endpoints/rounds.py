import asyncio
from typing import Any, Optional
from fastapi import APIRouter, Depends, HTTPException, Query

router = APIRouter()
RECIPE_SUBREDDITS = ["recipes", "easyrecipes", "TopSecretRecipes"]


@router.get("/{recipe_id}", status_code=200, response_model=AlgorandRound)
def fetch_round(
    *,
    round_num: int,
) -> Any:
    """
    Fetch a single recipe by ID
    """
    result = crud.recipe.get(db=db, id=recipe_id)
    if not result:
        # the exception is raised, not returned - you will get a validation
        # error otherwise.
        raise HTTPException(
            status_code=404, detail=f"Round number {round_num} not found"
        )

    return result


@router.get("/my-recipes/", status_code=200, response_model=RecipeSearchResults)
def fetch_user_recipes(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Fetch all recipes for a user
    """
    recipes = current_user.recipes
    print(recipes)
    if not recipes:
        return {"results": list()}

    return {"results": list(recipes)}


@router.get("/search/", status_code=200, response_model=RecipeSearchResults)
def search_recipes(
    *,
    keyword: str = Query(None, min_length=3, example="chicken"),
    max_results: Optional[int] = 10,
    db: Session = Depends(deps.get_db),
) -> dict:
    """
    Search for recipes based on label keyword
    """
    recipes = crud.recipe.get_multi(db=db, limit=max_results)
    results = filter(lambda recipe: keyword.lower() in recipe.label.lower(), recipes)

    return {"results": list(results)}