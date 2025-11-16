from django.urls import path

from backend.apps.core.views import PricingView, SaunaConfigView

app_name = "core"

urlpatterns = [
    path("sauna-config/", SaunaConfigView.as_view(), name="sauna_config"),
    path("pricing/", PricingView.as_view(), name="pricing"),
]
