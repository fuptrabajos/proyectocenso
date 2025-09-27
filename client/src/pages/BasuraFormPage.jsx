import {useForm} from "react-hook-form";
import { useEffect } from "react";
import {getTblDisBasuras, createTblDisBasuras, updateTblDisBasuras, deleteTblDisBasuras} from '../api/Basura.api';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-hot-toast';

export function BasuraFormPage() {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm();
    const navigate = useNavigate();
    const params = useParams(); 

    const onSubmit = handleSubmit(async data => {
        try {
            if(params.id) {
                await updateTblDisBasuras(params.id, data);
                toast.success('Tipo de disposición de basura actualizado con éxito', {
                    position: "bottom-right",
                    style: {
                        background: "#047857", // Verde oscuro
                        color: "#fff",
                    }
                });
            } else {
                await createTblDisBasuras(data);
                toast.success('Nuevo tipo de disposición de basura creado con éxito', {
                    position: "bottom-right",
                    style: {
                        background: "#047857", // Verde oscuro
                        color: "#fff",
                    }
                });
            }
            navigate("/dashboard/Basura");
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
        async function loadBasura() {
            if (params.id) {
                try {
                    const {
                        data: {des_disp_basura}
                    } = await getTblDisBasuras(params.id);
                    
                    setValue('des_disp_basura', des_disp_basura);
                    
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
        loadBasura();
    }, [params.id, setValue]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                {params.id ? 'Editar Disposición de Basura' : 'Crear Nueva Disposición de Basura'}
            </h1>
            
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label htmlFor="des_disp_basura" className="block text-gray-700 font-medium mb-1">
                        Tipo de Disposición de Basura
                    </label>
                    <input
                        type="text"
                        id="des_disp_basura"
                        placeholder="Ingrese el tipo de disposición de basura"
                        {...register("des_disp_basura", { required: "Este campo es requerido" })} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.des_disp_basura && (
                        <p className="text-red-500 text-sm mt-1">{errors.des_disp_basura.message}</p>
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
                                    await deleteTblDisBasuras(params.id);
                                    toast.success('Tipo de disposición de basura eliminado correctamente', {
                                        position: "bottom-right",
                                        style: {
                                            background: "#047857",
                                            color: "#fff",
                                        }
                                    });
                                    navigate('/dashboard/Basura');
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
                    onClick={() => navigate('/dashboard/Basura')}
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