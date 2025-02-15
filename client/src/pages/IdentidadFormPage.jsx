import {useForm} from "react-hook-form";
import { useEffect } from "react";
import {createTblTipIdentidad, deleteTblTipIdentidad, updateTblTipIdentidad , getTblTipIdentidad} from '../api/Identidad.api';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-hot-toast';

export function IdentidadFormPage() {
    const{register, handleSubmit, formState: {errors}, setValue} = 
    
    useForm();
    const navigate = useNavigate();
    const params = useParams(); 
    console.log(params);

    const onSubmit = handleSubmit(async data => {
        console.log(data)
        if(params.id) {
            await updateTblTipIdentidad(params.id, data)
            toast.success('tipo de identidad actualizada',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
            
        } else {
            await createTblTipIdentidad(data);
            toast.success('tipo de identidad creada exitosamente',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
        }

        navigate("/Identidad");

    });

    useEffect(() =>{
    async function loadIdentidad() {
        if (params.id) {
           const {
            data: {des_tip_identidad}
           }= await getTblTipIdentidad(params.id);
            setValue('des_tip_identidad', des_tip_identidad)
            
            

            toast.success('Tipo de identidad actualizada',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
        }
    }
    loadIdentidad()
    },[]) 

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
                <input
                 type="text"
                 placeholder="des_tip_identidad"
                 {...register("des_tip_identidad", { required: true })} 
                 className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                />
                {errors.codigo_eapb && <span>Este valor es requerido</span>}
                
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
                                await deleteTblTipIdentidad(params.id);
                                toast.success('Tipo de identidad borrado', {
                                    position: "bottom-right",
                                    style: {
                                        background: "#101010",
                                        color: "#ffff",
                                    }
                                })

                                navigate('/TblIdentidad');
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