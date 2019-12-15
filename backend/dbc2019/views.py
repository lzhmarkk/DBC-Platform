from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.parsers import JSONParser
from rest_framework import status

from .serializers import *
from .models import *
from .query import *
from .faker_data import creat_faker_data


# Create your views here.
@csrf_exempt
def api_repository_dashboard(request):
    user = request.user
    if request.method == 'POST':
        data = JSONParser().parse(request).get('data')
        print(data)
        serializer = ApiRepositoryDashboardPostSerializer(data=data)
        if serializer.is_valid():
            repository = serializer.save()
            repository.admin = user.admin

    data = {
        'repo': Repository.objects.all(),
        'work_mess': WorkMessage.objects.all(),
        'repo_mess_in': RepoMessage.objects.filter(direction='IN'),
        'repo_mess_out': RepoMessage.objects.filter(direction='OUT'),
        'trans_mess': TransMessage.objects.all()
    }
    print(Repository.objects.all())
    serializer = ApiRepositoryDashboardGetSerializer(data)

    return JsonResponse(serializer.data)


@csrf_exempt
def api_repository_in(request):
    if request.method == 'POST':
        data = JSONParser().parse(request).get('data')
        data['direction'] = 'IN'
        print(data)
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
        'repo_mess_out': RepoMessage.objects.filter(direction='OUT'),
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
def api_order_index(request):
    if request.method == 'POST':
        data = JSONParser().parse(request).get('data')
        prods = data['Prod']
        data.pop('Prod')
        serializer = ApiOrderIndexPostSerializer(data=data)
        if serializer.is_valid():
            order = serializer.save()
            order_add_item(prods, order)
        else:
            print(serializer.error_messages)
    elif request.method == 'PUT':
        data = JSONParser().parse(request).get('data')
        order = Order.objects.get(order_id=data.get('order_id'))
        serializer = ApiOrderIndexPostSerializer(order, data=data)
        if serializer.is_valid():
            serializer.save()

    data = {
        'Order': Order.objects.all(),
        'Cust': Customer.objects.all(),
        'Graph': get_last_year_orders()
    }
    serializer = ApiOrderIndexGetSerializer(data)
    return JsonResponse(serializer.data)


def api_order(request, order_id):
    order = Order.objects.get(order_id=order_id)
    data = {
        'cust_id': order.customer_id,
        'cust_name': order.customer.cust_name,
        'cust_co': order.customer.cust_co,
        'order_id': order.order_id,
        'order_date': order.order_date,
        'state': order.state,
        'order_info': order.order_info,
        'order_amount': order.order_amount,
        'order_payee': order.order_payee,
        'order_payer': order.order_payer,
        'order_pay_type': order.order_pay_type,
        'order_serial': order.order_serial,
        'order_payee_card': order.order_payee_card,
        'order_payee_bank': order.order_payee_bank,
        'order_payer_card': order.order_payer_card,
        'order_payer_bank': order.order_payer_bank,
        'order_tex': order.order_tex,
        'order_description': order.order_description,
        'Prod': order.orderitem_set.all(),
        'RepoMessIn': order.repomessage_set.filter(direction='In'),
        'RepoMessOut': order.repomessage_set.filter(direction='Out')
    }
    serializer = ApiOrderGetSerializer(data)
    return JsonResponse(serializer.data)


@csrf_exempt
def api_account(request):
    user = request.user
    if request.method == 'PUT':
        data = JSONParser().parse(request).get('data')
        admin = Admin.objects.get(admin_id=data.get('admin_id'))
        serializer = ApiAccountPutSerializer(admin, data=data)
        if serializer.is_valid():
            serializer.save()

    data = user.admin
    serializer = ApiAccountGetSerializer(data)
    return JsonResponse(serializer.data)


@csrf_exempt
def api_client_index(request):
    if request.method == 'POST':
        data = JSONParser().parse(request).get('data')
        serializer = ApiClientPostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
    elif request.method == 'PUT':
        data = JSONParser().parse(request).get('data')
        print(data)
        customer = Customer.objects.get(cust_id=data.get('cust_id'))
        serializer = ApiClientPutSerializer(customer, data=data)
        if serializer.is_valid():
            serializer.save()

    data = {
        'Cust': Customer.objects.all(),
        'Graph': get_most_order_cust(10)
    }
    serializer = ApiClientIndexGetSerializer(data)
    return JsonResponse(serializer.data)


def api_client(request, client_id):
    data = Customer.objects.get(cust_id=client_id)
    serializer = ApiClientGetSerializer(data)
    return JsonResponse(serializer.data)


def api_index(request):
    data = {
        'Messages': WorkMessage.objects.order_by('work_mess_datetime')[:5],
        'Repo': Repository.objects.all(),
        'RepoMessIn': RepoMessage.objects.filter(direction='In').order_by('repo_mess_datetime')[:5],
        'RepoMessOut': RepoMessage.objects.filter(direction='Out').order_by('repo_mess_datetime')[:5],
        'RepoMessTrans': TransMessage.objects.order_by('trans_mess_datetime')[:5],
        'Graph': get_most_order_cust(5)
    }
    serializer = ApiIndexGetSerializer(data)
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
    try:
        user = User.objects.get(username=data.get('username'))
    except User.DoesNotExist:
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
                                    password=data.get('password'), email=data.get('email', None))
    admin = Admin.objects.create(phone_num=data.get('phone_num'), user=user)
    login(request, user)
    return HttpResponse(status=status.HTTP_200_OK)


@csrf_exempt
def api_checkLogin(request):
    user = request.user
    if user.is_authenticated:
        return HttpResponse(status=status.HTTP_200_OK)
    else:
        return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)


@csrf_exempt
def api_logout(request):
    logout(request)
    return HttpResponse(status=status.HTTP_200_OK)


def add_example(request):
    creat_faker_data()
    return HttpResponse(status=status.HTTP_200_OK)
