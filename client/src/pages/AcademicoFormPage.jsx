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
                    style: { background: "#101010", color: "#fff" },
                });
            } else {
                await createTblNivelAcademico(data);
                toast.success("Nivel académico creado con éxito", {
                    position: "bottom-right",
                    style: { background: "#101010", color: "#fff" },
                });
            }
            navigate("/Academico");
        } catch (error) {
            toast.error("Error al guardar los datos", {
                position: "bottom-right",
                style: { background: "#101010", color: "#fff" },
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
                }
            } catch (error) {
                toast.error("Error al cargar los datos", {
                    position: "bottom-right",
                    style: { background: "#101010", color: "#fff" },
                });
            }
        }
        loadAcademico();
    }, [params.id, setValue]);

    return (
        <div className="max-w-xl mx-auto">
           <form onSubmit={onSubmit}>
    <label htmlFor="des_nivel_academico" className="block mb-2">
        Selecciona el Nivel Académico:
    </label>
    <select
        id="des_nivel_academico"
        {...register("des_nivel_academico", { required: "Selecciona un nivel académico" })}
        className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
    >
        <option value="" disabled>
            -- Selecciona una opción --
        </option>
        <option value="ninguno">Ninguno</option>
        <option value="primaria">Primaria</option>
        <option value="secundaria">Secundaria</option>
        <option value="pregrado">Pregrado</option>
        <option value="licenciatura">Licenciatura</option>
        <option value="maestria">Maestría</option>
        <option value="doctorado">Doctorado</option>
    </select>
    {errors.des_nivel_academico && (
        <span className="text-red-500">{errors.des_nivel_academico.message}</span>
    )}

    <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
        Guardar
    </button>
</form>


            {params.id && (
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 p-3 rounded-lg w-48 mt-3"
                        onClick={async () => {
                            const accepted = window.confirm("¿Está seguro de borrar el registro?");
                            if (accepted) {
                                try {
                                    await deleteTblNivelAcademico(params.id);
                                    toast.success("Nivel académico borrado", {
                                        position: "bottom-right",
                                        style: { background: "#101010", color: "#fff" },
                                    });
                                    navigate("/Academico");
                                } catch (error) {
                                    toast.error("Error al borrar el registro", {
                                        position: "bottom-right",
                                        style: { background: "#101010", color: "#fff" },
                                    });
                                }
                            }
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
