from django.urls import path

from .views import InventoryView

app_name = "inventory"

urlpatterns = [
    path("", InventoryView.as_view(), name="inventory_items"),
]
