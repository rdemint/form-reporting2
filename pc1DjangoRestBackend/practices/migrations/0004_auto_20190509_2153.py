# Generated by Django 2.1 on 2019-05-10 01:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('practices', '0003_auto_20190506_2308'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='provider',
            unique_together={('first_name', 'last_name', 'entity')},
        ),
    ]