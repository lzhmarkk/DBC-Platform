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
    prod_name = serializers.SlugRelatedField(source='product', slug_field='prod_name', read_only=True)
    repo_name = serializers.SlugRelatedField(source='repository', slug_field='repo_name', read_only=True)

    class Meta:
        model = RepoMessage
        fields = ['repo_mess_id', 'repo_mess_info', 'direction', 'quantity',
                  'prod_name', 'prod_id', 'repo_name', 'repo_id']


class DashboardSerializer(serializers.Serializer):
    Repo = DashboardRepositorySerializer(source='repo', many=True)
    Messages = DashboardWorkMessSerializer(source='work_mess', many=True)
    RepoMessIn = DashboardRepoMessSerializer(source='repo_mess_in', many=True)
    RepoMessOut = DashboardRepoMessSerializer(source='repo_mess_out', many=True)


# url api/repository/in,out
class RepoMessSerializer(serializers.ModelSerializer):
    prod_id = serializers.PrimaryKeyRelatedField(source='product', queryset=Product.objects.all())
    repo_id = serializers.PrimaryKeyRelatedField(source='repository', queryset=Repository.objects.all())
    prod_name = serializers.SlugRelatedField(source='product', slug_field='prod_name', read_only=True)
    repo_name = serializers.SlugRelatedField(source='repository', slug_field='repo_name', read_only=True)
    order_id = serializers.PrimaryKeyRelatedField(source='order', queryset=Order.objects.all())

    class Meta:
        model = RepoMessage
        fields = ['repo_mess_id', 'repo_mess_info', 'direction', 'quantity',
                  'prod_name', 'prod_id', 'repo_name', 'repo_id', 'order_id']

    def create(self, validated_data):
        repo_mess = RepoMessage.objects.create(**validated_data)

        # add a work_mess when add repo_mess
        product = validated_data.get('product')
        repository = validated_data.get('repository')
        admin = repository.admin
        WorkMessage.objects.create(quantity=validated_data.get('quantity'),
                                   direction=validated_data.get('direction'),
                                   product=product, admin=admin, repo_message=repo_mess)
        return repo_mess


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


class InSerializer(serializers.Serializer):
    RepoMessIn = RepoMessSerializer(source='repo_mess_in', many=True)
    Repo = RepositorySerializer(source='repo', many=True)
    Prod = ProductSerializer(source='prod', many=True)
    Order = OrderSerializer(source='order', many=True)


class OutSerializer(serializers.Serializer):
    RepoMessOut = RepoMessSerializer(source='repo_mess_in', many=True)
    Repo = RepositorySerializer(source='repo', many=True)
    Prod = ProductSerializer(source='prod', many=True)
    Order = OrderSerializer(source='order', many=True)


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
