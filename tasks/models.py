from django.db import models

# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)
    def  __str__(self):
        return self.title
    
class TblTipIdentidad(models.Model):
    id_tipo_identidad = models.AutoField(primary_key=True)
    tip_identidad = models.CharField(max_length=12)
    des_tip_identidad = models.CharField(max_length=50)

    def __str__(self):
        return self.des_tip_identidad

class TblSexo(models.Model):
    # Opciones fijas para el sexo
    OPCIONES_SEXO = [
        ('Femenino', 'Femenino'),
        ('Masculino', 'Masculino'),
    ]

    codigo = models.AutoField( primary_key=True)
    descripcion = models.CharField (max_length=30, 
        choices=OPCIONES_SEXO,
        verbose_name="Tipo sexo",
        default="ninguno"  # Valor predeterminado
    )

    def __str__(self):
        return self.get_descripcion()  # Muestra la etiqueta legible en lugar del valor almacenado  

    class Meta:
        verbose_name = "Tipo sexo"
        verbose_name_plural = "Tipo sexo"      
        
   
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
    codigo_eapb = models.ForeignKey('TblAfiliacion', models.DO_NOTHING, db_column='nombre_eapbAfiliacion', blank=True, null=True)
    lugar_de_trabajo = models.CharField(max_length=100, blank=True, null=True)
    nombre_padre = models.CharField(max_length=20, blank=True, null=True)
    nombre_madre = models.CharField(max_length=20, blank=True, null=True)
    id_tip_vivienda = models.ForeignKey('TblTiposDeVivienda', models.DO_NOTHING, db_column='tipo_vivienda', blank=True, null=True)
    tiene_parcela = models.BooleanField()
    id_tip_cultivos = models.ForeignKey('TblTiposCultivo', models.DO_NOTHING, db_column='id_tip_cultivos', blank=True, null=True)
    nivel_de_academico = models.ForeignKey('TblNivelAcademico',models.DO_NOTHING, db_column='des_nivel_academico', blank=True, null=True)
    estado_civil = models.CharField(max_length=50, blank=True, null=True)
    regimen = models.ForeignKey('TblRegimen',models.DO_NOTHING, db_column='des_regimen', blank=True, null=True )
    sexo_al_nacer = models.ForeignKey('TblSexo', models.DO_NOTHING,  db_column='descripcion', blank=True, null=True)
    habla_otra_lenjua = models.BooleanField()
    comunidad_de_origen = models.CharField(max_length=255, blank=True, null=True)
    usa_medicina_tradicional = models.BooleanField()
    cuenta_con_servicios_publico = models.BooleanField()
    id_disp_de_las_basuras = models.ForeignKey('TblDisBasuras',models.DO_NOTHING, db_column='id_disp_de_las_basuras', blank=True, null=True )
    numero_familia = models.CharField(max_length=4,blank=True, null=True)

    def __str__(self):
        return str(self.identificacion_usuario)

class TblAfiliacion(models.Model):
    id_eapb = models.AutoField( primary_key=True)
    codigo_eapb = models.CharField(max_length=7)
    nombre_eapbAfiliacion = models.CharField(max_length=255)
    regimen = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre_eapbAfiliacion



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


# campos 

