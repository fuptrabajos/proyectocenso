import React, { useEffect, useState } from 'react';
import { getMapGenderStatsFast } from '../api/ReporteMapaGrafica.api';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const GenderChart = () => {
    const [genderData, setGenderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMapGenderStatsFast();
                setGenderData(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError("Error al cargar los datos. Intente nuevamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="p-4 flex items-center justify-center h-64">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-lg font-medium">Cargando estadísticas...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <strong>Error:</strong> {error}
                </div>
            </div>
        );
    }

    if (!genderData) {
        return <div className="p-4">No hay datos disponibles</div>;
    }

    // Datos para el gráfico
    const data = {
        labels: ['Masculino', 'Femenino', 'Otros'],
        datasets: [
            {
                data: [genderData.masculino, genderData.femenino, genderData.otros],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(255, 206, 86, 0.7)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 2,
                cutout: '50%',
            },
        ],
    };  

    // Opciones del gráfico
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: { 
                position: 'top',
                labels: {
                    font: { size: 14 }
                }
            },
            title: {
                display: true,
                text: 'Distribución de Géneros',
                font: { size: 20 }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw ?? 0;
                        const percentage = genderData.total > 0 ? Math.round((value / genderData.total) * 100) : 0;
                        return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                    }
                }
            }
        },
    };

    return (
        <div className="p-4">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Distribución de Géneros de Comuneros</h1>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-full max-w-md mx-auto">
                    <Doughnut data={data} options={options} />
                </div>
                <div className="mt-6 text-center space-y-4">
                    <p className="text-lg">
                        <span className="font-semibold">Total registros:</span> {genderData.total.toLocaleString()}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="font-semibold text-blue-800">Masculino</div>
                            <div className="text-2xl font-bold text-blue-600">{genderData.masculino.toLocaleString()}</div>
                            <div className="text-sm text-blue-600">
                                {Math.round((genderData.masculino / genderData.total) * 100)}%
                            </div>
                        </div>
                        <div className="bg-pink-50 p-4 rounded-lg">
                            <div className="font-semibold text-pink-800">Femenino</div>
                            <div className="text-2xl font-bold text-pink-600">{genderData.femenino.toLocaleString()}</div>
                            <div className="text-sm text-pink-600">
                                {Math.round((genderData.femenino / genderData.total) * 100)}%
                            </div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <div className="font-semibold text-yellow-800">Otros</div>
                            <div className="text-2xl font-bold text-yellow-600">{genderData.otros.toLocaleString()}</div>
                            <div className="text-sm text-yellow-600">
                                {Math.round((genderData.otros / genderData.total) * 100)}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenderChart;