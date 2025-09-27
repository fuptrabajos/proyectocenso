from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User, Group
from .serializer import RegisterSerializer, UserMeSerializer
from rest_framework.permissions import IsAuthenticated
from tasks.permissions import IsAdminOrRegistradorCreateOnly


from rest_framework import viewsets
from .serializer import TaskSerializer, TblDatPerSerializer, TblTiposDeViviendaSerializer, TblAfiliacionSerializer, TblNivelAcademicoSerializer, TblRegimenSerializer, TblDisBasurasSerializer, TblTiposServiPubliSerializer, TblSexoSerializer
from .serializer import TblTipIdentidadSerializer
from .serializer import TblTiposCultivoSerializer,EncuestaHabitosSerializer
from .models import Task
from .models import TblTipIdentidad,EncuestaHabitos
from .models import TblTiposDeVivienda
from .models import TblDatPer, TblTiposCultivo,TblAfiliacion, TblNivelAcademico, TblRegimen, TblDisBasuras, TblTiposServiPubli, TblSexo


# Create your views here.
# Crear usuario (admin -> puede crear usuarios)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]  # solo admin puede crear por API

# Listar roles/grupos (cualquier auth user puede leer; admin no necesario)
class RoleListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        groups = Group.objects.all().values("id", "name")
        return Response(list(groups))


# Info del usuario logueado
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def me(request):
    serializer = UserMeSerializer(request.user)
    # tomar primer grupo si existe
    groups = serializer.data.get("groups", [])
    role = groups[0] if groups else None
    data = serializer.data
    data["role"] = role
    return Response(data)

class TblDatPerViewSet(viewsets.ModelViewSet):
    queryset = TblDatPer.objects.all()
    serializer_class = TblDatPerSerializer
    permission_classes = [IsAuthenticated, IsAdminOrRegistradorCreateOnly]

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

class EncuestaHabitosView(viewsets.ModelViewSet):
    serializer_class = EncuestaHabitosSerializer
    queryset = EncuestaHabitos.objects.all()


class TblTipIdentidadView(viewsets.ModelViewSet):
    serializer_class = TblTipIdentidadSerializer
    queryset = TblTipIdentidad.objects.all()

class TblDatPerView(viewsets.ModelViewSet):
    serializer_class = TblDatPerSerializer
    queryset = TblDatPer.objects.all()

class TblTiposDeViviendaView(viewsets.ModelViewSet):
    serializer_class = TblTiposDeViviendaSerializer
    queryset = TblTiposDeVivienda.objects.all()

class TblTiposCultivoView(viewsets.ModelViewSet):
    serializer_class = TblTiposCultivoSerializer
    queryset = TblTiposCultivo.objects.all()

class TblAfiliacionView(viewsets.ModelViewSet):
    serializer_class = TblAfiliacionSerializer
    queryset = TblAfiliacion.objects.all()

class TblNivelAcademicoView(viewsets.ModelViewSet):
    serializer_class = TblNivelAcademicoSerializer
    queryset = TblNivelAcademico.objects.all()

class TblRegimenView(viewsets.ModelViewSet):
    serializer_class = TblRegimenSerializer
    queryset = TblRegimen.objects.all()

class TblDisBasurasView(viewsets.ModelViewSet):
    serializer_class = TblDisBasurasSerializer
    queryset = TblDisBasuras.objects.all()

class TblTiposServiPubliView(viewsets.ModelViewSet):
    serializer_class = TblTiposServiPubliSerializer
    queryset = TblTiposServiPubli.objects.all()

class TblSexoView(viewsets.ModelViewSet):
    serializer_class = TblSexoSerializer
    queryset = TblSexo.objects.all()