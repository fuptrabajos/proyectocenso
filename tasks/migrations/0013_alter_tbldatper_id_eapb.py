# Generated by Django 5.1 on 2025-01-06 16:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0012_delete_tbleps_alter_tbldatper_id_eapb'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tbldatper',
            name='id_eapb',
            field=models.ForeignKey(blank=True, db_column='nombre_eapb', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='tasks.tblafiliacion'),
        ),
    ]
