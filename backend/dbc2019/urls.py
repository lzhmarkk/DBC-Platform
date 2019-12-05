from django.urls import path

from . import views


app_name = 'dbc2019'

urlpatterns = [
    path('api/repository/dashboard/', views.api_repository_dashboard, name='api_repository_dashboard'),
    path('api/repository/in/', views.api_repository_in, name='api_repository_in'),
    path('api/repository/out/', views.api_repository_out, name='api_repository_out'),
    path('api/repository/trans/', views.api_repository_trans, name='api_repository_trans'),
    path('add_example/', views.add_example, name='add_example'),
    path('api/order/index/', views.api_order_index, name='api_order_index'),
    path('api/order/<int:order_id>', views.api_order, name='api_order'),
    path('api/account/', views.api_account, name='api_account'),
    path('api/client/index/', views.api_client_index, name='api_client_index'),
    path('api/client/<int:client_id>', views.api_client, name='api_client'),
    path('api/index/', views.api_index, name='api_index'),
    path('api/userInfo/', views.api_userInfo, name='api_userInfo'),
    path('api/login/', views.api_login, name='api_login'),
    path('api/signup/', views.api_signup, name='api_signup'),
    path('api/repository/<int:repo_id>/', views.api_repository, name='api_repository'),
    path('api/checkLogin/', views.api_checkLogin, name='api_checkLogin'),
    path('api/logout/', views.api_logout, name='api_logout'),
]
