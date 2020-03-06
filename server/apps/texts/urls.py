from django.urls import path, include
from rest_framework import routers
from server.apps.texts import views

router = routers.DefaultRouter()
router.register(r'texts', views.TextViewSet)
router.register(r'sentences', views.SentenceViewSet)

app_name = 'texts'
urlpatterns = [
    path('', include(router.urls)),
]
