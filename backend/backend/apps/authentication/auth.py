from decouple import config
from django.http import HttpRequest as Request
from drf_spectacular.extensions import OpenApiAuthenticationExtension
from drf_spectacular.openapi import AutoSchema
from rest_framework import authentication
from rest_framework.exceptions import AuthenticationFailed


class APIKeyHeaderAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request: Request) -> tuple[None, None]:
        api_key = request.headers.get("X-API-Key")
        if api_key != config("API_SECRET_KEY"):
            raise AuthenticationFailed("Invalid API key.")
        return None, None  # Mr. Fish


class APIKeyHeaderAuthenticationScheme(OpenApiAuthenticationExtension):
    target_class = "backend.apps.authentication.auth.APIKeyHeaderAuthentication"
    name = "MyAuthentication"

    def get_security_definition(self, auto_schema: AutoSchema) -> dict[str, str]:
        return {
            "type": "apiKey",
            "in": "header",
            "name": "X-API-Key",
        }
