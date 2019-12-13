from django.db.models import Q

from .models import *


def update_repository_item(repository, product, direction, quantity):
    try:
        repo_items = RepositoryItem.objects.get(Q(repository=repository) & Q(product=product))
        print(repo_items.quantity)
        if direction == 'IN':
            print('in')
            print(quantity)

            repo_items.quantity = repo_items.quantity + quantity
            repository.repo_capacity -= quantity
            repository.repo_occupy += quantity
        else:
            repo_items.quantity = repo_items.quantity - quantity
            repository.repo_occupy -= quantity
            repository.repo_capacity += quantity
        repo_items.save()
        repository.save()
        print(repo_items.quantity)
    except RepositoryItem.DoesNotExist:
        RepositoryItem.objects.create(product=product, repository=repository, quantity=quantity)
        repository.repo_capacity -= quantity
        repository.repo_occupy += quantity
        repository.save()

def order_add_item(prods, order):
    for prod in prods:
        try:
            product = Product.objects.get(prod_name=prod['prod_name'])
        except Product.DoesNotExist:
            product = Product.objects.create(prod_name=prod['prod_name'],
                                             prod_desc=prod['prod_desc'],
                                             prod_unit=prod['prod_unit'],
                                             prod_price=prod['prod_price'])
        OrderItem.objects.create(quantity=prod['quantity'], product=product, order=order)
