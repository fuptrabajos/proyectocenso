import {useForm} from "react-hook-form";
import { useEffect } from "react";
import {createTblAfiliacion, deleteTblAfiliacion, updateTblAfiliacion , getTblAfiliacion} from '../api/Afiliacion.api';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-hot-toast';

export function AfiliacionFormPage() {
    const{register, handleSubmit, formState: {errors}, setValue} = 
    
    useForm();
    const navigate = useNavigate();
    const params = useParams(); 
    console.log(params);

    const onSubmit = handleSubmit(async data => {
        console.log(data)
        if(params.id) {
            await updateTblAfiliacion(params.id, data)
            toast.success('Eps actualizada con exito',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
            
        } else {
            await createTblAfiliacion(data);
            toast.success('Eps Creada con exito',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
        }

        navigate("/Afiliacion");

    });

    useEffect(() =>{
    async function loadAfiliacion() {
        if (params.id) {
           const {
            data: {codigo_eapb, nombre_eapb, regimen}
           }= await getTblAfiliacion(params.id);
            setValue('codigo_eapb', codigo_eapb)
            setValue('nombre_eapb', nombre_eapb)
            setValue('regimen', regimen)

            toast.success('Eps Actualizada exitosamente',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
        }
    }
    loadAfiliacion()
    },[]) 

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
                
            <label htmlFor="codigo_eapb" className="block text-white">Código de EAPB</label>
                <input
                 type="text"
                 
                 {...register("codigo_eapb", { required: true })} 
                 className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                />
                {errors.codigo_eapb && <span>Este valor es requerido</span>}

                <label htmlFor="codigo_eapb" className="block text-white">Nombre de EAPB</label>
                <input
                 type="text"
                 
                 {...register("nombre_eapb", { required: true })}
                className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                />
                {errors.nombre_eapb && <span>Este valor es requerido</span>}

                <label htmlFor="codigo_eapb" className="block text-white">Regimen de EAPB</label>
                <input
                 type="text"
                 
                 {...register("regimen", { required: true })}
                 className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                />                             
                {errors.regimen && <span>Este valor es requerido</span>}                                              

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
                                await deleteTblAfiliacion(params.id);
                                toast.success('Eps eliminada', {
                                    position: "bottom-right",
                                    style: {
                                        background: "#101010",
                                        color: "#ffff",
                                    }
                                })

                                navigate('/TblAfiliacion');
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