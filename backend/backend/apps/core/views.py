from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.apps.core.docs import get_sauna_config_schema
from backend.apps.core.models import Pricing, SaunaConfig
from backend.apps.core.serializers import PricingConfigSerializer, SaunaConfigSerializer


class ConfigView(APIView):
    permission_classes = [AllowAny]

    @get_sauna_config_schema
    def get(self, request: Request) -> Response:
        current_sauna_config = SaunaConfig.get()
        current_pricing_config = {
            "prepayment": Pricing.get_prepayment_amount(),
            "hourly_rent": Pricing.get_hourly_rent_price(),
        }
        sauna_config_serializer = SaunaConfigSerializer(current_sauna_config)
        pricing_config_serializer = PricingConfigSerializer(current_pricing_config)
        return Response(
            {
                **sauna_config_serializer.data,
                **pricing_config_serializer.data,
            }
        )
