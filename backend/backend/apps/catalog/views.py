from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.apps.catalog.docs import (
    get_inventory_items_schema,
    get_sauna_pricing_schema,
)
from backend.apps.catalog.models import InventoryItem, SaunaPricing
from backend.apps.catalog.serializers import (
    InventoryItemSerializer,
    SaunaPricingSerializer,
)


class InventoryItemView(APIView):
    permission_classes = [AllowAny]

    @get_inventory_items_schema
    def get(self, request: Request) -> Response:
        query_set = InventoryItem.objects.filter(is_active=True)
        serializer = InventoryItemSerializer(query_set, many=True)
        return Response(serializer.data)


class SaunaPricingView(APIView):
    permission_classes = [AllowAny]

    @get_sauna_pricing_schema
    def get(self, request: Request) -> Response:
        query_set = SaunaPricing.objects.all()  # TODO: Add Cache
        serializer = SaunaPricingSerializer(query_set, many=True)
        return Response(serializer.data)
