import {useForm} from "react-hook-form";
import { useEffect } from "react";
import {getTblTiposCultivo, createTblTiposCultivo, updateTblTiposCultivo, deleteTblTiposCultivo } from '../api/Cultivo.Api';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-hot-toast';

export function CultivoFormPage() {
    const{register, handleSubmit, formState: {errors}, setValue} = 
    
    useForm();
    const navigate = useNavigate();
    const params = useParams(); 
    console.log(params);

    const onSubmit = handleSubmit(async data => {
        console.log(data)
        if(params.id) {
            await updateTblTiposCultivo(params.id, data)
            toast.success('Eps actualizada con exito',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
            
        } else {
            await createTblTiposCultivo(data);
            toast.success('Eps Creada con exito',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
        }

        navigate("/Cultivo");

    });

    useEffect(() =>{
    async function loadCultivo() {
        if (params.id) {
           const {
            data: {des_cultivos, cantidad_en_hectareas, periodicidad}
           }= await getTblTiposCultivo(params.id);
            setValue('des_cultivos', des_cultivos)
            setValue('cantidad_en_hectareas', cantidad_en_hectareas)
            setValue('periodicidad', periodicidad)

            toast.success('Eps Actualizada exitosamente',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
        }
    }
    loadCultivo();
    },[]) 

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
                <input
                 type="text"
                 placeholder="des_cultivos"
                 {...register("des_cultivos", { required: true })} 
                 className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                />
                {errors.des_cultivos && <span>Este valor es requerido</span>}
                <input
                 type="text"
                 placeholder="cantidad_en_hectareas"
                 {...register("cantidad_en_hectareas", { required: true })}
                className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                />
                {errors.cantidad_en_hectareas && <span>Este valor es requerido</span>}
                <input
                 type="text"
                 placeholder="periodicidad"
                 {...register("periodicidad", { required: true })}
                 className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                />                             
                {errors.periodicidad && <span>Este valor es requerido</span>}                                              

                <button className="gb-indigo-500 p-3 rounded-lg block w-full mt-3">
                Guardar</button>
            </form>

           
            {params.id && (
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 p-3 rounded-lg  w-48 mt-3"
                        onClick={async () => {
                            const accepted = window.confirm('esta seguo de borrar el registro?');
                            if (accepted) {
                                await deleteTblTiposCultivo(params.id);
                                toast.success('Eps eliminada', {
                                    position: "bottom-right",
                                    style: {
                                        background: "#101010",
                                        color: "#ffff",
                                    }
                                })
                                console.log('ID para eliminar:', id);

                                navigate('/TblTiposCultivo');
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