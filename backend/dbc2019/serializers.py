from django.contrib.auth.models import User
from rest_framework import serializers

from .models import *


# util func
def get_out_work_mess_info(prod_name, quantity):
    return '出库' + prod_name + str(quantity)


def get_in_work_mess_info(prod_name, quantity):
    return '入库' + prod_name + str(quantity)


# url api/repository/dashboard
class RepositoryDashboardRepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ['repo_id', 'repo_name', 'repo_capacity', 'repo_occupy']


class RepositoryDashboardWorkMessSerializer(serializers.ModelSerializer):
    admin_id = serializers.PrimaryKeyRelatedField(source='admin',read_only=True)

    class Meta:
        model = WorkMessage
        fields = ['admin_id', 'work_mess_id', 'work_mess_info']


class RepositoryDashboardRepoMessSerializer(serializers.ModelSerializer):
    prod_id = serializers.PrimaryKeyRelatedField(source='product', read_only=True)
    repo_id = serializers.PrimaryKeyRelatedField(source='repository', read_only=True)
    prod_name = serializers.SlugRelatedField(source='product', slug_field='prod_name', read_only=True)
    repo_name = serializers.SlugRelatedField(source='repository', slug_field='repo_name', read_only=True)

    class Meta:
        model = RepoMessage
        fields = ['repo_mess_id', 'repo_mess_info', 'direction', 'quantity',
                  'prod_name', 'prod_id', 'repo_name', 'repo_id']


class ApiRepositoryDashboardGetSerializer(serializers.Serializer):
    Repo = RepositoryDashboardRepositorySerializer(source='repo', many=True)
    Messages = RepositoryDashboardWorkMessSerializer(source='work_mess', many=True)
    RepoMessIn = RepositoryDashboardRepoMessSerializer(source='repo_mess_in', many=True)
    RepoMessOut = RepositoryDashboardRepoMessSerializer(source='repo_mess_out', many=True)


# url api/repository/in,out
class ApiRepositoryInOutPostSerializer(serializers.ModelSerializer):
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
        quantity = validated_data.get('quantity')
        direction = validated_data.get('direction')
        if direction == 'IN':
            work_mess_info = get_in_work_mess_info(product.prod_name, quantity)
        else:
            work_mess_info = get_out_work_mess_info(product.prod_name, quantity)
        WorkMessage.objects.create(quantity=quantity,
                                   direction=direction,
                                   work_mess_info=work_mess_info,
                                   product=product, admin=admin,
                                   repo_message=repo_mess)
        return repo_mess


class RepositoryInOutRepositorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ['repo_id', 'repo_name']


class RepositoryInOutProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['prod_id', 'prod_name']


class RepositoryInOutOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order_id']


class ApiRepositoryInGetSerializer(serializers.Serializer):
    RepoMessIn = ApiRepositoryInOutPostSerializer(source='repo_mess_in', many=True)
    Repo = RepositoryInOutRepositorySerializer(source='repo', many=True)
    Prod = RepositoryInOutProductSerializer(source='prod', many=True)
    Order = RepositoryInOutOrderSerializer(source='order', many=True)


class ApiRepositoryOutGetSerializer(serializers.Serializer):
    RepoMessOut = ApiRepositoryInOutPostSerializer(source='repo_mess_in', many=True)
    Repo = RepositoryInOutRepositorySerializer(source='repo', many=True)
    Prod = RepositoryInOutProductSerializer(source='prod', many=True)
    Order = RepositoryInOutOrderSerializer(source='order', many=True)


# url api/repository/trans
class ApiRepositoryTransPostSerializer(serializers.ModelSerializer):
    repo_out_id = serializers.PrimaryKeyRelatedField(source='from_repository', queryset=Repository.objects.all())
    repo_in_id = serializers.PrimaryKeyRelatedField(source='to_repository', queryset=Repository.objects.all())
    prod_out_id = serializers.PrimaryKeyRelatedField(source='product', queryset=Product.objects.all())

    class Meta:
        model = TransMessage
        fields = ['repo_out_id', 'repo_in_id', 'prod_out_id', 'quantity', 'trans_mess_info']

    def create(self, validated_data):
        trans_mess = TransMessage.objects.create(**validated_data)

        # add two work_mess point to trans_mess
        repository_out = validated_data.get('from_repository')
        repository_in = validated_data.get('to_repository')
        quantity = validated_data.get('quantity')
        product = validated_data.get('product')
        admin_out = repository_out.admin
        admin_in = repository_in.admin
        work_mess_info_out = get_out_work_mess_info(product.prod_name, quantity)
        work_mess_info_in = get_in_work_mess_info(product.prod_name, quantity)

        WorkMessage.objects.create(work_mess_info=work_mess_info_out,
                                   quantity=quantity,
                                   direction='OUT',
                                   admin=admin_out,
                                   product=product,
                                   trans_message=trans_mess)
        WorkMessage.objects.create(work_mess_info=work_mess_info_in,
                                   quantity=quantity,
                                   direction='IN',
                                   admin=admin_in,
                                   product=product,
                                   trans_message=trans_mess)

        return trans_mess


class RepositoryTransRepoItemSerializer(serializers.ModelSerializer):
    prod_id = serializers.PrimaryKeyRelatedField(source='product', read_only=True)
    prod_name = serializers.SlugRelatedField(source='product', slug_field='prod_name', read_only=True)

    class Meta:
        model = RepositoryItem
        fields = ['quantity', 'prod_id', 'prod_name']


