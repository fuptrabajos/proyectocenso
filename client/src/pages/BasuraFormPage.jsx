import {useForm} from "react-hook-form";
import { useEffect } from "react";
import {getTblDisBasuras, createTblDisBasuras, updateTblDisBasuras, deleteTblDisBasuras} from '../api/Basura.api';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-hot-toast';

export function BasuraFormPage() {
    const{register, handleSubmit, formState: {errors}, setValue} = 
    
    useForm();
    const navigate = useNavigate();
    const params = useParams(); 
    console.log(params);

    const onSubmit = handleSubmit(async data => {
        console.log(data)
        if(params.id) {
            await updateTblDisBasuras(params.id, data)
            toast.success('tipo de deposito de basura actualizado',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
            
        } else {
            await createTblDisBasuras(data);
            toast.success('tipo de deposito de basura actualizado con exitosamente',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
        }

        navigate("/Basura");

    });

    useEffect(() =>{
    async function loadBasura() {
        if (params.id) {
           const {
            data: {des_disp_basura}
           }= await getTblDisBasuras(params.id);
            setValue('des_disp_basura', des_disp_basura)
            

            toast.success('Tipo de deposito de basura actualizada',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
        }
    }
    loadBasura()
    },[]) 

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
               
            <label htmlFor="des_disp_basura" className="block text-white">des_disp_basura</label>
                <input
                 type="text"
                 {...register("des_disp_basura", { required: true })} 
                 className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                />
                {errors.des_disp_basura && <span>Este valor es requerido</span>}
                
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
                                await deleteTblDisBasuras(params.id);
                                toast.success('Tipo de deposito de basura borrado', {
                                    position: "bottom-right",
                                    style: {
                                        background: "#101010",
                                        color: "#ffff",
                                    }
                                })

                                navigate('/TblDisBasuras');
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