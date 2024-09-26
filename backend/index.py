from fastapi import FastAPI
from routers import auth


app = FastAPI()


# Include the auth router
app.include_router(auth.router)

@app.get("/")
async def read_root():
    return {"message": "Welcome to the app!"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
