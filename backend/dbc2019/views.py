from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.db.models import Q
from rest_framework.parsers import JSONParser
from rest_framework import status

from .serializers import *
from .models import *
from .query import *


# Create your views here.
@csrf_exempt
def api_repository_dashboard(request):
    data = {
        'repo': Repository.objects.all(),
        'work_mess': WorkMessage.objects.all(),
        'repo_mess_in': RepoMessage.objects.filter(direction='IN'),
        'repo_mess_out': RepoMessage.objects.filter(direction='OUT')
    }
    serializer = ApiRepositoryDashboardGetSerializer(data)

    return JsonResponse(serializer.data)


@csrf_exempt
def api_repository_in(request):
    if request.method == 'POST':
        data = JSONParser().parse(request).get('data')
        data['direction'] = 'IN'
        serializer = ApiRepositoryInOutPostSerializer(data=data)
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

    serializer = ApiRepositoryInGetSerializer(data)
    return JsonResponse(serializer.data)


@csrf_exempt
def api_repository_out(request):
    if request.method == 'POST':
        data = JSONParser().parse(request).get('data')
        data['direction'] = 'OUT'
        serializer = ApiRepositoryInOutPostSerializer(data=data)
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

    serializer = ApiRepositoryOutGetSerializer(data)
    return JsonResponse(serializer.data)


@csrf_exempt
def api_repository_trans(request):
    if request.method == 'POST':
        data = JSONParser().parse(request).get('data')
        serializer = ApiRepositoryTransPostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()

    data = {
        'repo': Repository.objects.all()
    }
    serializer = ApiRepositoryTransGetSerializer(data)
    return JsonResponse(serializer.data)


@csrf_exempt
def api_order(request):
    if request.method == 'POST':
        data = JSONParser().parse(request).get('data')
        serializer = ApiOrderPostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
    elif request.method == 'PUT':
        data = JSONParser().parse(request).get('data')
        order = Order.objects.get(order_id=data.get('order_id'))
        serializer = ApiOrderPostSerializer(order, data=data)
        if serializer.is_valid():
            serializer.save()

    data = {
        'Order': Order.objects.all(),
        'Cust': Customer.objects.all(),
        'Graph': get_last_year_orders()
    }
    serializer = ApiOrderGetSerializer(data)
    return JsonResponse(serializer.data)


@csrf_exempt
def api_account(request):
    user = request.user
    if request.method == 'PUT':
        data = JSONParser().parse(request).get('data')
        admin = Admin.objects.get(admin_id=data.get('admin'))
        serializer = ApiAccountPutSerializer(admin, data=data)
        if serializer.is_valid():
            serializer.save()

    data = user.admin
    serializer = ApiAccountGetSerializer(data)
    return JsonResponse(serializer.data)


@csrf_exempt
def api_client(request):
    if request.method == 'POST':
        data = JSONParser().parse(request).get('data')
        serializer = ApiClientPostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
    elif request.method == 'PUT':
        data = JSONParser().parse(request).get('data')
        customer = Customer.objects.get(cust_id=data.get('cust_id'))
        serializer = ApiClientPutSerializer(customer, data=data)
        if serializer.is_valid():
            serializer.save()

    data = {
        'Cust': Customer.objects.all(),
        'Graph': get_most_order_cust(10)
    }
    serializer = ApiClientGetSerializer(data)
    return JsonResponse(serializer.data)


def api_dashboard(request):
    data = {
        'Messages': WorkMessage.objects.all(),
        'Repo': Repository.objects.all(),
        'RepoMessIn': RepoMessage.objects.filter(direction='In'),
        'RepoMessOut': RepoMessage.objects.filter(direction='Out'),
        'RepoMessTrans': TransMessage.objects.all(),
        'Cust': Customer.objects.all(),
        'Graph': get_most_order_cust(5)
    }
    serializer = ApiDashboardGetSerializer(data)
    return JsonResponse(serializer.data)


def api_userInfo(request):
    user = request.user
    data = user.admin
    serializer = ApiUserInfoGetSerializer(data)
    return JsonResponse(serializer.data)


def api_repository(request, repo_id):
    repository = Repository.objects.get(repo_id=repo_id)
    data = {
        'repo_id': repository.repo_id,
        'repo_name': repository.repo_name,
        'repo_capacity': repository.repo_capacity,
        'repo_occupy': repository.repo_occupy,
        'RepoItem': repository.repo_items.all(),
        'RepoMessIn': repository.repomessage_set.filter(direction='In'),
        'RepoMessOut': repository.repomessage_set.filter(direction='Out'),
        'RepoMessTrans': TransMessage.objects.filter(Q(from_repository=repository) | Q(to_repository=repository))
    }
    serializer = ApiRepositoryGetSerializer(data)
    return JsonResponse(serializer.data)


@csrf_exempt
def api_login(request):
    data = JSONParser().parse(request)
    user = User.objects.get(username=data.get('username'))
    if user is None:
        return HttpResponse(status=status.HTTP_403_FORBIDDEN)
    user = authenticate(request, username=data.get('username'), password=data.get('password'))
    if user is not None:
        login(request, user)
        return HttpResponse(status=status.HTTP_200_OK)
    else:
        return HttpResponse(status=status.HTTP_403_FORBIDDEN)


@csrf_exempt
def api_signup(request):
    data = JSONParser().parse(request)
    user = User.objects.create_user(username=data.get('username'),
                                    password=data.get('password'), email=data.get('email'))
    admin = Admin.objects.create(phone_num=data.get('phone_num'), user=user)
    login(request, user)
    return HttpResponse(status=status.HTTP_200_OK)


def add_example(request):
    # admin
    user_1 = User.objects.create_user(username='bob', password='123456')
    user_2 = User.objects.create_user(username='angel', password='123456')
    user_3 = User.objects.create_user(username='jack', password='123456')
    admin_1 = Admin.objects.create(user=user_1)
    admin_2 = Admin.objects.create(user=user_2)
    admin_3 = Admin.objects.create(user=user_3)

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
