import axios from 'axios'


// API para endpoints optimizados
const OptimizedApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/',
});

// Función original (mantener para otros reportes)
export const getAllTblDatPer = () => DatPerApi.get("/");

// Función optimizada principal para mapa
export const getMapGenderStatsFast = async () => {
    try {
        // Intentar endpoint optimizado primero
        const response = await OptimizedApi.get("map-stats-fast/");
        return response;
    } catch (error) {
        // Fallback a procesamiento con cache
        return await processWithCache();
    }
};

// Procesamiento con cache (función interna)
const processWithCache = async () => {
    const CACHE_KEY = 'mapGenderStats';
    const CACHE_TIME_KEY = 'mapGenderStatsTime';
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

    // Verificar cache
    const cached = localStorage.getItem(CACHE_KEY);
    const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
    
    if (cached && cacheTime && (Date.now() - parseInt(cacheTime)) < CACHE_DURATION) {
        return { data: JSON.parse(cached) };
    }

    // Procesar datos
    const response = await getAllTblDatPer();
    const result = calculateGenderStats(response.data);

    // Guardar en cache
    localStorage.setItem(CACHE_KEY, JSON.stringify(result));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

    return { data: result };
};

// Función pura para calcular estadísticas
const calculateGenderStats = (data) => {
    const counts = data.reduce((acc, comunero) => {
        const genero = comunero.sexo_al_nacer?.descripcion?.toLowerCase() || "otros";
        
        if (genero === 'masculino') acc.masculino++;
        else if (genero === 'femenino') acc.femenino++;
        else acc.otros++;
        
        return acc;
    }, { masculino: 0, femenino: 0, otros: 0 });

    return {
        ...counts,
        total: data.length
    };
};