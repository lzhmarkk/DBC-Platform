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
        'Cust': Customer.objects.all()
    }
    serializer = ApiOrderGetSerializer(data)
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


from django.contrib.auth import login, logout, authenticate
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
import rest_framework.status as code
from rest_framework.authtoken.models import Token


@action(methods=["POST"], detail=False)
def api_login(self, req: Request):
    data = req.data
    try:
        obj = Admin.objects.get(username=data.get('username'))
    except Admin.DoesNotExist:
        print("auth fail not exists")
        return Response(status=code.HTTP_404_NOT_FOUND, data={"Msg": "用户不存在"})

    user = authenticate(req, username=obj.username, password=data.get('password'))
    if user is not None:
        login(req, user)
        token, _ = Token.objects.get_or_create(user=user)
        print("auth successful! name:{0},token:{1}".format(user.Name, token.key))
        return Response(status=code.HTTP_200_OK, data={"token": token.key})
    print("auth fail password incorrect")
    return Response(status=code.HTTP_403_FORBIDDEN, data={"Msg": "密码错误"})


@action(methods=["POST"], detail=False)
def api_checkLogin(self, req: Request):
    # 请求的headers是`token`，data为空
    # $$如果headers不好处理的话我就把token写到data里返回$$
    # $$token_string = req.data.get("token")$$
    user = req.user  # todo这里我还不知道能不能直接得到user，有人这么写过
    if user is not None:
        print("check ok {0}".format(user.Name))
        return Response(status=code.HTTP_200_OK)
    else:
        print("check fail")
        return Response(status=code.HTTP_403_FORBIDDEN)


@action(methods=["POST"], detail=False)
def api_signup(self, req: Request):
    pass
