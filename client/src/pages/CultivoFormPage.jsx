import {useForm} from "react-hook-form";
import { useEffect } from "react";
import {getTblTiposCultivo, createTblTiposCultivo, updateTblTiposCultivo, deleteTblTiposCultivo } from '../api/Cultivo.Api';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-hot-toast';

export function CultivoFormPage() {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async data => {
        try {
            if(params.id) {
                await updateTblTiposCultivo(params.id, data);
                toast.success('Cultivo actualizado con éxito', {
                    position: "bottom-right",
                    style: {
                        background: "#047857", // Verde oscuro
                        color: "#fff",
                    }
                });
            } else {
                await createTblTiposCultivo(data);
                toast.success('Cultivo creado con éxito', {
                    position: "bottom-right",
                    style: {
                        background: "#047857", // Verde oscuro
                        color: "#fff",
                    }
                });
            }
            navigate("/dashboard/Cultivo");
        } catch (error) {
            toast.error('Error al guardar los datos', {
                position: "bottom-right",
                style: {
                    background: "#DC2626", // Rojo
                    color: "#fff",
                }
            });
        }
    });

    useEffect(() => {
        async function loadCultivo() {
            if (params.id) {
                try {
                    const {
                        data: {des_cultivos, cantidad_en_hectareas, periodicidad}
                    } = await getTblTiposCultivo(params.id);
                    
                    setValue('des_cultivos', des_cultivos);
                    setValue('cantidad_en_hectareas', cantidad_en_hectareas);
                    setValue('periodicidad', periodicidad);
                    
                    toast.success('Datos cargados correctamente', {
                        position: "bottom-right",
                        style: {
                            background: "#047857", // Verde oscuro
                            color: "#fff",
                        }
                    });
                } catch (error) {
                    toast.error('Error al cargar los datos', {
                        position: "bottom-right",
                        style: {
                            background: "#DC2626", // Rojo
                            color: "#fff",
                        }
                    });
                }
            }
        }
        loadCultivo();
    }, [params.id, setValue]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                {params.id ? 'Editar Cultivo' : 'Registrar Nuevo Cultivo'}
            </h1>
            
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label htmlFor="des_cultivos" className="block text-gray-700 font-medium mb-1">Descripción del Cultivo</label>
                    <input
                        type="text"
                        id="des_cultivos"
                        placeholder="Ingrese la descripción del cultivo"
                        {...register("des_cultivos", { required: "Este campo es requerido" })} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.des_cultivos && (
                        <p className="text-red-500 text-sm mt-1">{errors.des_cultivos.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="cantidad_en_hectareas" className="block text-gray-700 font-medium mb-1">Cantidad en Hectáreas</label>
                    <input
                        type="text"
                        id="cantidad_en_hectareas"
                        placeholder="Ingrese la cantidad en hectáreas"
                        {...register("cantidad_en_hectareas", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.cantidad_en_hectareas && (
                        <p className="text-red-500 text-sm mt-1">{errors.cantidad_en_hectareas.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="periodicidad" className="block text-gray-700 font-medium mb-1">Periodicidad</label>
                    <input
                        type="text"
                        id="periodicidad"
                        placeholder="Ingrese la periodicidad"
                        {...register("periodicidad", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />                             
                    {errors.periodicidad && (
                        <p className="text-red-500 text-sm mt-1">{errors.periodicidad.message}</p>
                    )}
                </div>

                <div className="pt-2">
                    <button 
                        type="submit" 
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {params.id ? 'Actualizar' : 'Guardar'}
                    </button>
                </div>
            </form>

            {params.id && (
                <div className="mt-6">
                    <button
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                        onClick={async () => {
                            const accepted = window.confirm('¿Está seguro de eliminar este registro?');
                            if (accepted) {
                                try {
                                    await deleteTblTiposCultivo(params.id);
                                    toast.success('Cultivo eliminado correctamente', {
                                        position: "bottom-right",
                                        style: {
                                            background: "#047857",
                                            color: "#fff",
                                        }
                                    });
                                    navigate('/dashboard/Cultivo');
                                } catch (error) {
                                    toast.error('Error al eliminar', {
                                        position: "bottom-right",
                                        style: {
                                            background: "#DC2626",
                                            color: "#fff",
                                        }
                                    });
                                }
                            }
                        }}
                    >
                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v10M9 7h1m-1 4h1m4-4h-1m-1 4h1" />
                        </svg>
                        Eliminar
                    </button>
                </div>
            )}

            <div className="mt-4">
                <button
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    onClick={() => navigate('/dashboard/Cultivo')}
                >
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver
                </button>
            </div>
        </div>
    );
}