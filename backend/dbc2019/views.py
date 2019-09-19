from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse

from .models import Model


# Create your views here.

def index(request):
    return render(request, 'dbc2019/index.html')

def orders(request):
    all_orders = Model.select('*').from_tables('orders').order_by('order_date').all()
    return render(request, 'dbc2019/orders.html', {'orders': all_orders})

def order_info(request, order_id):
    order_items = Model.select('orders.order_id', 'orderitems.quantity', 'products.prod_name')\
                       .from_tables('orders', 'orderitems', 'products')\
                       .filter('orders.order_id=orderitems.order_id', 'orderitems.prod_id=products.prod_id', 'orders.order_id=' + str(order_id))\
                       .all()
    order = Model.select('*').from_tables('orders').filter('order_id=' + str(order_id)).all()[0]
    return render(request, 'dbc2019/order_info.html', 
                  {'orderitems': order_items,'order': order}
                 )

def delete_order(request, order_id):
    Model.delete('orders').filter('order_id=' + str(order_id)).execute()
    return HttpResponseRedirect(reverse('dbc2019:orders'))

def products(request):
    prods = Model.select('*').from_tables('products').all()
    return render(request, 'dbc2019/products.html', {'products': prods})

def add_product(request):
    return render(request, 'dbc2019/add_product.html')

def add_order(request):
    products = Model.select('*').from_tables('products').all()
    return render(request, 'dbc2019/add_order.html', {'products': products})

def deal_add_product(request):
    prod_name = request.POST['prodname']
    Model.insert('products', prod_name=prod_name).execute()

    return HttpResponseRedirect(reverse('dbc2019:products'))

def deal_add_order(request):
    prod_ids = request.POST.getlist('product', None)
    quantitys = request.POST.getlist('quantity', None)
    Model.insert('orders').execute()

    order_ids = Model.select('order_id').from_tables('orders').all()
    order_ids = [order_id.order_id for order_id in order_ids]
    order_id = max(order_ids)
    for prod_id, quantity in zip(prod_ids, quantitys):
        if prod_id is '' or quantity is '':
            break
        Model.insert('orderitems', order_id=order_id, prod_id=prod_id, quantity=quantity).execute()

    return HttpResponseRedirect(reverse('dbc2019:orders'))