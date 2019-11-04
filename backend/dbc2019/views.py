from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import status

from .serializers import *
from .models import *


# Create your views here.
@csrf_exempt
def api_repository_dashboard(request):
    data = {
        'repo': Repository.objects.all(),
        'work_mess': WorkMessage.objects.all(),
        'repo_mess_in': RepoMessage.objects.filter(direction='IN'),
        'repo_mess_out': RepoMessage.objects.filter(direction='OUT')
    }
    serializer = DashboardSerializer(data)

    return JsonResponse(serializer.data)


@csrf_exempt
def api_repository_in(request):
    if request.method == 'POST':
        data = JSONParser().parse(request).get('data')
        data['direction'] = 'IN'
        serializer = RepoMessSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        else:
            return JsonResponse(serializer.errors)

    data = {
        'repo_mess_in': RepoMessage.objects.filter(direction='IN'),
        'repo': Repository.objects.all(),
        'prod': Product.objects.all(),
        'order': Order.objects.all()
    }

    serializer = InSerializer(data)
    return JsonResponse(serializer.data)


@csrf_exempt
def api_repository_out(request):
    if request.method == 'POST':
        data = JSONParser().parse(request).get('data')
        data['direction'] = 'OUT'
        serializer = RepoMessSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        else:
            return JsonResponse(serializer.errors)

    data = {
        'repo_mess_in': RepoMessage.objects.filter(direction='OUT'),
        'repo': Repository.objects.all(),
        'prod': Product.objects.all(),
        'order': Order.objects.all()
    }

    serializer = OutSerializer(data)
    return JsonResponse(serializer.data)


@csrf_exempt
def api_repository_trans(request):
    if request.method == 'POST':
        data = JSONParser().parse(request).get('data')
        serializer = TransMessSerializer(data=data)
        if serializer.is_valid():
            serializer.save()

    data = {
        'repo': Repository.objects.all()
    }
    serializer = TransSerializer(data)
    return JsonResponse(serializer.data)


def add_example(request):
    # admin
    admin_1 = User.objects.create(username='bob', password='123456')
    admin_2 = User.objects.create(username='angel', password='123456')
    admin_3 = User.objects.create(username='jack', password='123456')

    # Customer
    cust_1 = Customer.objects.create(cust_name='bob', cust_address='CH')
    cust_2 = Customer.objects.create(cust_name='dave', cust_address='US')
    cust_3 = Customer.objects.create(cust_name='mary', cust_address='CH')

    # Order
    order_1 = Order.objects.create(customer=cust_1)
    order_2 = Order.objects.create(customer=cust_1)
    order_3 = Order.objects.create(customer=cust_2)
    order_4 = Order.objects.create(customer=cust_3)

    # Product
    prod_1 = Product.objects.create(prod_name='ipad')
    prod_2 = Product.objects.create(prod_name='apple')
    prod_3 = Product.objects.create(prod_name='chicken')
    prod_4 = Product.objects.create(prod_name='tv')

    prods = [prod_1, prod_2, prod_3, prod_4]

    # OrderItem
    orderitem_1 = OrderItem.objects.create(quantity=20, order=order_1, product=prod_1)
    orderitem_2 = OrderItem.objects.create(quantity=30, order=order_1, product=prod_2)
    orderitem_3 = OrderItem.objects.create(quantity=10, order=order_2, product=prod_3)
    orderitem_4 = OrderItem.objects.create(quantity=100, order=order_3, product=prod_4)
    orderitem_5 = OrderItem.objects.create(quantity=66, order=order_4, product=prod_3)

    # Repository
    repo_1 = Repository.objects.create(repo_place='Beijing', repo_name='一号仓库', repo_capacity=1000,
                                       repo_occupy=20, admin=admin_1)
    repo_2 = Repository.objects.create(repo_place='Nanjing', repo_name='二号仓库', repo_capacity=1000,
                                       repo_occupy=20, admin=admin_2)
    repo_3 = Repository.objects.create(repo_place='Beihang', repo_name='三号仓库', repo_capacity=1000,
                                       repo_occupy=20, admin=admin_3)

    repos = [repo_1, repo_2, repo_3]

    # Repoitem
    for repo in repos:
        for prod in prods:
            RepositoryItem.objects.create(quantity=100, repository=repo, product=prod)

    return HttpResponse(status=status.HTTP_200_OK)