class EncuestaHabitos(models.Model):
    numero_identificacion = models.CharField(max_length=20)
    nombres_apellidos = models.CharField(max_length=255)
    Genero = models.CharField(max_length=10)
    LugarResidencia = models.CharField(max_length=100)
    Edad = models.CharField(max_length=20)
    EstadoNutricional = models.CharField(max_length=50)
    ProfesionOficio = models.CharField(max_length=100)
    TipoCombustible = models.CharField(max_length=50)
    CantidadAguaDia = models.CharField(max_length=50)
    HierveAgua = models.CharField(max_length=10)
    CarneRes = models.CharField(max_length=10)
    CarneCerdo = models.CharField(max_length=10)
    CarnePescado = models.CharField(max_length=10)
    CarnePollo = models.CharField(max_length=10)
    CarneFrita = models.CharField(max_length=10)
    CarneGuisada = models.CharField(max_length=10)
    CarneSancochada = models.CharField(max_length=10)
    CarneAsada = models.CharField(max_length=10)
    NumComidasDia = models.IntegerField()
    ConsumoSal = models.CharField(max_length=50)
    LacteosQueso = models.CharField(max_length=10)
    LacteosLeche = models.CharField(max_length=10)
    LacteosYogurt = models.CharField(max_length=10)
    LacteosCumis = models.CharField(max_length=10)
    LacteosArequipe = models.CharField(max_length=10)
    FrecSopas = models.CharField(max_length=50)
    FrecJugos = models.CharField(max_length=50)
    ComidasRapidas = models.CharField(max_length=10)
    VerduraLechuga = models.CharField(max_length=10)
    VerduraZanahoria = models.CharField(max_length=10)
    VerduraCilantro = models.CharField(max_length=10)
    VerduraPimenton = models.CharField(max_length=10)
    VerduraColiflor = models.CharField(max_length=10)
    VerduraAcelga = models.CharField(max_length=10)
    VerduraRemolacha = models.CharField(max_length=10)
    LeguminosasFrijol = models.CharField(max_length=10)
    LeguminosasAba = models.CharField(max_length=10)
    LeguminosasLenteja = models.CharField(max_length=10)
    LeguminosasArbeja = models.CharField(max_length=10)
    LeguminosasGarbanzo = models.CharField(max_length=10)
    TipoAceite = models.CharField(max_length=50)
    FrecBebidasAzucaradas = models.CharField(max_length=50)
    Fuma = models.CharField(max_length=10)
    Alcohol = models.CharField(max_length=10)
    ActividadFisica = models.CharField(max_length=10)
    Suplementos = models.CharField(max_length=10)
    LugarCompra = models.CharField(max_length=100)
    FrecAlimentosProcesados = models.CharField(max_length=100)
    ConsumoAzucar = models.CharField(max_length=50)
    IngredientesSopa = models.TextField()
    Stress = models.CharField(max_length=10)
    Ansiedad = models.CharField(max_length=10)
    Fatiga = models.CharField(max_length=10)
    Depresion = models.CharField(max_length=10)
    Angustia = models.CharField(max_length=10)

    def __str__(self):
        return (
            f"Encuesta de Hábitos:\n"
            f"- Identificación: {self.numero_identificacion}\n"
            f"- Nombre: {self.nombres_apellidos}\n"
            f"- Género: {self.Genero}\n"
            f"- Residencia: {self.LugarResidencia}\n"
            f"- Edad: {self.Edad}\n"
            f"- Estado Nutricional: {self.EstadoNutricional}\n"
            f"- Profesión/Oficio: {self.ProfesionOficio}\n"
            f"- Tipo de Combustible: {self.TipoCombustible}\n"
            f"- Consumo de Agua al Día: {self.CantidadAguaDia}\n"
            f"- Hierve el Agua: {self.HierveAgua}\n"
            f"- Consumo de Carnes:\n"
            f"  * Res: {self.CarneRes}\n"
            f"  * Cerdo: {self.CarneCerdo}\n"
            f"  * Pescado: {self.CarnePescado}\n"
            f"  * Pollo: {self.CarnePollo}\n"
            f"  * Frita: {self.CarneFrita}\n"
            f"  * Guisada: {self.CarneGuisada}\n"
            f"  * Sancochada: {self.CarneSancochada}\n"
            f"  * Asada: {self.CarneAsada}\n"
            f"- Número de comidas al día: {self.NumComidasDia}\n"
            f"- Consumo de Sal: {self.ConsumoSal}\n"
            f"- Consumo de Lácteos:\n"
            f"  * Queso: {self.LacteosQueso}\n"
            f"  * Leche: {self.LacteosLeche}\n"
            f"  * Yogurt: {self.LacteosYogurt}\n"
            f"  * Cumis: {self.LacteosCumis}\n"
            f"  * Arequipe: {self.LacteosArequipe}\n"
            f"- Frecuencia de consumo:\n"
            f"  * Sopas: {self.FrecSopas}\n"
            f"  * Jugos: {self.FrecJugos}\n"
            f"  * Comida rápida: {self.ComidasRapidas}\n"
            f"- Consumo de Verduras:\n"
            f"  * Lechuga: {self.VerduraLechuga}\n"
            f"  * Zanahoria: {self.VerduraZanahoria}\n"
            f"  * Cilantro: {self.VerduraCilantro}\n"
            f"  * Pimentón: {self.VerduraPimenton}\n"
            f"  * Coliflor: {self.VerduraColiflor}\n"
            f"  * Acelga: {self.VerduraAcelga}\n"
            f"  * Remolacha: {self.VerduraRemolacha}\n"
            f"- Consumo de Leguminosas:\n"
            f"  * Frijol: {self.LeguminosasFrijol}\n"
            f"  * Aba: {self.LeguminosasAba}\n"
            f"  * Lenteja: {self.LeguminosasLenteja}\n"
            f"  * Arveja: {self.LeguminosasArbeja}\n"
            f"  * Garbanzo: {self.LeguminosasGarbanzo}\n"
            f"- Tipo de Aceite: {self.TipoAceite}\n"
            f"- Frecuencia de Bebidas Azucaradas: {self.FrecBebidasAzucaradas}\n"
            f"- Fuma: {self.Fuma}\n"
            f"- Consumo de Alcohol: {self.Alcohol}\n"
            f"- Actividad Física: {self.ActividadFisica}\n"
            f"- Uso de Suplementos: {self.Suplementos}\n"
            f"- Lugar de Compra: {self.LugarCompra}\n"
            f"- Frecuencia de Alimentos Procesados: {self.FrecAlimentosProcesados}\n"
            f"- Consumo de Azúcar: {self.ConsumoAzucar}\n"
            f"- Ingredientes en Sopas: {self.IngredientesSopa}\n"
            f"- Factores Emocionales:\n"
            f"  * Estrés: {self.Stress}\n"
            f"  * Ansiedad: {self.Ansiedad}\n"
            f"  * Fatiga: {self.Fatiga}\n"
            f"  * Depresión: {self.Depresion}\n"
            f"  * Angustia: {self.Angustia}\n"
        )
        

