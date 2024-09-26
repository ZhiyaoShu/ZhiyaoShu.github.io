import os
import requests
import urllib.parse
from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse, JSONResponse
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

ZOTERO_CLIENT_KEY = os.getenv("ZOTERO_CLIENT_KEY")
ZOTERO_CLIENT_SECRET = os.getenv("ZOTERO_CLIENT_SECRET")
ZOTERO_REDIRECT_URI = os.getenv("ZOTERO_REDIRECT_URI")
ZOTERO_REQUEST_TOKEN_URL = "https://www.zotero.org/oauth/request"
ZOTERO_ACCESS_TOKEN_URL = "https://www.zotero.org/oauth/access"
ZOTERO_AUTHORIZE_URL = "https://www.zotero.org/oauth/authorize"

router = APIRouter()


@router.get("/login")
async def login():
    try:
        # Step 1: Get the request token
        response = requests.post(
            ZOTERO_REQUEST_TOKEN_URL,
            data={
                "oauth_callback": ZOTERO_REDIRECT_URI,
                "oauth_consumer_key": ZOTERO_CLIENT_KEY,
                "oauth_signature_method": "HMAC-SHA1",
            },
        )

        # Debug: Print the raw response content
        print(f"Zotero Response: {response.text}")

        # Parse the response (Zotero sends url-encoded data)
        request_token_data = urllib.parse.parse_qs(response.text)

        # Check if the request_token exists in the response
        if "oauth_token" in request_token_data:
            request_token = request_token_data.get("oauth_token")[0]
            # Redirect the user to the Zotero authorization page
            return RedirectResponse(
                f"{ZOTERO_AUTHORIZE_URL}?oauth_token={request_token}"
            )
        else:
            # If 'oauth_token' is missing, return an error
            return JSONResponse(
                status_code=500,
                content={"error": "Request token missing from response"},
            )

    except Exception as e:
        # Print detailed error for debugging
        print(f"Error during Zotero OAuth request: {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})


@router.get("/callback")
async def oauth_callback(request: Request):
    oauth_token = request.query_params.get("oauth_token")
    oauth_verifier = request.query_params.get("oauth_verifier")

    try:
        response = requests.post(
            ZOTERO_ACCESS_TOKEN_URL,
            data={
                "oauth_token": oauth_token,
                "oauth_verifier": oauth_verifier,
                "oauth_consumer_key": ZOTERO_CLIENT_KEY,
                "oauth_signature_method": "HMAC-SHA1",
            },
        )

        access_token_data = urllib.parse.parse_qs(response.text)
        access_token = access_token_data.get("oauth_token")[0]
        access_secret = access_token_data.get("oauth_token_secret")[0]

        return JSONResponse(
            content={"access_token": access_token, "access_secret": access_secret}
        )

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
