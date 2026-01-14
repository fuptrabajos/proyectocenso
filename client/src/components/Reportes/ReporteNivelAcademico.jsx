import { useEffect, useState, useMemo } from 'react';
import { getAllTblDatPer } from '../../api/ReporteNivelAcademico.api';
import * as XLSX from 'xlsx';

export function ReporteNivelAcademico() {
    const [comuneros, setComuneros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nivelFilter, setNivelFilter] = useState('todos');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllTblDatPer();
                setComuneros(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const { stats, filteredData } = useMemo(() => {
        const filtered = nivelFilter === 'todos'
            ? comuneros
            : comuneros.filter(c => c.des_nivel_academico === nivelFilter);

        const niveles = [...new Set(comuneros.map(c => c.des_nivel_academico).filter(Boolean))];
        const stats = {};
        niveles.forEach(nivel => {
            stats[nivel] = comuneros.filter(c => c.des_nivel_academico === nivel).length;
        });

        return { stats, filteredData: filtered };
    }, [comuneros, nivelFilter]);

    const exportToExcel = () => {
        const dataToExport = filteredData.map(c => ({
            'ID': c.id_paciente,
            'Nombre': `${c.nombre_1 || ''} ${c.nombre_2 || ''} ${c.apellido_1 || ''} ${c.apellido_2 || ''}`,
            'Nivel Académico': c.des_nivel_academico,
            'Edad': c.edad,
            'Sexo': c.descripcion,
            'Vereda': c.lugar_residencia
        }));

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "NivelAcademico");
        XLSX.writeFile(wb, `nivel_academico_${filteredData.length}.xlsx`);
    };

    if (loading) return <p>Cargando datos...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Reporte Nivel Académico</h1>

            <div className="mb-4 flex gap-4">
                <select
                    value={nivelFilter}
                    onChange={e => setNivelFilter(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="todos">Todos</option>
                    {Array.from(new Set(comuneros.map(c => c.des_nivel_academico).filter(Boolean)))
                        .map(nivel => <option key={nivel} value={nivel}>{nivel}</option>)
                    }
                </select>
                <button onClick={exportToExcel} className="px-4 py-2 bg-green-600 text-white rounded">
                    Exportar {filteredData.length}
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
                {Object.entries(stats).map(([nivel, count]) => (
                    <div key={nivel} className="p-3 bg-blue-50 border rounded">
                        <h3 className="text-blue-800 font-semibold">{nivel}</h3>
                        <p className="text-xl font-bold">{count}</p>
                    </div>
                ))}
            </div>

            <table className="min-w-full divide-y divide-gray-200 border">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Nivel Académico</th>
                        <th className="px-4 py-2">Edad</th>
                        <th className="px-4 py-2">Sexo</th>
                        <th className="px-4 py-2">Vereda</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(c => (
                        <tr key={c.id_paciente} className="hover:bg-gray-50">
                            <td className="px-4 py-2">{c.id_paciente}</td>
                            <td className="px-4 py-2">{`${c.nombre_1 || ''} ${c.nombre_2 || ''} ${c.apellido_1 || ''} ${c.apellido_2 || ''}`}</td>
                            <td className="px-4 py-2">{c.des_nivel_academico}</td>
                            <td className="px-4 py-2">{c.edad}</td>
                            <td className="px-4 py-2">{c.descripcion}</td>
                            <td className="px-4 py-2">{c.lugar_residencia}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
