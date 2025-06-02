from decouple import config
from django.http import HttpRequest as Request
from rest_framework import authentication
from rest_framework.exceptions import AuthenticationFailed


class APIKeyHeaderAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request: Request) -> tuple[None, None]:
        api_key = request.headers.get("X-API-Key")
        if api_key != config("API_SECRET_KEY"):
            raise AuthenticationFailed("Invalid API key.")
        return None, None  # Mr. Fish
