import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createTblDatPer, deleteTblDatPer, updateTblDatPer, getTblDatPer } from '../api/Datper.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function DatperFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } =

        useForm();
    const navigate = useNavigate();
    const params = useParams();
    console.log(params);

    const onSubmit = handleSubmit(async data => {
        console.log(data)//verifica los datos antes de enviar

        if (params.id) {
            await updateTblDatPer(params.id, data)
            toast.success('Comunero actualizado con exito', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff",
                }
            })

        } else {
            await createTblDatPer(data);
            toast.success('Comunero creado con exito', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff",
                }
            })
        }

        navigate("/Datper");

    });

    useEffect(() => {
        async function loadDatper() {
            if (params.id) {
                const {
                    data: { tip_iden_usu, identificacion_usuario, nombre_1, nombre_2, apellido_1, apellido_2, fec_nto, lugar_residencia, etnia,
                        resguardo, codigo_eapb, lugar_de_trabajo, nombre_padre, nombre_madre, id_tip_vivienda, tiene_parcela, id_tip_cultivos,
                        nivel_de_academico, estado_civil, regimen, sexo_al_nacer, habla_otra_lenjua, comunidad_de_origen, usa_medicina_tradicional,
                        cuenta_con_servicios_publico, id_disp_de_las_basuras, numero_familia }
                } = await getTblDatPer(params.id);
                setValue('tip_iden_usu', tip_iden_usu)
                setValue('identificacion_usuario', identificacion_usuario)
                setValue('nombre_1', nombre_1)
                setValue('nombre_2', nombre_2)
                setValue('apellido_1', apellido_1)
                setValue('apellido_2', apellido_2)
                setValue('fec_nto', fec_nto)
                setValue('lugar_residencia', lugar_residencia)
                setValue('etnia', etnia)
                setValue('resguardo', resguardo)
                setValue('codigo_eapb', codigo_eapb)
                setValue('lugar_de_trabajo', lugar_de_trabajo)
                setValue('nombre_padre', nombre_padre)
                setValue('nombre_madre', nombre_madre)
                setValue('id_tip_vivienda', id_tip_vivienda)
                setValue('tiene_parcela', tiene_parcela)
                setValue('id_tip_cultivos', id_tip_cultivos)
                setValue('nivel_de_academico', nivel_de_academico)
                setValue('estado_civil', estado_civil)
                setValue('regimen', regimen)
                setValue('sexo al nacer', sexo_al_nacer)
                setValue('habla_otra_lenjua', habla_otra_lenjua)
                setValue('comunidad_de_origen', comunidad_de_origen)
                setValue('usa_medicina_tradicional', usa_medicina_tradicional)
                setValue('cuenta_con_servicios_publico', cuenta_con_servicios_publico)
                setValue('id_disp_de_las_basuras', id_disp_de_las_basuras)
                setValue('numero_familia', numero_familia)

                toast.success('Comunero actualizado exitosamente', {
                    position: "bottom-right",
                    style: {
                        background: "#101010",
                        color: "#fff",
                    }
                })
            }
        }
        loadDatper()
    }, [])

    return (



        <div className="max-w-3xl mx-auto bg-zinc-800 p-6 rounded-lg">
            <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4">


                <input type="text" placeholder="Tipo. Identidad" {...register("tip_iden_usu", { required: true })} className="bg-zinc-700 p-3 rounded-lg" />
                <input type="text" placeholder="Identificación" {...register("identificacion_usuario", { required: true })} className="bg-zinc-700 p-3 rounded-lg" />
                <input type="text" placeholder="Primer Nombre" {...register("nombre_1", { required: true })} className="bg-zinc-700 p-3 rounded-lg" />
                <input type="text" placeholder="Segundo Nombre" {...register("nombre_2")} className="bg-zinc-700 p-3 rounded-lg" />
                <input type="text" placeholder="Primer Apellido" {...register("apellido_1", { required: true })} className="bg-zinc-700 p-3 rounded-lg" />
                <input type="text" placeholder="Segundo Apellido" {...register("apellido_2")} className="bg-zinc-700 p-3 rounded-lg" />
                <input type="date" placeholder="Fecha Nacimiento" {...register("fec_nto", { required: true })} className="bg-zinc-700 p-3 rounded-lg" />
                <input type="text" placeholder="Lugar Residencia" {...register("lugar_residencia", { required: true })} className="bg-zinc-700 p-3 rounded-lg" />
                <input type="text" placeholder="Etnia" {...register("etnia", { required: true })} className="bg-zinc-700 p-3 rounded-lg" />
                <input type="text" placeholder="Resguardo" {...register("resguardo", { required: true })} className="bg-zinc-700 p-3 rounded-lg" />
                <input type="text" placeholder="Código EAPB" {...register("codigo_eapb")} className="bg-zinc-700 p-3 rounded-lg" />
                <input type="text" placeholder="Lugar Trabajo" {...register("lugar_de_trabajo")} className="bg-zinc-700 p-3 rounded-lg" />
                <input type="text" placeholder="Numero familia" {...register("numero_familia")} className="bg-zinc-700 p-3 rounded-lg" />

                {/* Campos tipo checkbox */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium">¿Tiene parcela?</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="si"
                                {...register("Tiene parcela", { required: true })}
                                className="bg-zinc-700 p-3 rounded-lg"
                            />
                            <span>Sí</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="no"
                                {...register("Tiene parcela", { required: true })}
                                className="bg-zinc-700 p-3 rounded-lg"
                            />
                            <span>No</span>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium">¿Habla otra lengua?</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="si"
                                {...register("Habla otra lenjua", { required: true })}
                                className="bg-zinc-700 p-3 rounded-lg"
                            />
                            <span>Sí</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="no"
                                {...register("Habla otra lenjua", { required: true })}
                                className="bg-zinc-700 p-3 rounded-lg"
                            />
                            <span>No</span>
                        </label>
                    </div>
                </div>


                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium">¿Usa medicina tradicional?</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="si"
                                {...register("usa medicina tradicional", { required: true })}
                                className="bg-zinc-700 p-3 rounded-lg"
                            />
                            <span>Sí</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="no"
                                {...register("usa medicina tradicional", { required: true })}
                                className="bg-zinc-700 p-3 rounded-lg"
                            />
                            <span>No</span>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium">¿Cuenta con Servicios Públicos?</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="si"
                                {...register("cuenta_con_servicios_publico", { required: true })}
                                className="bg-zinc-700 p-3 rounded-lg"
                            />
                            <span>Sí</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="no"
                                {...register("cuenta_con_servicios_publico", { required: true })}
                                className="bg-zinc-700 p-3 rounded-lg"
                            />
                            <span>No</span>
                        </label>
                    </div>
                </div>

                {/* Botón de envío en toda la fila */}
                <div className="col-span-1 lg:col-span-2">
                    <button className="bg-indigo-500 p-3 rounded-lg w-full mt-3">Guardar</button>
                </div>


            </form>

            {/* Botón de eliminar solo si hay un ID */}
            {params.id && (
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 p-3 rounded-lg w-48 mt-3"
                        onClick={async () => {
                            const accepted = window.confirm('¿Está seguro de borrar el registro?');
                            if (accepted) {
                                await deleteTblDatPer(params.id);
                                toast.success('Comunero eliminado', { position: "bottom-right" });
                                navigate('/Datper');
                            }
                        }}
                    >
                        Eliminar
                    </button>
                </div>

            )}

        </div>

    );
}