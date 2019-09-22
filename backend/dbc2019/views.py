from django.shortcuts import render
from django.http import *
import json


# Create your views here.

def index(request):
    return render(request, 'dbc2019/index.html')


def repo(request):
    print(request)
    res = {
        'status': "hello world"
    }
    return HttpResponse(json.dumps(res), content_type='application/json')
