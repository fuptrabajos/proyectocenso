import React, { useEffect, useState } from 'react';
import { getAllTblDatPer } from '../api/ReporteComunero.api';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const GenderChart = () => {
    const [comuneros, setComuneros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllTblDatPer();
                setComuneros(response.data);
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
        return <div className="p-4">Cargando datos...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    // Contar géneros
    const countGenders = () => {
        return comuneros.reduce((counts, comunero) => {
            const genero = comunero.descripcion?.toLowerCase() || "otros";
            if (genero === 'masculino') counts.masculino++;
            else if (genero === 'femenino') counts.femenino++;
            else counts.otros++;
            return counts;
        }, { masculino: 0, femenino: 0, otros: 0 });
    };

    const genderCounts = countGenders();
    const totalComuneros = comuneros.length;
    

    // Datos para el gráfico
    const data = {
        labels: ['Masculino', 'Femenino', 'Otros'],
        datasets: [
            {
                data: [genderCounts.masculino, genderCounts.femenino, genderCounts.otros],
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
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'Distribución de Géneros',
                font: { size: 26 }
                
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw ?? 0;
                        const percentage = totalComuneros > 0 ? Math.round((value / totalComuneros) * 100) : 0;
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        },
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Distribución de Géneros de Comuneros</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-full md:w-1/2 mx-auto">
                    <Doughnut data={data} options={options} />
                </div>
                <div className="mt-6 text-center">
                    <p className="text-lg">
                        <span className="font-semibold">Total registros:</span> {totalComuneros}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold">Masculino:</span> {genderCounts.masculino} | 
                        <span className="font-semibold"> Femenino:</span> {genderCounts.femenino} | 
                        <span className="font-semibold"> Otros:</span> {genderCounts.otros}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GenderChart;
