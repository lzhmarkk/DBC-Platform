from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Admin(models.Model):
    admin_id = models.AutoField(primary_key=True)
    admin_desc = models.TextField(null=True)
    admin_icon = models.TextField(null=True)
    identity = models.CharField(max_length=150, null=True)
    phone_num = models.CharField(max_length=50, null=True)

    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Customer(models.Model):
    cust_id = models.AutoField(primary_key=True)
    cust_name = models.CharField(max_length=50)
    cust_address = models.CharField(max_length=100)
    cust_email = models.EmailField()
    cust_co = models.CharField(max_length=150)
    cust_phone = models.CharField(max_length=50)
    cust_duty = models.CharField(max_length=50)
    cust_wechat = models.CharField(max_length=50, null=True)
    cust_qq = models.CharField(max_length=50, null=True)
    cust_business_scope = models.CharField(max_length=50, null=True)
    cust_icon = models.TextField(null=True)


class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    order_date = models.DateField()
    state = models.IntegerField(default=1)
    order_info = models.TextField(null=True)
    order_amount = models.IntegerField()
    order_payee = models.CharField(max_length=100)
    order_payer = models.CharField(max_length=100)
    order_payee_card = models.CharField(max_length=100)
    order_payee_bank = models.CharField(max_length=100)
    order_payer_card = models.CharField(max_length=100)
    order_payer_bank = models.CharField(max_length=100)
    order_serial = models.CharField(max_length=100)
    order_tex = models.IntegerField()
    order_pay_type = models.CharField(max_length=100)
    order_description = models.TextField(null=True)

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)


class Product(models.Model):
    prod_id = models.AutoField(primary_key=True)
    prod_name = models.CharField(max_length=50)
    prod_desc = models.TextField(null=True)
    prod_unit = models.CharField(max_length=50)
    prod_price = models.IntegerField()


class OrderItem(models.Model):
    order_item_id = models.AutoField(primary_key=True)
    quantity = models.IntegerField()

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)


class Repository(models.Model):
    repo_id = models.AutoField(primary_key=True)
    repo_place = models.CharField(max_length=100)
    repo_name = models.CharField(max_length=50)
    repo_capacity = models.IntegerField()
    repo_occupy = models.IntegerField(default=0)

    admin = models.ForeignKey(Admin, on_delete=models.SET_NULL, null=True)


class RepositoryItem(models.Model):
    repo_item_id = models.AutoField(primary_key=True)
    quantity = models.IntegerField()

    repository = models.ForeignKey(Repository, related_name='repo_items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


class RepoMessage(models.Model):
    repo_mess_id = models.AutoField(primary_key=True)
    repo_mess_info = models.TextField()
    quantity = models.IntegerField()
    direction = models.CharField(max_length=50)
    repo_mess_datetime = models.DateTimeField()
    state = models.IntegerField(default=0)

    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)


class TransMessage(models.Model):
    trans_mess_id = models.AutoField(primary_key=True)
    trans_mess_info = models.TextField(null=True)
    quantity = models.IntegerField()
    trans_mess_datetime = models.DateTimeField()
    state = models.IntegerField(default=0)

    from_repository = models.ForeignKey(Repository, related_name='from_mess', on_delete=models.CASCADE)
    to_repository = models.ForeignKey(Repository, related_name='to_mess', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


class WorkMessage(models.Model):
    work_mess_id = models.AutoField(primary_key=True)
    work_mess_info = models.TextField(null=True)
    quantity = models.IntegerField()
    direction = models.CharField(max_length=50)
    work_mess_datetime = models.DateTimeField()

    admin = models.ForeignKey(Admin, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    repo_message = models.OneToOneField(RepoMessage, on_delete=models.CASCADE, null=True)
    trans_message = models.ForeignKey(TransMessage, on_delete=models.CASCADE, null=True)
