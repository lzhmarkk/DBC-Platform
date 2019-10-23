from django.urls import path

from . import views
from . import tests


app_name = 'dbc2019'

urlpatterns = [
    # test
    path('test_add_example/', tests.test_add_example, name='test_add_example'),
    path('test_serializer_foreignkey/', tests.test_serializer_foreignkey, name='test_serializer_foreignkey')
]