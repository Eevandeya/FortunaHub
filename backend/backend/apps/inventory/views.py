from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.apps.inventory.docs import get_inventory_schema
from backend.apps.inventory.models import InventoryItem
from backend.apps.inventory.serializers import InventoryItemSerializer


class InventoryView(APIView):
    permission_classes = [AllowAny]

    @get_inventory_schema
    def get(self, request: Request) -> Response:
        query_set = InventoryItem.objects.all()
        serializer = InventoryItemSerializer(query_set, many=True)
        return Response(serializer.data)
