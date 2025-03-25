import {useForm} from "react-hook-form";
import { useEffect } from "react";
import {createTblSexo, deleteTblSexo, updateTblSexo , getTblSexo} from '../api/Sexo.api';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-hot-toast';

export function SexoFormPage() {
    const{register, handleSubmit, formState: {errors}, setValue} = 
    
    useForm();
    const navigate = useNavigate();
    const params = useParams(); 
    console.log(params);

    const onSubmit = handleSubmit(async data => {
        console.log(data)
        if(params.id) {
            await updateTblSexo(params.id, data)
            toast.success('tipo de sexo actualizados',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
            
        } else {
            await create(data);
            toast.success('Nuevo tipo de sexocreado',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
        }

        navigate("/dashboard/Sexo");

    });

    useEffect(() =>{
    async function loadSexo() {
        if (params.id) {
           const {
            data: {sexo_al_nacer}
           }= await getTblTiposDeVivienda(params.id);
            setValue('sexo_al_nacer', sexo_al_nacer)
            

            toast.success('Tipo de sexo actualizada',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
        }
    }
    loadSexo()
    },[]) 

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
                
                
                <input
                 type="text"
                 placeholder="descripcion"
                 {...register("descripcion", { required: true })} 
                 className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                />
                {errors.descripcion && <span>Este valor es requerido</span>}
                
                
                
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
                                await deleteTblSexo(params.id);
                                toast.success('Tipo de sexo borrado', {
                                    position: "bottom-right",
                                    style: {
                                        background: "#101010",
                                        color: "#ffff",
                                    }
                                })

                                navigate('/dashboard/Sexo');
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