# Generated by Django 4.1.2 on 2023-05-14 08:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reward', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dailylogin',
            name='date',
            field=models.DateField(default=datetime.datetime(2023, 5, 14, 15, 46, 29, 950878)),
        ),
    ]