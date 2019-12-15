# Generated by Django 2.2.5 on 2019-12-13 20:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dbc2019', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_payee_bank',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_payee_card',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_payer_bank',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_payer_card',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_serial',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='order_tex',
            field=models.IntegerField(null=True),
        ),
    ]