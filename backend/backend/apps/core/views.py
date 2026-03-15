from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.apps.core.docs import (
    get_sauna_gallery_schema,
    get_sauna_settings_schema,
)
from backend.apps.core.models import SaunaGallery, SaunaSettings
from backend.apps.core.serializers import (
    SaunaGallerySerializer,
    SaunaSettingsSerializer,
)


class SaunaSettingsView(APIView):
    permission_classes = [AllowAny]

    @get_sauna_settings_schema
    def get(self, request: Request) -> Response:
        sauna_settings = SaunaSettings.get()
        serializer = SaunaSettingsSerializer(sauna_settings)
        return Response(serializer.data)


class SaunaGalleryView(APIView):
    permission_classes = [AllowAny]

    @get_sauna_gallery_schema
    def get(self, request: Request) -> Response:
        query_set = SaunaGallery.objects.filter(is_active=True)
        serializer = SaunaGallerySerializer(query_set, many=True)
        return Response(serializer.data)
