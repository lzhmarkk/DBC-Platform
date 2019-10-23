from rest_framework import serializers
from django.contrib.auth.models import User

from .models import *


class OrderItemSerializer(serializers.ModelSerializer):
    prod_id = serializers.PrimaryKeyRelatedField(source='product', queryset=Product.objects.all())
    order_id = serializers.PrimaryKeyRelatedField(source='order', queryset=Order.objects.all())

    class Meta:
        model = OrderItem
        fields = ['quantity', 'prod_id', 'order_id']

    def create(self, validated_data):
        return OrderItem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.product = validated_data.get('product', instance.product)
        instance.order = validated_data.get('order', instance.order)

        return instance
