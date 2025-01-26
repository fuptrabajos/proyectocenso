import {useForm} from "react-hook-form";
import { useEffect } from "react";
import {createTblTiposDeVivienda, deleteTblTiposDeVivienda, updateTblTiposDeVivienda, getTblTiposDeVivienda} from '../api/Vivienda.api';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-hot-toast';

export function ViviendaFormPage() {
    const{register, handleSubmit, formState: {errors}, setValue} = 
    
    useForm();
    const navigate = useNavigate();
    const params = useParams(); 
    console.log(params);

    const onSubmit = handleSubmit(async data => {
        console.log(data)
        if(params.id) {
            await updateTblTiposDeVivienda(params.id, data)
            toast.success('tipo de vivienda actualizados',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
            
        } else {
            await createTblTiposDeVivienda(data);
            toast.success('Nuevo tipo de viviendacreado',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
        }

        navigate("/Vivienda");

    });

    useEffect(() =>{
    async function loadVivienda() {
        if (params.id) {
           const {
            data: {id_tip_vivienda}
           }= await getTblTiposDeVivienda(params.id);
            setValue('id_nivel_acad', id_tip_vivienda)
            

            toast.success('Tipo de vivienda actualizada',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
        }
    }
    loadVivienda()
    },[]) 

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
                
                
                <input
                 type="text"
                 placeholder="Tipo_vivienda"
                 {...register("Tipo_vivienda", { required: true })} 
                 className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                />
                {errors.Tipo_vivienda && <span>Este valor es requerido</span>}
                
                
                
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
                                await deleteTblTiposDeVivienda(params.id);
                                toast.success('Tipo de identidad borrado', {
                                    position: "bottom-right",
                                    style: {
                                        background: "#101010",
                                        color: "#ffff",
                                    }
                                })

                                navigate('/TblTiposDeVivienda');
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