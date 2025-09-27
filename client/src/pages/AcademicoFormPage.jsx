import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
    getTblNivelAcademico,
    updateTblNivelAcademico,
    createTblNivelAcademico,
    deleteTblNivelAcademico,
} from "../api/Academico.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function AcademicoFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (params.id) {
                await updateTblNivelAcademico(params.id, data);
                toast.success("Nivel académico actualizado con éxito", {
                    position: "bottom-right",
                    style: {
                        background: "#047857", // Verde oscuro
                        color: "#fff",
                    }
                });
            } else {
                await createTblNivelAcademico(data);
                toast.success("Nivel académico creado con éxito", {
                    position: "bottom-right",
                    style: {
                        background: "#047857", // Verde oscuro
                        color: "#fff",
                    }
                });
            }
            navigate("/dashboard/Academico");
        } catch (error) {
            toast.error("Error al guardar los datos", {
                position: "bottom-right",
                style: {
                    background: "#DC2626", // Rojo
                    color: "#fff",
                }
            });
        }
    });

    useEffect(() => {
        async function loadAcademico() {
            try {
                if (params.id) {
                    const {
                        data: { des_nivel_academico },
                    } = await getTblNivelAcademico(params.id);
                    setValue("des_nivel_academico", des_nivel_academico);
                    
                    toast.success('Datos cargados correctamente', {
                        position: "bottom-right",
                        style: {
                            background: "#047857", // Verde oscuro
                            color: "#fff",
                        }
                    });
                }
            } catch (error) {
                toast.error("Error al cargar los datos", {
                    position: "bottom-right",
                    style: {
                        background: "#DC2626", // Rojo
                        color: "#fff",
                    }
                });
            }
        }
        loadAcademico();
    }, [params.id, setValue]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                {params.id ? 'Editar Nivel Académico' : 'Crear Nuevo Nivel Académico'}
            </h1>
            
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label htmlFor="des_nivel_academico" className="block text-gray-700 font-medium mb-1">
                        Nivel Académico
                    </label>
                    <select
                        id="des_nivel_academico"
                        {...register("des_nivel_academico", { required: "Selecciona un nivel académico" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                    >
                        <option value="" disabled>
                            -- Selecciona una opción --
                        </option>
                        <option value="BASICA PRIMARIA">BASICA PRIMARIA</option>
                        <option value="BASICA SECUNDARIA">BASICA SECUNDARIA</option>
                        <option value="BASICA MEDIA">BASICA MEDIA</option>
                        <option value="PREESCOLAR">PREESCOLAR</option>
                        <option value="TECNICO">TECNICO</option>
                        <option value="TECNOLOGIA">TECNOLOGIA</option>
                        <option value="PROFESIONAL">PROFESIONAL</option>
                        <option value="ESPECIALIZACION">ESPECIALIZACION</option>
                        <option value="MAGISTER">MAGISTER</option>
                        <option value="DOCTORADO">DOCTORADO</option>
                        <option value="NINGUNA">NINGUNA</option>
                       
                    </select>
                    {errors.des_nivel_academico && (
                        <p className="text-red-500 text-sm mt-1">{errors.des_nivel_academico.message}</p>
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
                            const accepted = window.confirm("¿Está seguro de eliminar este registro?");
                            if (accepted) {
                                try {
                                    await deleteTblNivelAcademico(params.id);
                                    toast.success("Nivel académico eliminado correctamente", {
                                        position: "bottom-right",
                                        style: {
                                            background: "#047857",
                                            color: "#fff",
                                        }
                                    });
                                    navigate("/dashboard/Academico");
                                } catch (error) {
                                    toast.error("Error al eliminar", {
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
                    onClick={() => navigate('/dashboard/Academico')}
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