from django.urls import path

from . import views

app_name = 'dbc2019'

urlpatterns = [
    path('add_example/', views.add_example, name='add_example'),
    path('serializer_foreignkey', views.serializer_foreignkey, name='serializer_foreignkey')
]
