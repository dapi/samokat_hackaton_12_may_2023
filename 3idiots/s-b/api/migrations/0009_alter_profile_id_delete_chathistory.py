# Generated by Django 4.1.2 on 2023-05-14 08:46

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_profile_id_chathistory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='id',
            field=models.UUIDField(default=uuid.UUID('0b7e1007-878a-451f-a1ac-51711fb8dfa4'), editable=False, primary_key=True, serialize=False),
        ),
        migrations.DeleteModel(
            name='ChatHistory',
        ),
    ]
