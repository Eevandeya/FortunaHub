from django.urls import path

from backend.apps.products.views import ProductsView

app_name = "inventory"

urlpatterns = [
    path("", ProductsView.as_view(), name="products"),
]
