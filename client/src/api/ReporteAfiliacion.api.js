import axios from 'axios'

const AfiliacionApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/',
});

    // export const getAllTblAfiliacion = () => AfiliacionApi.get("/");  
   
   
// Obtener todas las afiliaciones disponibles
export const getAllTblAfiliacion = () => AfiliacionApi.get("TblAfiliacion/");  

// Obtener todos los datos de personas para hacer el conteo en frontend
export const getAllTblDatPer = () => AfiliacionApi.get("TblDatPer/");


// NUEVA FUNCIÓN OPTIMIZADA PARA AFILIACIONES
export const getAfiliacionStatsRapido = async () => {
    try {
        // Intentar endpoint optimizado primero
        console.log('🚀 Usando endpoint súper rápido para afiliaciones...');
        const response = await AfiliacionApi.get("reporteAfiliacionRapido/");
        console.log('✅ Endpoint optimizado funcionó!');
        return response;
        
    } catch (error) {
        console.log('⚠️ Endpoint optimizado no disponible, usando método actual...');
        // Fallback al método actual
        return await processAfiliacionWithFallback();
    }
};

// Función de fallback (tu lógica actual)
const processAfiliacionWithFallback = async () => {
    const CACHE_KEY = 'afiliacionStats';
    const CACHE_TIME_KEY = 'afiliacionStatsTime';
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

    // Verificar cache
    const cached = localStorage.getItem(CACHE_KEY);
    const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
    
    if (cached && cacheTime && (Date.now() - parseInt(cacheTime)) < CACHE_DURATION) {
        console.log('⚡ Usando datos desde cache');
        return { data: JSON.parse(cached) };
    }

    // Procesar datos como lo haces actualmente
    console.log('📊 Procesando datos de afiliaciones...');
    const [afiliacionesResponse, personasResponse] = await Promise.all([
        getAllTblAfiliacion(),
        getAllTblDatPer()
    ]);

    const afiliaciones = afiliacionesResponse.data;
    const personas = personasResponse.data;

    // Tu lógica de procesamiento actual
    const conteoMap = {};
    let totalPersonas = 0;

    personas.forEach(persona => {
        const idAfiliacion = persona.codigo_eapb;
        if (idAfiliacion) {
            conteoMap[idAfiliacion] = (conteoMap[idAfiliacion] || 0) + 1;
            totalPersonas++;
        }
    });

    const afiliacionesConConteo = afiliaciones.map(afiliacion => {
        const conteo = conteoMap[afiliacion.id_eapb] || 0;
        return {
            ...afiliacion,
            total_personas: conteo
        };
    });

    const afiliacionesOrdenadas = afiliacionesConConteo
        .filter(afiliacion => afiliacion.total_personas > 0)
        .sort((a, b) => b.total_personas - a.total_personas);

    const personasSinAfiliacion = personas.filter(persona => !persona.codigo_eapb).length;
    
    if (personasSinAfiliacion > 0) {
        afiliacionesOrdenadas.push({
            id_eapb: null,
            codigo_eapb: 'N/A',
            nombre_eapbAfiliacion: 'Sin Afiliación',
            total_personas: personasSinAfiliacion
        });
        totalPersonas += personasSinAfiliacion;
    }

    const result = {
        afiliaciones: afiliacionesOrdenadas.map(item => ({
            codigo_eapb__codigo_eapb: item.codigo_eapb,
            codigo_eapb__nombre_eapbAfiliacion: item.nombre_eapbAfiliacion,
            total_personas: item.total_personas
        })),
        total_general: totalPersonas
    };

    // Guardar en cache
    localStorage.setItem(CACHE_KEY, JSON.stringify(result));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

    return { data: result };
};