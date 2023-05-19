# Generated by Django 4.1.2 on 2023-05-13 17:21

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='department',
            name='id',
            field=models.UUIDField(default=uuid.UUID('79d3eee3-3a8f-480a-853c-bfd7bf215970'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='office',
            name='id',
            field=models.UUIDField(default=uuid.UUID('eee8331b-d8bb-49ee-88de-5a97a43221da'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='position',
            name='id',
            field=models.UUIDField(default=uuid.UUID('7068e762-e051-47ed-886b-0e5ab0b3efa4'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='id',
            field=models.UUIDField(default=uuid.UUID('074be357-64ae-4c77-ada3-a55802e8c1c1'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='social',
            name='id',
            field=models.UUIDField(default=uuid.UUID('24086127-c593-4a7d-a4da-427978449258'), editable=False, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='social',
            name='profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='socials', to='api.profile'),
        ),
    ]
