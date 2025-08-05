from django.urls import path

from backend.apps.inventory.views import InventoryView

app_name = "inventory"

urlpatterns = [
    path("", InventoryView.as_view(), name="inventory_items"),
]
