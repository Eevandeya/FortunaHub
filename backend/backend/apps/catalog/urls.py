from django.urls import path

from backend.apps.catalog.views import InventoryItemView, SaunaPricingView

app_name = "catalog"

urlpatterns = [
    path("inventory-items", InventoryItemView.as_view(), name="inventory_items"),
    path("sauna-pricing/", SaunaPricingView.as_view(), name="sauna_pricing"),
]
