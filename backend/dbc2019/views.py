from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from .serializers import *
from .models import *


# Create your views here.
def api_repository_dashboard(request):
    data = {
        'repo': Repository.objects.all(),
        'work_mess': WorkMessage.objects.all(),
        'repo_mess_in': Repository.objects.filter(direction='IN'),
        'repo_mess_out': Repository.objects.filter(direction='OUT')
    }
    serializer = DashboardSerializer(data)
    return JsonResponse(serializer.data)


def api_repository_in(request):
    if request.method == 'POST':
        data = JSONParser().parse(request.body.data)
        serializer = RepoMessSerializer(data=data)
        if serializer.is_valid():
            serializer.save()

    data = {
        'repo_mess_in': RepoMessage.objects.filter(direction='IN'),
        'repo': Repository.objects.all(),
        'prod': Product.objects.all(),
        'order': Order.objects.all()
    }

    serializer = InSerializer(data)
    return JsonResponse(serializer)


def api_repository_out(request):
    if request.method == 'POST':
        data = JSONParser().parse(request.body.data)
        serializer = RepoMessSerializer(data=data)
        if serializer.is_valid():
            serializer.save()

    data = {
        'repo_mess_in': RepoMessage.objects.filter(direction='OUT'),
        'repo': Repository.objects.all(),
        'prod': Product.objects.all(),
        'order': Order.objects.all()
    }

    serializer = OutSerializer(data)
    return JsonResponse(serializer)


def api_repository_trans(request):
    if request.method == 'POST':
        data = JSONParser().parse(request.body.data)
        serializer = TransMessSerializer(data=data)
        if serializer.is_valid():
            serializer.save()

    repo = Repository.objects.all()
    serializer = TransSerializer(repo)
    return JsonResponse(serializer.data)
