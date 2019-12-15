from datetime import datetime

from django.contrib.auth.models import User
from rest_framework import serializers

from .models import *
from .utils import *


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
    order_id = serializers.PrimaryKeyRelatedField(source='order', read_only=True)

    class Meta:
        model = RepoMessage
        fields = ['repo_mess_id', 'repo_mess_info', 'quantity', 'prod_name', 'prod_id', 'repo_name', 'repo_id',
                  'state', 'order_id']


class RepositoryDashboardTransMessSerializer(serializers.ModelSerializer):
    repo_out_name = serializers.SlugRelatedField(source='from_repository', slug_field='repo_name', read_only=True)
    repo_out_id = serializers.PrimaryKeyRelatedField(source='from_repository', read_only=True)
    repo_in_name = serializers.SlugRelatedField(source='to_repository', slug_field='repo_name', read_only=True)
    repo_in_id = serializers.PrimaryKeyRelatedField(source='to_repository', read_only=True)
    prod_name = serializers.SlugRelatedField(source='product', slug_field='prod_name', read_only=True)
    repo_mess_info = serializers.CharField(source='trans_mess_info')

    class Meta:
        model = TransMessage
        fields = ['trans_mess_id', 'repo_out_name', 'repo_in_name', 'prod_name',
                  'quantity', 'repo_mess_info', 'repo_out_id', 'repo_in_id']


class ApiRepositoryDashboardGetSerializer(serializers.Serializer):
    Repo = RepositoryDashboardRepositorySerializer(source='repo', many=True)
    Messages = RepositoryDashboardWorkMessSerializer(source='work_mess', many=True)
    RepoMessIn = RepositoryDashboardRepoMessSerializer(source='repo_mess_in', many=True)
    RepoMessOut = RepositoryDashboardRepoMessSerializer(source='repo_mess_out', many=True)
    RepoMessTrans = RepositoryDashboardTransMessSerializer(source='trans_mess', many=True)


class ApiRepositoryDashboardPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ['repo_name', 'repo_capacity', 'repo_place']

    def create(self, validated_data):
        repository = Repository.objects.create(**validated_data)
        return repository


# url api/repository/in,out
class RepositoryInOutRepoMessSerializer(serializers.ModelSerializer):
    prod_id = serializers.PrimaryKeyRelatedField(source='product', queryset=Product.objects.all())
    repo_id = serializers.PrimaryKeyRelatedField(source='repository', queryset=Repository.objects.all())
    prod_name = serializers.SlugRelatedField(source='product', slug_field='prod_name', read_only=True)
    repo_name = serializers.SlugRelatedField(source='repository', slug_field='repo_name', read_only=True)
    order_id = serializers.PrimaryKeyRelatedField(source='order', queryset=Order.objects.all())

    class Meta:
        model = RepoMessage
        fields = ['repo_mess_id', 'repo_mess_info', 'quantity',
                  'prod_name', 'prod_id', 'repo_name', 'repo_id', 'order_id']


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
    RepoMessIn = RepositoryInOutRepoMessSerializer(source='repo_mess_in', many=True)
    Repo = RepositoryInOutRepositorySerializer(source='repo', many=True)
    Prod = RepositoryInOutProductSerializer(source='prod', many=True)
    Order = RepositoryInOutOrderSerializer(source='order', many=True)


class ApiRepositoryOutGetSerializer(serializers.Serializer):
    RepoMessOut = RepositoryInOutRepoMessSerializer(source='repo_mess_out', many=True)
    Repo = RepositoryInOutRepositorySerializer(source='repo', many=True)
    Prod = RepositoryInOutProductSerializer(source='prod', many=True)
    Order = RepositoryInOutOrderSerializer(source='order', many=True)


class ApiRepositoryInOutPostSerializer(serializers.ModelSerializer):
    prod_id = serializers.PrimaryKeyRelatedField(source='product', queryset=Product.objects.all())
    repo_id = serializers.PrimaryKeyRelatedField(source='repository', queryset=Repository.objects.all())
    order_id = serializers.PrimaryKeyRelatedField(source='order', queryset=Order.objects.all())

    class Meta:
        model = RepoMessage
        fields = ['repo_mess_info', 'direction', 'quantity', 'prod_id', 'repo_id', 'order_id']

    def create(self, validated_data):
        validated_data['repo_mess_datetime'] = datetime.now()
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
                                   repo_message=repo_mess,
                                   work_mess_datetime=datetime.now())
        update_repository_item(repository, product, direction, quantity)
        return repo_mess