class RepositoryTransRepositorySerializer(serializers.ModelSerializer):
    RepoItem = RepositoryTransRepoItemSerializer(source='repo_items', many=True, read_only=True)

    class Meta:
        model = Repository
        fields = ['repo_id', 'repo_name', 'RepoItem']


class ApiRepositoryTransGetSerializer(serializers.Serializer):
    Repo = RepositoryTransRepositorySerializer(source='repo', many=True)


# url api/order
class OrderOrderSerializer(serializers.ModelSerializer):
    cust_name = serializers.SlugRelatedField(source='customer', slug_field='cust_name', read_only=True)
    cust_co = serializers.SlugRelatedField(source='customer', slug_field='cust_co', read_only=True)

    class Meta:
        model = Order
        fields = ['order_id', 'order_date', 'cust_name', 'cust_co', 'state', 'order_info']


class OrderCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['cust_name', 'cust_id', 'cust_co']


class ApiOrderGetSerializer(serializers.Serializer):
    Order = OrderOrderSerializer(many=True)
    Cust = OrderCustomerSerializer(many=True)


class ApiOrderPostSerializer(serializers.ModelSerializer):
    cust_id = serializers.PrimaryKeyRelatedField(source='customer', read_only=True)

    class Meta:
        model = Order
        fields = ['cust_id', 'order_info', 'order_data', 'order_info']

    def create(self, validated_data):
        order = Order.objects.create(order_info=validated_data.get('order_info'),
                                     state=validated_data.get('state'),
                                     customer=validated_data.get('customer'))
        return order


class ApiOrderPutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order_id', 'state']

    def update(self, instance, validated_data):
        instance.state = validated_data.get('state')
        instance.save()
        return instance


# url api/client
class ApiAccountGetSerializer(serializers.ModelSerializer):
    name = serializers.SlugRelatedField(source='user', slug_field='username', read_only=True)
    admin_description = serializers.CharField(source='admin_desc')

    class Meta:
        model = Admin
        fields = ['admin_id', 'identity', 'name', 'admin_description']


class ApiAccountPutSerializer(serializers.ModelSerializer):
    admin_description = serializers.CharField(source='admin_desc')

    class Meta:
        model = Admin
        fields = ['admin_description', 'admin_icon']

    def update(self, instance, validated_data):
        instance.user.set_password(validated_data.get('password'))
        instance.admin_icon = validated_data.get('admin_icon')
        instance.admin_desc = validated_data.get('admin_desc')
        instance.save()
        return instance


# url api/client
class ClientCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class ClientGraphSerializer(serializers.Serializer):
    cust_name = serializers.CharField()
    cust_orders = serializers.IntegerField()


class ApiClientGetSerializer(serializers.Serializer):
    Cust = ClientCustomerSerializer(many=True)
    Graph = ClientGraphSerializer(many=True)


class ApiClientPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['__all__']

    def create(self, validated_data):
        return Customer.objects.create(**validated_data)


class ApiClientPutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['__all__']

    def update(self, instance, validated_data):
        instance.cust_name = validated_data.get('cust_name')
        instance.cust_email = validated_data.get('cust_email')
        instance.cust_co = validated_data.get('cust_co')
        instance.cust_address = validated_data.get('cust_address')
        instance.cust_phone = validated_data.get('cust_phone')
        instance.save()
        return instance


# url api/dashboard
class DashboardWorkMessSerializer(serializers.ModelSerializer):
    admin_id = serializers.PrimaryKeyRelatedField(source='admin', read_only=True)

    class Meta:
        model = WorkMessage
        fields = ['admin_id', 'work_mess_info']


class DashboardRepositorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='repo_name')

    class Meta:
        model = Repository
        fields = ['name', 'repo_occupy', 'repo_capacity']


class DashboardRepoMessSerializer(serializers.ModelSerializer):
    repo_name = serializers.SlugRelatedField(source='repository', slug_field='repo_name', read_only=True)

    class Meta:
        model = RepoMessage
        fields = ['repo_name', 'quantity', 'repo_mess_info']


class DashboardTransMessSerializer(serializers.ModelSerializer):
    repo_out_name = serializers.SlugRelatedField(source='from_repository', slug_field='repo_name', read_only=True)
    repo_in_name = serializers.SlugRelatedField(source='to_repository', slug_field='repo_name', read_only=True)
    prod_name = serializers.SlugRelatedField(source='product', slug_field='prod_name', read_only=True)
    repo_mess_info = serializers.CharField(source='trans_mess_info')

    class Meta:
        model = TransMessage
        fields = ['repo_out_name', 'repo_in_name', 'prod_name', 'quantity', 'repo_mess_info']


class DashboardCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['cust_co', 'cust_name']


class DashboardGraphSerializer(serializers.Serializer):
    cust_name = serializers.CharField()
    cust_orders = serializers.IntegerField()


class ApiDashboardGetSerializer(serializers.Serializer):
    Messages = DashboardWorkMessSerializer(many=True)
    Repo = DashboardRepositorySerializer(many=True)
    RepoMessIn = DashboardRepoMessSerializer(many=True)
    RepoMessOut = DashboardRepoMessSerializer(many=True)
    RepoMessTrans = DashboardTransMessSerializer(many=True)
    Cust = DashboardCustomerSerializer(many=True)
    Graph = DashboardGraphSerializer(many=True)


# url api/userInfo
class ApiUserInfoGetSerializer(serializers.ModelSerializer):
    name = serializers.SlugRelatedField(source='user', slug_field='username', read_only=True)
    admin_description = serializers.CharField(source='admin_desc')

    class Meta:
        model = Admin
        fields = ['name', 'admin_icon', 'admin_description']
