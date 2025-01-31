from django.db import models

# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)
    def  __str__(self):
        return self.title
    
class TblTipIdentidad(models.Model):
    id_tip_identidad = models.CharField(max_length=12, primary_key=True, default='DNI', verbose_name="Tipo de Identidad")
    des_tip_identidad = models.CharField(max_length=50)

    def __str__(self):
        return self.id_tip_identidad
    
   
class TblDatPer(models.Model):
    id_paciente = models.AutoField(primary_key=True)
    tip_iden_usu = models.ForeignKey('TblTipIdentidad', models.DO_NOTHING, db_column='des_tip_identidad', blank=True, null=True)
    identificacion_usuario = models.CharField(max_length=12, blank=True, null=False)
    nombre_1 = models.CharField(max_length=20, blank=True, null=True)
    nombre_2 = models.CharField(max_length=20, blank=True, null=True)
    apellido_1 = models.CharField(max_length=20, blank=True, null=True)
    apellido_2 = models.CharField(max_length=20, blank=True, null=True)
    fec_nto = models.DateField(blank=True, null=True)
    lugar_residencia = models.CharField(max_length=50, blank=True, null=True)
    etnia = models.CharField(max_length=50, blank=True, null=True)
    resguardo = models.CharField(max_length=50, blank=True, null=True)
    codigo_eapb = models.ForeignKey('TblAfiliacion', models.DO_NOTHING, db_column='codigo_eapb', blank=True, null=True)
    lugar_de_trabajo = models.CharField(max_length=100, blank=True, null=True)
    nombre_padre = models.CharField(max_length=20, blank=True, null=True)
    nombre_madre = models.CharField(max_length=20, blank=True, null=True)
    id_tip_vivienda = models.ForeignKey('TblTiposDeVivienda', models.DO_NOTHING, db_column='tipo_vivienda', blank=True, null=True)
    tiene_parcela = models.BooleanField()
    id_tip_cultivos = models.ForeignKey('TblTiposCultivo', models.DO_NOTHING, db_column='id_tip_cultivos', blank=True, null=True)
    nivel_de_academico = models.ForeignKey('TblNivelAcademico',models.DO_NOTHING, db_column='des_nivel_academico', blank=True, null=True)
    estado_civil = models.CharField(max_length=50, blank=True, null=True)
    regimen = models.ForeignKey('TblRegimen',models.DO_NOTHING, db_column='des_regimen', blank=True, null=True )
    sexo_al_nacer = models.CharField(max_length=15, blank=True, null=True)
    habla_otra_lenjua = models.BooleanField()
    comunidad_de_origen = models.CharField(max_length=255, blank=True, null=True)
    usa_medicina_tradicional = models.BooleanField()
    cuenta_con_servicios_publico = models.BooleanField()
    id_disp_de_las_basuras = models.CharField(max_length=10, blank=True, null=True)
    numero_familia = models.CharField(max_length=4,blank=True,null=True)

    def __str__(self):
        return str(self.identificacion_usuario)



class TblTiposDeVivienda(models.Model):
    TIPO_VIVIENDA_CHOICES = [
        ('tradicional', 'Tradicional'),
        ('moderna', 'Moderna'),
        ('propia', 'Propia'),
        ('arrendada', 'Arrendada'),
        ('familiar', 'Familiar'),
    ]

    id_tip_vivienda = models.AutoField(primary_key=True)  # Campo automático para el ID
    tipo_vivienda = models.CharField(
        max_length=20,
        choices=TIPO_VIVIENDA_CHOICES,
        verbose_name="Tipo de Vivienda",
        default="tradicional"  # Valor predeterminado
    )

    def __str__(self):
        return self.get_tipo_vivienda_display()  # Muestra la etiqueta legible en lugar del valor almacenado

    class Meta:
        verbose_name = "Tipo de Vivienda"
        verbose_name_plural = "Tipos de Vivienda"

class TblTiposCultivo(models.Model):
    id_tip_cultivo = models.AutoField(primary_key=True)
    des_cultivos = models.CharField(max_length=255)
    cantidad_en_hectareas = models.FloatField(blank=True, null=True)
    periodicidad = models.CharField(max_length=50)

    def __str__(self):
        return self.des_cultivos

class TblAfiliacion(models.Model):
    id_eapb = models.AutoField( primary_key=True)
    codigo_eapb = models.CharField(max_length=7)
    nombre_eapb = models.CharField(max_length=255)
    regimen = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre_eapb

class TblNivelAcademico(models.Model):
   
    NIVEL_ACADEMICO_CHOICES = [
        ('des_nivel_academico', 'des_nivel_academico'),
        ('primaria', 'primaria'),
        ('secundaria', 'secundaria'),
        ('pregrado', 'pregardo'),
        ('ninguno', 'ninguno'),
        ('licenciatura', 'licenciatura'),
        ('maestria', 'maestria'),
        ('doctorado', 'doctorado'),
               
    ]
    id_nivel_acad = models.AutoField( primary_key=True)
    des_nivel_academico = models.CharField (max_length=30, 
        choices=NIVEL_ACADEMICO_CHOICES,
        verbose_name="des_nivel_academico",
        default="ninguno"  # Valor predeterminado
    )
    def __str__(self):
        return self.get_des_nivel_academico_display() 

    class Meta:
        verbose_name = "des_nivel_academico"
        verbose_name_plural = "des_nivel_academico"

class TblRegimen(models.Model):
    id_regimen = models.AutoField( primary_key=True)
    des_regimen = models.CharField(max_length=20)

    def __str__(self):
        return self.des_regimen

class TblDisBasuras(models.Model):
    id_dis_basuras = models.AutoField( primary_key=True)
    des_disp_basura = models.CharField(max_length=255)

    def __str__(self):
        return self.des_disp_basura

class TblTiposServiPubli(models.Model):
    id_tip_ser_publi = models.AutoField( primary_key=True)
    des_servicio = models.CharField(max_length=255)
    permanente = models.CharField(max_length=255)

    def __str__(self):
        return self.des_servicio


