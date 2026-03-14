from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.apps.products.docs import get_products_schema
from backend.apps.products.models import Product
from backend.apps.products.serializers import ProductSerializer


class ProductsView(APIView):
    permission_classes = [AllowAny]

    @get_products_schema
    def get(self, request: Request) -> Response:
        query_set = Product.objects.filter(is_active=True)
        serializer = ProductSerializer(query_set, many=True)
        return Response(serializer.data)
