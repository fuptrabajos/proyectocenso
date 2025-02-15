# Generated by Django 5.1 on 2024-11-13 02:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True)),
                ('done', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='TblAfiliacion',
            fields=[
                ('id_eapb', models.AutoField(max_length=3, primary_key=True, serialize=False)),
                ('codigo_eapb', models.CharField(max_length=7)),
                ('nombre_eapb', models.CharField(max_length=255)),
                ('regimen', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='TblDisBasuras',
            fields=[
                ('id_dis_basuras', models.AutoField(max_length=2, primary_key=True, serialize=False)),
                ('des_disp_basura', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='TblNivelAcademico',
            fields=[
                ('id_nivel_acad', models.AutoField(max_length=2, primary_key=True, serialize=False)),
                ('des_nivel_academico', models.CharField(max_length=30)),
                ('primaria_incompleta', models.CharField(max_length=10)),
                ('preescolar', models.CharField(max_length=10)),
                ('basica_promaria', models.CharField(max_length=10)),
                ('basica_secundaria', models.CharField(max_length=10)),
                ('media_vocacional', models.CharField(max_length=10)),
                ('tecnico', models.CharField(max_length=10)),
                ('tecnologo', models.CharField(max_length=10)),
                ('profesional_universita', models.CharField(max_length=10)),
                ('especialista', models.CharField(max_length=10)),
                ('doctorado', models.CharField(max_length=10)),
                ('phd', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='TblRegimen',
            fields=[
                ('id_regimen', models.AutoField(max_length=2, primary_key=True, serialize=False)),
                ('des_regimen', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='TblTipIdentidad',
            fields=[
                ('id_tip_identidad', models.CharField(max_length=12, primary_key=True, serialize=False)),
                ('des_tip_identidad', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='TblTiposCultivo',
            fields=[
                ('id_tip_cultivo', models.AutoField(max_length=2, primary_key=True, serialize=False)),
                ('des_cultivos', models.CharField(max_length=255)),
                ('cantidad_en_hectareas', models.FloatField(blank=True, null=True)),
                ('periodicidad', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='TblTiposDeVivienda',
            fields=[
                ('id_tip_vivienda', models.AutoField(max_length=2, primary_key=True, serialize=False)),
                ('tradicion', models.CharField(max_length=20)),
                ('moderna', models.CharField(max_length=20)),
                ('propia', models.CharField(max_length=20)),
                ('arrendada', models.CharField(max_length=20)),
                ('familiar', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='TblTiposServiPubli',
            fields=[
                ('id_tip_ser_publi', models.AutoField(max_length=2, primary_key=True, serialize=False)),
                ('des_servicio', models.CharField(max_length=255)),
                ('permanente', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='TblDatPer',
            fields=[
                ('id_paciente', models.AutoField(primary_key=True, serialize=False)),
                ('identificacion_usuario', models.CharField(blank=True, max_length=12)),
                ('nombre_1', models.CharField(blank=True, max_length=20, null=True)),
                ('nombre_2', models.CharField(blank=True, max_length=20, null=True)),
                ('apellido_1', models.CharField(blank=True, max_length=20, null=True)),
                ('apellido_2', models.CharField(blank=True, max_length=20, null=True)),
                ('fec_nto', models.DateField(blank=True, null=True)),
                ('lugar_residencia', models.CharField(blank=True, max_length=50, null=True)),
                ('etnia', models.CharField(blank=True, max_length=50, null=True)),
                ('resguardo', models.CharField(blank=True, max_length=50, null=True)),
                ('lugar_de_trabajo', models.CharField(blank=True, max_length=100, null=True)),
                ('nombre_padre', models.CharField(blank=True, max_length=20, null=True)),
                ('nombre_madre', models.CharField(blank=True, max_length=20, null=True)),
                ('tiene_parcela', models.BooleanField()),
                ('nivel_de_academico', models.CharField(blank=True, max_length=50, null=True)),
                ('estado_civil', models.CharField(blank=True, max_length=50, null=True)),
                ('regimen', models.CharField(blank=True, max_length=20, null=True)),
                ('sexo_al_nacer', models.CharField(blank=True, max_length=15, null=True)),
                ('habla_otra_lenjua', models.BooleanField()),
                ('comunidad_de_origen', models.CharField(blank=True, max_length=255, null=True)),
                ('usa_medicina_tradicional', models.BooleanField()),
                ('cuenta_con_servicios_publico', models.BooleanField()),
                ('id_disp_de_las_basuras', models.CharField(blank=True, max_length=10, null=True)),
                ('nombre_eapb', models.ForeignKey(blank=True, db_column='nombre_eapb', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='tasks.tblafiliacion')),
                ('tip_iden_usu', models.ForeignKey(blank=True, db_column='des_tip_identidad', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='tasks.tbltipidentidad')),
                ('id_tip_cultivos', models.ForeignKey(blank=True, db_column='id_tip_cultivos', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='tasks.tbltiposcultivo')),
                ('id_tip_vivienda', models.ForeignKey(blank=True, db_column='id_tip_vivienda', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='tasks.tbltiposdevivienda')),
            ],
        ),
    ]
