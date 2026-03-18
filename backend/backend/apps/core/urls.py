from django.urls import path

from backend.apps.core.views import SaunaGalleryView, SaunaSettingsView

app_name = "core"

urlpatterns = [
    path("sauna-settings/", SaunaSettingsView.as_view(), name="sauna_config"),
    path("sauna-gallery/", SaunaGalleryView.as_view(), name="sauna_gallery"),
]
