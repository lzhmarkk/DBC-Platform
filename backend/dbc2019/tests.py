from django.test import TestCase
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import status

from .models import *
from .test_serializers import *


# Create your tests here.
def test_add_example(request):
    product = Product.objects.create(prod_name='ipad')
    order = Order.objects.create()
    orderitem = OrderItem.objects.create(quantity=30, product=product, order=order)

    return JsonResponse({})


@csrf_exempt
def test_serializer_foreignkey(request):
    if request.method == 'GET':
        orderitem = OrderItem.objects.all()
        serializer = OrderItemSerializer(orderitem, many=True)

        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = OrderItemSerializer(data=data.get('data'))
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
