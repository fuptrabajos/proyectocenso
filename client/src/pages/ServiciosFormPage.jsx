import {useForm} from "react-hook-form";
import { useEffect } from "react";
import {createTblTiposServiPubli, deleteTblTiposServiPubli, updateTblTiposServiPubli , getTblTiposServiPubli} from '../api/Servicios.api';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-hot-toast';

export function ServiciosFormPage() {
    const{register, handleSubmit, formState: {errors}, setValue} = 
    
    useForm();
    const navigate = useNavigate();
    const params = useParams(); 
    console.log(params);

    const onSubmit = handleSubmit(async data => {
        console.log(data)
        if(params.id) {
            await updateTblTiposServiPubli(params.id, data)
            toast.success('tipo de servicio publico actualizado',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
            
        } else {
            await createTblTiposServiPubli(data);
            toast.success('tipo de servicios publico creado exitosamente',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
        }

        navigate("/Servicios");

    });

    useEffect(() =>{
    async function loadServicios() {
        if (params.id) {
           const {
            data: {des_servicio, permanente}
           }= await getTblTiposServiPubli(params.id);
            setValue('des_servicio', des_servicio)
            setValue('permanente', permanente)
            

            toast.success('Tipo de servicios publico actualizado',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
        }
    }
    loadServicios()
    },[]) 

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
                <input
                 type="text"
                 placeholder="des_servicio"
                 {...register("des_servicio", { required: true })} 
                 className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                />
                {errors.des_servicio && <span>Este valor es requerido</span>}

                <input
                 type="text"
                 placeholder="permanente"
                 {...register("permanente", { required: true })} 
                 className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                />
                {errors.permanente && <span>Este valor es requerido</span>}
                
                
                <button className="gb-indigo-500 p-3 rounded-lg block w-full mt-3">
                Guardar</button>
            </form>

           
            {params.id && (
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 p-3 rounded-lg  w-48 mt-3"
                        onClick={async () => {
                            const accepted = window.confirm('esta seguro de borrar el registro?');
                            if (accepted) {
                                await deleteTblTiposServiPubli(params.id);
                                toast.success('Tipo de regimen borrado', {
                                    position: "bottom-right",
                                    style: {
                                        background: "#101010",
                                        color: "#ffff",
                                    }
                                })

                                navigate('/TblTiposServiPubli');
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