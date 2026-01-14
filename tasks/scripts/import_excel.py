import os
import pandas as pd
from tasks.models import EncuestaHabitos  # Asegúrate de cambiar 'encuesta' por el nombre correcto de tu app

def importar_datos_excel():
    # Obtener la ruta del archivo Excel en la carpeta 'data'
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    # file_path = os.path.join(BASE_DIR, "tasks", "data", "habitos_Nombres_modificados.xlsx")
    file_path = "D:/2024/Censo_Proyecto/proyectocenso/tasks/data/habitos_Nombres_modificados.xlsx"


    # Cargar los datos del archivo Excel
    df = pd.read_excel(file_path, engine="openpyxl")

    # Reemplazar valores NaN por cadenas vacías
    df = df.fillna("")

    # Insertar datos en la base de datos
    for _, row in df.iterrows():
        EncuestaHabitos.objects.create(
            numero_identificacion=row["numero_identificacion"],
            nombres_apellidos=row["nombres_apellidos"],
            Genero=row["Genero"],
            LugarResidencia=row["LugarResidencia"],
            Edad=row["Edad"],
            EstadoNutricional=row["EstadoNutricional"],
            ProfesionOficio=row["ProfesionOficio"],
            TipoCombustible=row["TipoCombustible"],
            CantidadAguaDia=row["CantidadAguaDia"],
            HierveAgua=row["HierveAgua"],
            CarneRes=row["CarneRes"],
            CarneCerdo=row["CarneCerdo"],
            CarnePescado=row["CarnePescado"],
            CarnePollo=row["CarnePollo"],
            CarneFrita=row["CarneFrita"],
            CarneGuisada=row["CarneGuisada"],
            CarneSancochada=row["CarneSancochada"],
            CarneAsada=row["CarneAsada"],
            NumComidasDia=row["NumComidasDia"],
            ConsumoSal=row["ConsumoSal"],
            LacteosQueso=row["LacteosQueso"],
            LacteosLeche=row["LacteosLeche"],
            LacteosYogurt=row["LacteosYogurt"],
            LacteosCumis=row["LacteosCumis"],
            LacteosArequipe=row["LacteosArequipe"],
            FrecSopas=row["FrecSopas"],
            FrecJugos=row["FrecJugos"],
            ComidasRapidas=row["ComidasRapidas"],
            VerduraLechuga=row["VerduraLechuga"],
            VerduraZanahoria=row["VerduraZanahoria"],
            VerduraCilantro=row["VerduraCilantro"],
            VerduraPimenton=row["VerduraPimenton"],
            VerduraColiflor=row["VerduraColiflor"],
            VerduraAcelga=row["VerduraAcelga"],
            VerduraRemolacha=row["VerduraRemolacha"],
            LeguminosasFrijol=row["LeguminosasFrijol"],
            LeguminosasAba=row["LeguminosasAba"],
            LeguminosasLenteja=row["LeguminosasLenteja"],
            LeguminosasArbeja=row["LeguminosasArbeja"],
            LeguminosasGarbanzo=row["LeguminosasGarbanzo"],
            TipoAceite=row["TipoAceite"],
            FrecBebidasAzucaradas=row["FrecBebidasAzucaradas"],
            Fuma=row["Fuma"],
            Alcohol=row["Alcohol"],
            ActividadFisica=row["ActividadFisica"],
            Suplementos=row["Suplementos"],
            LugarCompra=row["LugarCompra"],
            FrecAlimentosProcesados=row["FrecAlimentosProcesados"],
            ConsumoAzucar=row["ConsumoAzucar"],
            IngredientesSopa=row["IngredientesSopa"],
            Stress=row["Stress"],
            Ansiedad=row["Ansiedad"],
            Fatiga=row["Fatiga"],
            Depresion=row["Depresion"],
            Angustia=row["Angustia"],
        )

    print("✅ Importación de datos completada.")

# Ejecutar el script si se llama directamente
if __name__ == "__main__":
    importar_datos_excel()
