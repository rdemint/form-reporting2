# Generated by Django 2.1 on 2019-08-13 23:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('practices', '0021_collection_collection'),
    ]

    operations = [
        migrations.RenameField(
            model_name='collection',
            old_name='collection',
            new_name='amount',
        ),
    ]