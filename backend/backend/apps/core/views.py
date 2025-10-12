from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.apps.core.docs import get_sauna_config_schema
from backend.apps.core.models import SaunaConfig
from backend.apps.core.serializers import SaunaConfigSerializer


class ConfigView(APIView):
    permission_classes = [AllowAny]

    @get_sauna_config_schema
    def get(self, request: Request) -> Response:
        current_config = SaunaConfig.get()
        serializer = SaunaConfigSerializer(current_config)
        return Response(serializer.data)
