from rest_framework import serializers
from .models import Task
from django.contrib.auth.models import User, Group
from .models import TblTipIdentidad
from .models import TblDatPer, EncuestaHabitos
from .models import TblTiposDeVivienda, TblTiposCultivo, TblAfiliacion, TblNivelAcademico, TblRegimen, TblDisBasuras, TblTiposServiPubli, TblSexo

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    group = serializers.CharField(write_only=True, required=False)  # rol enviado desde React

    class Meta:
        model = User
        fields = ["username", "email", "password", "group"]

    def create(self, validated_data):
        group_name = validated_data.pop("group", None)
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)

        # si el rol es admin, opcionalmente darle acceso al admin django
        if group_name == "admin":
            user.is_staff = True

        user.save()

        if group_name:
            group, _ = Group.objects.get_or_create(name=group_name)
            user.groups.add(group)

        return user


class UserMeSerializer(serializers.ModelSerializer):
    groups = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")

    class Meta:
        model = User
        fields = ["id", "username", "email", "groups"]

class EncuestaHabitosSerializer(serializers.ModelSerializer):
    class Meta:
        model = EncuestaHabitos
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class TblTipIdentidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblTipIdentidad
        fields = '__all__'
        
class TblAfiliacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblAfiliacion
        fields ='__all__'

class TblDatPerSerializer(serializers.ModelSerializer):
    nombre_eapbAfiliacion = serializers.CharField(source='codigo_eapb.nombre_eapbAfiliacion', read_only=True)
    tipo_vivienda = serializers.CharField(source='id_tip_vivienda.tipo_vivienda', read_only=True)
    des_cultivos = serializers.CharField(source='id_tip_cultivos.des_cultivos', read_only=True)
    des_nivel_academico = serializers.CharField(source='nivel_de_academico.des_nivel_academico', read_only=True)
    des_regimen = serializers.CharField(source='regimen.des_regimen', read_only=True)
    des_disp_basura = serializers.CharField(source='id_disp_de_las_basuras.des_disp_basura', read_only=True)
    descripcion = serializers.CharField(source='sexo_al_nacer.descripcion', read_only=True)
    des_tip_identidad = serializers.CharField(source='tip_iden_usu.des_tip_identidad', read_only=True)
    nombre_completo = serializers.ReadOnlyField()
    
    class Meta: 
        model = TblDatPer
        fields ='__all__'
        

class TblTiposDeViviendaSerializer(serializers.ModelSerializer):   
    class Meta:
        model = TblTiposDeVivienda
        fields ='__all__'

class TblTiposCultivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblTiposCultivo
        fields ='__all__'



class TblNivelAcademicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblNivelAcademico
        fields =['id_nivel_acad', 'des_nivel_academico']

class TblRegimenSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblRegimen
        fields ='__all__'

class TblDisBasurasSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblDisBasuras
        fields ='__all__'

class TblTiposServiPubliSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblTiposServiPubli
        fields ='__all__'

class TblSexoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblSexo
        fields ='__all__'