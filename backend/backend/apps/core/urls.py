from django.urls import path

from .views import ConfigView

app_name = "core"

urlpatterns = [
    path("", ConfigView.as_view(), name="sauna_config"),
]
