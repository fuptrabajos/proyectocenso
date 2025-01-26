import {useForm} from "react-hook-form";
import { useEffect } from "react";
import {createTblRegimen, deleteTblRegimen, updateTblRegimen , getTblRegimen} from '../api/Regimen.api';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-hot-toast';

export function RegimenFormPage() {
    const{register, handleSubmit, formState: {errors}, setValue} = 
    
    useForm();
    const navigate = useNavigate();
    const params = useParams(); 
    console.log(params);

    const onSubmit = handleSubmit(async data => {
        console.log(data)
        if(params.id) {
            await updateTblRegimen(params.id, data)
            toast.success('tipo de regimen actualizado',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
            
        } else {
            await createTblRegimen(data);
            toast.success('tipo de regimen creado exitosamente',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
        }

        navigate("/Regimen");

    });

    useEffect(() =>{
    async function loadRegimen() {
        if (params.id) {
           const {
            data: {des_regimen}
           }= await getTblRegimen(params.id);
            setValue('des_regimen', des_regimen)
            

            toast.success('Tipo de regimen actualizada',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
        }
    }
    loadRegimen()
    },[]) 

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
                <input
                 type="text"
                 placeholder="des_regimen"
                 {...register("des_regimen", { required: true })} 
                 className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                />
                {errors.des_regimen && <span>Este valor es requerido</span>}
                
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
                                await deleteTblRegimen(params.id);
                                toast.success('Tipo de regimen borrado', {
                                    position: "bottom-right",
                                    style: {
                                        background: "#101010",
                                        color: "#ffff",
                                    }
                                })

                                navigate('/TblRegimen');
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