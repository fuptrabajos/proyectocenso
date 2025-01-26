from django.contrib import admin
from .models import Task, TblAfiliacion, TblDatPer, TblTiposDeVivienda, TblTiposCultivo, TblNivelAcademico, TblRegimen, TblDisBasuras,TblTiposServiPubli, TblTipIdentidad
from .models import TblAfiliacion






# Register your models here.
admin.site.register(Task)
admin.site.register(TblTipIdentidad)
admin .site.register(TblDatPer)
admin.site.register(TblTiposDeVivienda)
admin .site.register(TblTiposCultivo)
admin .site.register(TblAfiliacion)
admin .site.register(TblNivelAcademico)
admin .site.register(TblRegimen)
admin .site.register(TblDisBasuras)
admin .site.register(TblTiposServiPubli)



