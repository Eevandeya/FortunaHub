from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.apps.authentication.auth import APIKeyHeaderAuthentication
from backend.apps.inventory.models import InventoryItem
from backend.apps.inventory.serializers import InventoryItemSerializer


class InventoryView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [APIKeyHeaderAuthentication]

    def get(self, request: Request) -> Response:
        query_set = InventoryItem.objects.all()
        serializer = InventoryItemSerializer(query_set, many=True)
        return Response(serializer.data)
