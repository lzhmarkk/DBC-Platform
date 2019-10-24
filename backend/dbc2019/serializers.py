from django.contrib.auth.models import User
from rest_framework import serializers

from .models import *


# url api/repository/dashboard
class DashboardRepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ['repo_id', 'repo_name', 'repo_capacity', 'repo_occupy']


class DashboardWorkMessSerializer(serializers.ModelSerializer):
    admin_id = serializers.PrimaryKeyRelatedField(source='admin', queryset=User.objects.all())

    class Meta:
        model = WorkMessage
        fields = ['admin_id', 'work_mess_id', 'work_mess_info']


class DashboardRepoMessSerializer(serializers.ModelSerializer):
    prod_id = serializers.PrimaryKeyRelatedField(source='product', queryset=Product.objects.all())
    repo_id = serializers.PrimaryKeyRelatedField(source='repository', queryset=Repository.objects.all())
    prod_name = serializers.CharField(source='product.prod_name')
    repo_name = serializers.CharField(source='repository.name')

    class Meta:
        model = RepoMessage
        fields = ['repo_mess_id', 'repo_mess_info', 'direction', 'quantity',
                  'prod_name', 'prod_id', 'repo_name', 'repo_id']


class DashboardSerializer(serializers.ModelSerializer):
    Repo = DashboardRepositorySerializer(many=True)
    Messages = DashboardWorkMessSerializer(many=True)
    RepoMessIn = DashboardRepoMessSerializer(many=True)
    RepoMessOut = DashboardRepoMessSerializer(many=True)


# url api/repository/in,out
class RepoMessSerializer(serializers.ModelSerializer):
    prod_id = serializers.PrimaryKeyRelatedField(source='product', queryset=Product.objects.all())
    repo_id = serializers.PrimaryKeyRelatedField(source='repository', queryset=Repository.objects.all())
    prod_name = serializers.CharField(source='product.prod_name')
    repo_name = serializers.CharField(source='repository.name')
    order_id = serializers.PrimaryKeyRelatedField(source='order', queryset=Order.objects.all())

    class Meta:
        model = RepoMessage
        fields = ['repo_mess_id', 'repo_mess_info', 'direction', 'quantity',
                  'prod_name', 'prod_id', 'repo_name', 'repo_id', 'order_id']

    def create(self, validated_data):
        product = Product.objects.get(pk=validated_data.get('prod_id'))
        order = Order.objects.get(pk=validated_data.get('order_id'))
        repository = Repository.objects.get(pk=validated_data.get('repo_id'))
        admin = repository.admin
        work_mess = WorkMessage.objects.create(quantity=validated_data.get('quantity'),
                                               direction=validated_data.get('direction'),
                                               product=product, order=order, )
        return RepoMessage.objects.create(**validated_data)


class RepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ['repo_id', 'repo_name']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['prod_id', 'prod_name']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order_id']


class InSerializer(serializers.ModelSerializer):
    RepoMessIn = RepoMessSerializer(many=True)
    Repo = RepositorySerializer(many=True)
    Prod = ProductSerializer(many=True)
    Order = OrderSerializer(many=True)


class OutSerializer(serializers.ModelSerializer):
    RepoMessOut = RepoMessSerializer(many=True)
    Repo = RepositorySerializer(many=True)
    Prod = ProductSerializer(many=True)
    Order = OrderSerializer(many=True)


# url api/repository/trans
class TransMessSerializer(serializers.ModelSerializer):
    repo_out_id = serializers.PrimaryKeyRelatedField(source='from_repository', queryset=Repository.objects.all())
    repo_in_id = serializers.PrimaryKeyRelatedField(source='to_repository', queryset=Repository.objects.all())
    prod_out_id = serializers.PrimaryKeyRelatedField(source='product', queryset=Product.objects.all())

    class Meta:
        model = TransMessage
        fields = ['repo_out_id', 'repo_in_id', 'prod_out_id', 'quantity', 'repo_mess_info']


class TransRepoItemSerializer(serializers.ModelSerializer):
    prod_id = serializers.PrimaryKeyRelatedField(source='product', read_only=True)
    prod_name = serializers.SlugRelatedField(source='product', slug_field='prod_name', read_only=True)

    class Meta:
        model = RepositoryItem
        fields = ['quantity', 'prod_id', 'prod_name']


class TransRepositorySerializer(serializers.ModelSerializer):
    RepoItem = TransRepoItemSerializer(source='repo_items', many=True, read_only=True)

    class Meta:
        model = Repository
        fields = ['repo_id', 'repo_name', 'RepoItem']


class TransSerializer(serializers.ModelSerializer):
    Repo = TransRepositorySerializer(many=True)
