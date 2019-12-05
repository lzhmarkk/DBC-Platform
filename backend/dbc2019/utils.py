from django.db.models import Q

from .models import *


def update_repository_item(repository, product, direction, quantity):
    repo_item = RepositoryItem.objects.get(Q(repository=repository) & Q(product=product))
    if direction == 'In':
        repo_item.quantity = repo_item.quantity + quantity
    else:
        repo_item.quantity = repo_item.quantity - quantity
    repo_item.save()
