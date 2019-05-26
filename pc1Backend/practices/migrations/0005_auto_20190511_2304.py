# Generated by Django 2.1 on 2019-05-12 03:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('practices', '0004_auto_20190509_2153'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_type',
            field=models.CharField(choices=[('doctor', 'Doctor'), ('staff', 'Staff'), ('manager', 'Manager'), ('admin', 'Admin')], max_length=100),
        ),
    ]
