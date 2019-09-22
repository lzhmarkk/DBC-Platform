from django.urls import path

from . import views

app_name = 'dbc2019'

urlpatterns = [
    path('', views.index, name='index'),
    path('repo/', views.repo)
]
