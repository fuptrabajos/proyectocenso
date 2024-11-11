from rest_framework import viewsets
from .serializer import TaskSerializer, TblDatPerSerializer, TblTiposDeViviendaSerializer, TblAfiliacionSerializer, TblNivelAcademicoSerializer, TblRegimenSerializer, TblDisBasurasSerializer, TblTiposServiPubliSerializer
from .serializer import TblTipIdentidadSerializer
from .serializer import TblTiposCultivoSerializer
from .models import Task
from .models import TblTipIdentidad
from .models import TblTiposDeVivienda
from .models import TblDatPer, TblTiposCultivo,TblAfiliacion, TblNivelAcademico, TblRegimen, TblDisBasuras, TblTiposServiPubli


# Create your views here.

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

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