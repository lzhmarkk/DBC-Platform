from django.db.models import Count

from .models import Customer


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
