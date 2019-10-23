from django.contrib.auth.models import User
from rest_framework import serializers

from .models import *


# models
'''
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'
'''


class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        exclude = ['place']


'''
class RepositoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = RepositoryItem
        fields = '__all__'
'''


class RepoMessageSerializer(serializers.ModelSerializer):
    prod_name = serializers.CharField(source='product.prod_name')
    name = serializers.CharField(source='repository.name')
    class Meta:
        model = RepoMessage
        fields = ['repo_mess_id', 'repo_mess_info', 'direction',
                  'quantity', 'prod_name', 'name']


class WorkMessageSerializer(serializers.ModelSerializer):
    admin_id  = serializers.IntegerField(source='admin.id')
    class Meta:
        model = WorkMessage
        fields = ['work_mess_id', 'work_mess_info', 'admin_id']


# model with relation