# url api/repository/trans
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


class ApiRepositoryTransPostSerializer(serializers.ModelSerializer):
    repo_out_id = serializers.PrimaryKeyRelatedField(source='from_repository', queryset=Repository.objects.all())
    repo_in_id = serializers.PrimaryKeyRelatedField(source='to_repository', queryset=Repository.objects.all())
    prod_out_id = serializers.PrimaryKeyRelatedField(source='product', queryset=Product.objects.all())

    class Meta:
        model = TransMessage
        fields = ['repo_out_id', 'repo_in_id', 'prod_out_id', 'quantity', 'trans_mess_info']

    def create(self, validated_data):
        validated_data['trans_mess_datetime'] = datetime.now()
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
                                   trans_message=trans_mess,
                                   work_mess_datetime=datetime.now())
        WorkMessage.objects.create(work_mess_info=work_mess_info_in,
                                   quantity=quantity,
                                   direction='IN',
                                   admin=admin_in,
                                   product=product,
                                   trans_message=trans_mess,
                                   work_mess_datetime=datetime.now())
        update_repository_item(repository_out, product, 'Out', quantity)
        update_repository_item(repository_in, product, 'In', quantity)

        return trans_mess


# url api/repository/${id}
class RepositoryRepoItemSerializer(serializers.ModelSerializer):
    prod_id = serializers.PrimaryKeyRelatedField(source='product', read_only=True)
    prod_name = serializers.SlugRelatedField(source='product', slug_field='prod_name', read_only=True)

    class Meta:
        model = RepositoryItem
        fields = ['prod_id', 'prod_name', 'quantity']


class RepositoryRepoMessSerializer(serializers.ModelSerializer):
    prod_name = serializers.SlugRelatedField(source='product', slug_field='prod_name', read_only=True)
    order_id = serializers.PrimaryKeyRelatedField(source='order', read_only=True)

    class Meta:
        model = RepoMessage
        fields = ['repo_mess_id', 'repo_mess_info', 'prod_name', 'order_id', 'quantity']


class RepositoryTransMessSerializer(serializers.ModelSerializer):
    repo_out_name = serializers.SlugRelatedField(source='from_repository', slug_field='repo_name', read_only=True)
    repo_out_id = serializers.PrimaryKeyRelatedField(source='from_repository', read_only=True)
    repo_in_name = serializers.SlugRelatedField(source='to_repository', slug_field='repo_name', read_only=True)
    repo_in_id = serializers.PrimaryKeyRelatedField(source='to_repository', read_only=True)
    prod_name = serializers.SlugRelatedField(source='product', slug_field='prod_name', read_only=True)
    repo_mess_info = serializers.CharField(source='trans_mess_info')

    class Meta:
        model = TransMessage
        fields = ['trans_mess_id', 'repo_out_name', 'repo_in_name', 'prod_name', 'repo_mess_info', 'quantity',
                  'repo_in_id', 'repo_out_id']


class ApiRepositoryGetSerializer(serializers.Serializer):
    repo_id = serializers.IntegerField()
    repo_name = serializers.CharField()
    repo_capacity = serializers.IntegerField()
    repo_occupy = serializers.IntegerField()
    RepoItem = RepositoryRepoItemSerializer(many=True)
    RepoMessIn = RepositoryRepoMessSerializer(many=True)
    RepoMessOut = RepositoryRepoMessSerializer(many=True)
    RepoMessTrans = RepositoryTransMessSerializer(many=True)


# url api/order/index
class OrderIndexOrderSerializer(serializers.ModelSerializer):
    cust_name = serializers.SlugRelatedField(source='customer', slug_field='cust_name', read_only=True)
    cust_co = serializers.SlugRelatedField(source='customer', slug_field='cust_co', read_only=True)
    cust_id = serializers.PrimaryKeyRelatedField(source='customer', read_only=True)

    class Meta:
        model = Order
        fields = ['order_id', 'order_date', 'cust_name', 'cust_co', 'state', 'order_info', 'cust_id']


class OrderIndexCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['cust_name', 'cust_id', 'cust_co']


class OrderIndexGraphSerializer(serializers.Serializer):
    date = serializers.DateField()
    value = serializers.IntegerField()


class ApiOrderIndexGetSerializer(serializers.Serializer):
    Order = OrderIndexOrderSerializer(many=True)
    Cust = OrderIndexCustomerSerializer(many=True)
    Graph = OrderIndexGraphSerializer(many=True)


class ApiOrderIndexPostSerializer(serializers.ModelSerializer):
    cust_id = serializers.PrimaryKeyRelatedField(source='customer', queryset=Customer.objects.all())

    class Meta:
        model = Order
        fields = ['cust_id', 'order_info', 'state', 'order_amount', 'order_payee', 'order_payer', 'order_pay_type']

    def create(self, validated_data):
        validated_data['order_date'] = datetime.now()
        order = Order.objects.create(**validated_data)

        return order


class ApiOrderIndexPutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order_id', 'state']

    def update(self, instance, validated_data):
        instance.state = validated_data.get('state')
        instance.save()
        return instance


# url api/order/${id}
class ApiOrderProductSerializer(serializers.ModelSerializer):
    prod_id = serializers.PrimaryKeyRelatedField(source='product', read_only=True)
    prod_name = serializers.SlugRelatedField(source='product', slug_field='prod_name', read_only=True)
    prod_desc = serializers.SlugRelatedField(source='product', slug_field='prod_desc', read_only=True)
    prod_unit = serializers.SlugRelatedField(source='product', slug_field='prod_unit', read_only=True)
    prod_price = serializers.SlugRelatedField(source='product', slug_field='prod_price', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['prod_id', 'prod_name', 'prod_desc', 'prod_unit', 'prod_price', 'quantity']


class ApiOrderRepoMessSerializer(serializers.ModelSerializer):
    prod_name = serializers.SlugRelatedField(source='product', slug_field='prod_name', read_only=True)
    prod_id = serializers.PrimaryKeyRelatedField(source='product', read_only=True)
    repo_id = serializers.PrimaryKeyRelatedField(source='repository', read_only=True)
    repo_name = serializers.SlugRelatedField(source='repository', slug_field='repo_name', read_only=True)

    class Meta:
        model = RepoMessage
        fields = ['repo_mess_id', 'repo_mess_info', 'direction', 'quantity',
                  'prod_name', 'prod_id', 'repo_id', 'repo_name']


class ApiOrderGetSerializer(serializers.Serializer):
    cust_id = serializers.IntegerField()
    cust_name = serializers.CharField()
    cust_co = serializers.CharField()

    order_id = serializers.IntegerField()
    order_date = serializers.DateField()
    state = serializers.IntegerField()
    order_info = serializers.CharField()
    order_amount = serializers.IntegerField()
    order_payee = serializers.CharField()
    order_payer = serializers.CharField()
    order_pay_type = serializers.CharField()
    order_serial = serializers.CharField()
    order_payee_card = serializers.CharField()
    order_payee_bank = serializers.CharField()
    order_tex = serializers.IntegerField()
    order_payer_card = serializers.CharField()
    order_payer_bank = serializers.CharField()
    order_description = serializers.CharField()

    Prod = ApiOrderProductSerializer(many=True)
    RepoMessIn = ApiOrderRepoMessSerializer(many=True)
    RepoMessOut = ApiOrderRepoMessSerializer(many=True)


# url api/client/index
class ClientIndexCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class ClientIndexGraphSerializer(serializers.Serializer):
    cust_name = serializers.CharField()
    cust_orders = serializers.IntegerField()


class ApiClientIndexGetSerializer(serializers.Serializer):
    Cust = ClientIndexCustomerSerializer(many=True)
    Graph = ClientIndexGraphSerializer(many=True)


class ApiClientPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        return Customer.objects.create(**validated_data)


class ApiClientPutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.cust_name = validated_data.get('cust_name')
        instance.cust_email = validated_data.get('cust_email')
        instance.cust_co = validated_data.get('cust_co')
        instance.cust_address = validated_data.get('cust_address')
        instance.cust_phone = validated_data.get('cust_phone')
        instance.cust_wechat = validated_data.get('cust_wechat')
        instance.cust_qq = validated_data.get('cust_qq', instance.cust_qq)
        instance.duty = validated_data.get('cust_duty')
        instance.cust_business_scope = validated_data.get('cust_business_scope')
        instance.cust_icon = validated_data.get('cust_icon', instance.cust_icon)
        instance.save()
        return instance


# url api/client
class ClientOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['order_id', 'order_date', 'state', 'order_info']


class ApiClientGetSerializer(serializers.ModelSerializer):
    Order = ClientOrderSerializer(source='order_set', many=True)

    class Meta:
        model = Customer
        fields = ['cust_id', 'cust_name', 'cust_email', 'cust_co', 'cust_address',
                  'cust_phone', 'cust_icon', 'cust_wechat', 'cust_qq', 'cust_duty',
                  'cust_business_scope', 'Order']


# url api/account
class ApiAccountGetSerializer(serializers.ModelSerializer):
    name = serializers.SlugRelatedField(source='user', slug_field='username', read_only=True)
    admin_description = serializers.CharField(source='admin_desc')

    class Meta:
        model = Admin
        fields = ['admin_id', 'identity', 'name', 'admin_description', 'admin_icon']


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


# url api/index
class IndexWorkMessSerializer(serializers.ModelSerializer):
    admin_id = serializers.PrimaryKeyRelatedField(source='admin', read_only=True)

    class Meta:
        model = WorkMessage
        fields = ['admin_id', 'work_mess_info']


class IndexRepositorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='repo_name')

    class Meta:
        model = Repository
        fields = ['repo_id', 'name', 'repo_occupy', 'repo_capacity']


