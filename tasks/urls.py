from django.urls import path, include
from rest_framework import routers
from tasks import views


from rest_framework import routers
from django.urls import path, include
from . import views
from .views import RegisterView, RoleListView, me
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import TblDatPerView, TblDatPerPaginatedView  # Importar ambos

# Crea una única instancia de DefaultRouter
router = routers.DefaultRouter()

# Registra todas las vistas en la misma instancia de router
router.register(r'tasks', views.TaskView, 'tasks')
router.register(r'TblTipIdentidad', views.TblTipIdentidadView, 'TblTipIdentidad')
router.register(r'TblDatPer', views.TblDatPerView, 'TblDatPer')
router.register(r'TblDatPerList', views.TblDatPerListView, 'TblDatPerList')  # ViewSet NUEVO solo para listado
# NUEVA ruta solo para este reporte paginado
router.register(r'TblDatPerPaginated', TblDatPerPaginatedView, basename='tbl_dat_per_paginated')

router.register(r'TblTiposDeVivienda', views.TblTiposDeViviendaView, 'TblTiposDeVivienda')
router.register(r'TblTiposCultivo', views.TblTiposCultivoView, 'TblTiposCultivo')
router.register(r'TblAfiliacion', views.TblAfiliacionView,'TblAfiliacion')
router.register(r'TblNivelAcademico', views.TblNivelAcademicoView,'TblNivelAcademico')
router.register(r'TblRegimen', views.TblRegimenView,'TblRegimen')
router.register(r'TblDisBasuras', views.TblDisBasurasView,'TblDisBasuras')
router.register(r'TblTiposServiPubli', views.TblTiposServiPubliView,'TblTiposServiPubli')
router.register(r'TblSexo', views.TblSexoView,'TblSexo')



# Incluye las rutas del router en urlpatterns
urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),    
    path('api/v1/map-stats-fast/', views.map_gender_stats_fast, name='map_stats_fast'),# este es reporte de Mapas
    path('api/v1/reporteAfiliacionRapido/', views.reporte_afiliacion_rapido, name='reporte_afiliacion_rapido'),#para eps
    path('api/v1/', include(router.urls)),  # Todas las rutas registradas estarán disponibles aquí
    path("register/", RegisterView.as_view(), name="register"),
    path("roles/", RoleListView.as_view(), name="roles"),
    path("me/", me, name="me"),
]


    
