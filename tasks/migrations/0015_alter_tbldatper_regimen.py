# Generated by Django 5.1 on 2025-01-06 17:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0014_alter_tbldatper_id_eapb'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tbldatper',
            name='regimen',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]
