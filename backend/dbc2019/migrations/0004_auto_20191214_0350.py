# Generated by Django 2.2.5 on 2019-12-13 19:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dbc2019', '0003_auto_20191213_2303'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='state',
            field=models.IntegerField(default=1),
        ),
    ]
