# Generated by Django 2.1 on 2019-06-14 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('practices', '0017_auto_20190610_1354'),
    ]

    operations = [
        migrations.AddField(
            model_name='entity',
            name='org_type',
            field=models.CharField(default='entity', max_length=50),
        ),
        migrations.AddField(
            model_name='practice',
            name='org_type',
            field=models.CharField(default='practice', max_length=50),
        ),
    ]