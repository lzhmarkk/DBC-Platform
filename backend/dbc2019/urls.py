from django.urls import path

from . import views


app_name = 'dbc2019'

urlpatterns = [
    path('api/repository/dashboard/', views.api_repository_dashboard, name='api_repository_dashboard'),
    path('api/repository/in/', views.api_repository_in, name='api_repository_in'),
    path('api/repository/out/', views.api_repository_out, name='api_repository_out'),
    path('api/repository/trans/', views.api_repository_trans, name='api_repository_trans'),
    path('add_example/', views.add_example, name='add_example'),
    path('api/login/', views.api_login, name='api_login'),
    path('api/checkLogin/', views.api_checkLogin, name='api_checkLogin'),
    path('api/signup/', views.api_signup, name='api_signup'),
    path('api/order/', views.api_order, name='api_order')
]