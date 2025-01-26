# Generated by Django 5.1 on 2024-11-17 21:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0007_alter_tblnivelacademico_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='TblEps',
            fields=[
                ('id_Eps', models.AutoField(primary_key=True, serialize=False)),
                ('des_Eps', models.CharField(max_length=20)),
            ],
        ),
        migrations.AlterField(
            model_name='tbldatper',
            name='nivel_de_academico',
            field=models.ForeignKey(blank=True, db_column='des_nivel_academico', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='tasks.tblnivelacademico'),
        ),
        migrations.AlterField(
            model_name='tbldatper',
            name='regimen',
            field=models.ForeignKey(blank=True, db_column='des_regimen', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='tasks.tblregimen'),
        ),
        migrations.AlterField(
            model_name='tblnivelacademico',
            name='des_nivel_academico',
            field=models.CharField(choices=[('des_nivel_academico', 'des_nivel_academico'), ('primaria', 'primaria'), ('secundaria', 'secundaria'), ('preparatoria', 'preparatoria'), ('licenciatura', 'licenciatura'), ('maestria', 'maestria'), ('doctorado', 'doctorado')], default='ninguno', max_length=30, verbose_name='des_nivel_academico'),
        ),
        migrations.AlterField(
            model_name='tbldatper',
            name='id_eapb',
            field=models.ForeignKey(blank=True, db_column='des_Eps', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='tasks.tbleps'),
        ),
    ]
