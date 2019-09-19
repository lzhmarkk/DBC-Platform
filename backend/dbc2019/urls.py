from django.urls import path

from . import views


app_name = 'dbc2019'

urlpatterns = [
    path('', views.index, name='index'),
    path('orders/', views.orders, name='orders'),
    path('products/', views.products, name='products'),
    path('add_product/', views.add_product, name='add_product'),
    path('order_info/<int:order_id>/', views.order_info, name='order_info'),
    path('delete_order/<int:order_id>/', views.delete_order, name='delete_order'),
    path('add_order/', views.add_order, name='add_order'),
    path('deal_add_product/', views.deal_add_product, name='deal_add_product'),
    path('deal_add_order/', views.deal_add_order, name='deal_add_order')
]