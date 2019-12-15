from faker import Faker
import random

from .models import *


faker = Faker()


def get_random_Admin():
    admins = Admin.objects.all()
    random_admin = admins[random.randint(0, len(admins) - 1)]
    return random_admin


def create_Customer(num):
    for i in range(num):
        Customer.objects.create(
            cust_name=faker.name(),
            cust_address=faker.address(),
            cust_email=faker.email(),
            cust_co=faker.company(),
            cust_phone=faker.phone_number(),
            cust_duty=faker.job()
        )


def get_random_Customer():
    customers = Customer.objects.all()
    return customers[random.randint(0, len(customers) - 1)]


def create_Order(num):
    infos = ['日常订单', '马上完成', '重要订单']
    for i in range(num):
        Order.objects.create(
            order_date=faker.date_between('-10d', 'now'),
            order_amount=random.randint(1, 1000),
            order_payee=faker.name(),
            order_payer=faker.name(),
            order_payee_card=faker.credit_card_number(),
            order_payer_card=faker.credit_card_number(),
            order_payee_bank='bank',
            order_payer_bank='bank',
            order_serial=faker.ssn(),
            order_tex=random.randint(0, 20),
            order_pay_type='现金',
            order_info=infos[random.randint(0, 2)],
            customer=get_random_Customer()
        )


def get_random_order():
    orders = Order.objects.all()
    return orders[random.randint(0, len(orders) - 1)]


def create_Product(num):
    Product.objects.create(
        prod_name='apple',
        prod_unit='个',
        prod_price=5
    )
    Product.objects.create(
        prod_name='tv',
        prod_unit='个',
        prod_price=1000
    )
    Product.objects.create(
        prod_name='大苹果',
        prod_unit='斤',
        prod_price=12
    )
    Product.objects.create(
        prod_name='phone',
        prod_unit='个',
        prod_price=1000
    )


def get_random_Product():
    products = Product.objects.all()
    return products[random.randint(0, len(products) - 1)]


def create_OrderItem(num):
    for i in range(num):
        OrderItem.objects.create(
            quantity=random.randint(1, 100),
            product=get_random_Product(),
            order=get_random_order()
        )


def create_Repository(num):
    Repository.objects.create(
        repo_name='一号仓库',
        repo_place=faker.address(),
        repo_capacity=random.randint(500, 1000),
        repo_occupy=0,
        admin=get_random_Admin()
    )

    Repository.objects.create(
        repo_name='二号仓库',
        repo_place=faker.address(),
        repo_capacity=random.randint(500, 1000),
        repo_occupy=0,
        admin=get_random_Admin()
    )

    Repository.objects.create(
        repo_name='三号仓库',
        repo_place=faker.address(),
        repo_capacity=random.randint(500, 1000),
        repo_occupy=0,
        admin=get_random_Admin()
    )


def creat_faker_data():
    create_Customer(10)
    create_Order(20)
    create_Product(10)
    create_OrderItem(80)
    create_Repository(4)