class IndexRepoMessSerializer(serializers.ModelSerializer):
    repo_name = serializers.SlugRelatedField(source='repository', slug_field='repo_name', read_only=True)
    repo_id = serializers.PrimaryKeyRelatedField(source='repository', read_only=True)

    class Meta:
        model = RepoMessage
        fields = ['repo_mess_id', 'repo_name', 'repo_id', 'quantity', 'repo_mess_info']


class IndexTransMessSerializer(serializers.ModelSerializer):
    repo_out_name = serializers.SlugRelatedField(source='from_repository', slug_field='repo_name', read_only=True)
    repo_in_name = serializers.SlugRelatedField(source='to_repository', slug_field='repo_name', read_only=True)
    prod_name = serializers.SlugRelatedField(source='product', slug_field='prod_name', read_only=True)
    repo_mess_info = serializers.CharField(source='trans_mess_info')
    repo_out_id = serializers.PrimaryKeyRelatedField(source='from_repository', read_only=True)
    repo_in_id = serializers.PrimaryKeyRelatedField(source='to_repository', read_only=True)

    class Meta:
        model = TransMessage
        fields = ['trans_mess_id', 'repo_out_name', 'repo_in_name', 'prod_name', 'quantity', 'repo_mess_info',
                  'repo_in_id', 'repo_out_id']


class IndexGraphSerializer(serializers.Serializer):
    cust_id = serializers.IntegerField()
    cust_name = serializers.CharField()
    cust_orders = serializers.IntegerField()


class ApiIndexGetSerializer(serializers.Serializer):
    Messages = IndexWorkMessSerializer(many=True)
    Repo = IndexRepositorySerializer(many=True)
    RepoMessIn = IndexRepoMessSerializer(many=True)
    RepoMessOut = IndexRepoMessSerializer(many=True)
    RepoMessTrans = IndexTransMessSerializer(many=True)
    Graph = IndexGraphSerializer(many=True)


# url api/userInfo
class ApiUserInfoGetSerializer(serializers.ModelSerializer):
    name = serializers.SlugRelatedField(source='user', slug_field='username', read_only=True)
    admin_description = serializers.CharField(source='admin_desc')

    class Meta:
        model = Admin
        fields = ['name', 'admin_icon', 'admin_description']
