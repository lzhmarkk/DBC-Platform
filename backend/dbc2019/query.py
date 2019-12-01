from datetime import datetime
from django.db.models import Count

from .models import Customer, Order


def get_most_order_cust(num):
    customers = Customer.objects.all().annotate(orders=Count('order')).order_by('-orders')[:num]
    datas = []
    for customer in customers:
        data = {
            'cust_name': customer.cust_name,
            'cust_orders': len(customer.order_set.all())
        }
        datas.append(data)

    return datas


def get_last_year_orders():
    orders = Order.objects.values('order_date') \
        .filter(order_date__year__gte=(datetime.now().year - 1)) \
        .annotate(order_num=Count('order_id'))
    datas = []
    for order in orders:
        data = {
            'data': order.get('order_date'),
            'value': order.get('order_num')
        }
        datas.append(data)

    return datas

