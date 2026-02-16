from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.apps.core.docs import (
    get_pricing_schema,
    get_sauna_config_schema,
    get_sauna_gallery_schema,
)
from backend.apps.core.models import Pricing, SaunaConfig, SaunaGallery
from backend.apps.core.serializers import (
    PricingSerializer,
    SaunaConfigSerializer,
    SaunaGallerySerializer,
)


class SaunaConfigView(APIView):
    permission_classes = [AllowAny]

    @get_sauna_config_schema
    def get(self, request: Request) -> Response:
        sauna_config = SaunaConfig.get()
        sauna_config_serializer = SaunaConfigSerializer(sauna_config)
        return Response(sauna_config_serializer.data)


class PricingView(APIView):
    permission_classes = [AllowAny]

    @get_pricing_schema
    def get(self, request: Request) -> Response:
        query_set = Pricing.objects.all()  # TODO: Add Cache
        serializer = PricingSerializer(query_set, many=True)
        return Response(serializer.data)


class SaunaGalleryView(APIView):
    permission_classes = [AllowAny]

    @get_sauna_gallery_schema
    def get(self, request: Request) -> Response:
        query_set = SaunaGallery.objects.filter(is_active=True)
        serializer = SaunaGallerySerializer(query_set, many=True)
        return Response(serializer.data)
