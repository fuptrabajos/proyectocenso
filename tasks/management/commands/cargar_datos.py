import pandas as pd
from django.core.management.base import BaseCommand
from tasks.models import (
    TblDatPer, TblTipIdentidad, TblAfiliacion, TblTiposDeVivienda,
    TblTiposCultivo, TblNivelAcademico, TblRegimen, TblSexo, TblDisBasuras
)

class Command(BaseCommand):
    help = "Carga datos desde Excel al modelo TblDatPer"

    def handle(self, *args, **kwargs):
        # 📌 Ruta fija al archivo Excel
        file_path = "D:/2024/Censo_Proyecto/proyectocenso/tasks/data/baseCensoPoblacional.xlsx"

        # Leer el Excel completo
        df = pd.read_excel(file_path)
        total_registros = len(df)

        self.stdout.write(self.style.NOTICE(f"📊 Se encontraron {total_registros} registros a procesar."))

        cargados = 0
        errores = 0

        for _, row in df.iterrows():
            try:
                obj = TblDatPer(
                    tip_iden_usu=TblTipIdentidad.objects.filter(pk=row["tip_iden_usu"]).first(),
                    identificacion_usuario=row["identificacion_usuario"],
                    nombre_1=row["nombre_1"],
                    nombre_2=row.get("nombre_2", ""),
                    apellido_1=row["apellido_1"],
                    apellido_2=row.get("apellido_2", ""),
                    fec_nto=row["fec_nto"],
                    edad=row["edad"],
                    lugar_residencia=row["lugar_residencia"],
                    numero_familia=row.get("numero_familia"),
                    codigo_vereda=row.get("codigo_vereda"),
                    esta_vivo=bool(row.get("esta_vivo", 1)),  # por defecto vivo
                    etnia=row["etnia"],
                    resguardo=row["resguardo"],
                    codigo_eapb=TblAfiliacion.objects.filter(pk=row["codigo_eapb"]).first(),
                    id_tip_vivienda=TblTiposDeVivienda.objects.filter(pk=row["id_tip_vivienda"]).first(),
                    tiene_parcela=row.get("tiene_parcela", False),
                    id_tip_cultivos=TblTiposCultivo.objects.filter(pk=row["id_tip_cultivos"]).first(),
                    nivel_de_academico=TblNivelAcademico.objects.filter(pk=row["nivel_de_academico"]).first(),
                    estado_civil=row["estado_civil"],
                    regimen=TblRegimen.objects.filter(pk=row["regimen"]).first(),
                    sexo_al_nacer=TblSexo.objects.filter(pk=row["sexo_al_nacer"]).first(),
                    habla_otra_lenjua=row.get("habla_otra_lenjua", False),
                    comunidad_de_origen=row.get("comunidad_de_origen", ""),
                    usa_medicina_tradicional=row.get("usa_medicina_tradicional", False),
                    cuenta_con_servicios_publico=row.get("cuenta_con_servicios_publico", False),
                    id_disp_de_las_basuras=TblDisBasuras.objects.filter(pk=row["id_disp_de_las_basuras"]).first(),
                )
                obj.save()
                cargados += 1
                self.stdout.write(self.style.SUCCESS(f"✔ Insertado: {row['identificacion_usuario']}"))
            except Exception as e:
                errores += 1
                self.stdout.write(self.style.ERROR(f"✘ Error con {row.get('identificacion_usuario', 'N/A')}: {e}"))

        # Resumen final
        self.stdout.write(self.style.SUCCESS(
            f"\n✅ Carga finalizada: {cargados} registros insertados correctamente, {errores} con errores."
        ))
