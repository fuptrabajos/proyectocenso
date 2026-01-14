from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes, action
from django.contrib.auth.models import User, Group
from .serializer import RegisterSerializer, UserMeSerializer
from rest_framework.permissions import IsAuthenticated
from tasks.permissions import IsAdminOrRegistradorCreateOnly
from django.db.models import Count, Q
from rest_framework.pagination import PageNumberPagination




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


# ViewSet NUEVO solo para el listado con límite y búsqueda
class TblDatPerListView(viewsets.ReadOnlyModelViewSet):
    """ViewSet específico para el listado limitado con búsqueda"""
    serializer_class = TblDatPerSerializer
    
    def get_queryset(self):
        queryset = TblDatPer.objects.all()
        
        # Obtener parámetros de búsqueda
        identificacion = self.request.query_params.get('identificacion', None)
        nombre = self.request.query_params.get('nombre', None)
        apellido = self.request.query_params.get('apellido', None)
        search = self.request.query_params.get('search', None)  # para búsqueda por cédula
        
        # Si hay algún parámetro de búsqueda
        if identificacion or search:
            # Búsqueda por cédula
            filter_q = Q()
            
            if identificacion:
                filter_q |= Q(identificacion_usuario__icontains=identificacion)
            
            if search:
                # Para búsqueda por cédula (pestaña "Buscar por Cédula")
                filter_q |= Q(identificacion_usuario__icontains=search)
            
            queryset = queryset.filter(filter_q).order_by('identificacion_usuario')
            
        elif nombre and apellido:
            # Búsqueda por nombre Y apellido (ambos obligatorios)
            queryset = queryset.filter(
                Q(nombre_1__icontains=nombre) & Q(apellido_1__icontains=apellido)
            ).order_by('identificacion_usuario')
            
        else:
            # Si no hay búsqueda válida, solo mostrar los primeros 5 registros
            queryset = queryset.order_by('identificacion_usuario')[:5]
        
        return queryset
    
    def list(self, request, *args, **kwargs):
        """Override del método list para devolver formato personalizado"""
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'results': serializer.data,
            'count': len(serializer.data)
        })

#este metodo es para cargar el repote Mapas
@api_view(['GET'])
def map_gender_stats_fast(request):
    """
    Endpoint optimizado usando la relación con TblSexo
    """
    try:
        stats = TblDatPer.objects.aggregate(
            masculino=Count('id_paciente', filter=Q(sexo_al_nacer__descripcion__iexact='masculino')),
            femenino=Count('id_paciente', filter=Q(sexo_al_nacer__descripcion__iexact='femenino')),
            total=Count('id_paciente')
        )
        
        return Response({
            'masculino': stats['masculino'],
            'femenino': stats['femenino'],
            'otros': stats['total'] - stats['masculino'] - stats['femenino'],
            'total': stats['total']
        })
        
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    

@api_view(['GET'])
def reporte_afiliacion_rapido(request):
    """
    Endpoint súper optimizado para reporte de afiliaciones.
    Solo conteos por EPS - no transfiere datos de personas.
    De 40 segundos a menos de 1 segundo.
    """
    try:
        # Una sola consulta optimizada que cuenta directamente en la base de datos
        stats = TblDatPer.objects.values(
            'codigo_eapb__nombre_eapbAfiliacion',
            'codigo_eapb__codigo_eapb'
        ).annotate(
            total_personas=Count('id_paciente')
        ).filter(
            total_personas__gt=0  # Solo EPS que tienen personas afiliadas
        ).order_by('-total_personas')  # Ordenar por mayor cantidad
        
        # Contar personas sin afiliación en una consulta separada
        sin_afiliacion = TblDatPer.objects.filter(codigo_eapb__isnull=True).count()
        
        # Convertir a lista para poder modificar
        result = list(stats)
        
        # Calcular total general
        total_general = sum(item['total_personas'] for item in result)
        
        # Agregar personas sin afiliación si existen
        if sin_afiliacion > 0:
            result.append({
                'codigo_eapb__nombre_eapbAfiliacion': 'Sin Afiliación',
                'codigo_eapb__codigo_eapb': 'N/A',
                'total_personas': sin_afiliacion
            })
            total_general += sin_afiliacion
        
        return Response({
            'afiliaciones': result,
            'total_general': total_general,
            'total_eps': len(result),
            'optimizado': True
        })
        
    except Exception as e:
        return Response({
            'error': f'Error al calcular estadísticas de afiliación: {str(e)}'
        }, status=500)
    


# NUEVO ViewSet solo para el reporte paginado
class CustomPagination(PageNumberPagination):
    page_size = 25
    page_size_query_param = 'page_size'
    max_page_size = 100


class TblDatPerPaginatedView(viewsets.ReadOnlyModelViewSet):
    serializer_class = TblDatPerSerializer
    queryset = TblDatPer.objects.all()
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = TblDatPer.objects.all()
        
        # Filtro de búsqueda
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(identificacion_usuario__icontains=search) |
                Q(nombre_1__icontains=search) |
                Q(apellido_1__icontains=search)
            )
        
        # Filtro de género - usando la relación correcta
        gender = self.request.query_params.get('gender', None)
        if gender and gender != 'todos':
            queryset = queryset.filter(sexo_al_nacer__descripcion__iexact=gender)
        
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        # Estadísticas - usando las relaciones correctas
        total_queryset = TblDatPer.objects.all()
        stats = {
            'total': total_queryset.count(),
            'masculino': total_queryset.filter(sexo_al_nacer__descripcion__iexact='masculino').count(),
            'femenino': total_queryset.filter(sexo_al_nacer__descripcion__iexact='femenino').count(),
            'conEps': total_queryset.exclude(codigo_eapb__isnull=True).count(),
            'sinEps': total_queryset.filter(codigo_eapb__isnull=True).count(),
        }
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response = self.get_paginated_response(serializer.data)
            response.data['stats'] = stats
            return response

        serializer = self.get_serializer(queryset, many=True)
        return Response({'results': serializer.data, 'stats': stats, 'count': queryset.count()})

    @action(detail=False, methods=['get'])
    def export(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)