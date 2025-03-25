import {useForm} from "react-hook-form";
import { useEffect,useState } from "react";
import {createTblDatPer, deleteTblDatPer, updateTblDatPer , getTblDatPer} from'../api/Datper.api';
import {useNavigate, useParams} from'react-router-dom';
import {toast} from'react-hot-toast';
import { getAllTblTipIdentidad } from '../api/Identidad.api'; 
import { getAllTblAfiliacion } from '../api/Afiliacion.api';   
import { getAllTblTiposDeVivienda } from '../api/Vivienda.api'; 
import { getAllTblTiposCultivo } from '../api/Cultivo.Api';
import { getAllTblNivelAcademico } from '../api/Academico.api'; // Importa la función para obtener los niveles académicos 
import { getAllTblRegimen } from '../api/Regimen.api'; // Importa la función para obtener los niveles académicos 
import {getAllTblDisBasuras} from '../api/Basura.api';
import {getAllTblSexo} from '../api/Sexo.api';


export function DatperFormPage() {
    const{register, handleSubmit, formState: {errors}, setValue} = useForm();
    const navigate = useNavigate();
    const params = useParams(); 
    const [tiposIdentidad, setTiposIdentidad] = useState([]);
    const [tiposEps, setTiposEps] = useState([]);
    const [tiposVivienda, setTiposVivienda] = useState([]); // Estado para almacenar los tipos de vivienda
    const [TiposCultivo, setTiposCultivo] = useState([]); // Estado para almacenar los tipos de vivienda
    const [nivelesAcademicos, setNivelesAcademicos] = useState([]); 
    const [TiposRegimen, setTiposRegimen] = useState([]); 
    const [TiposBasura, setTiposBasura] = useState([]); 
    const [TipoSexo, setTipoSexo] = useState([]); 
    
    console.log(params);
    
    const onSubmit = handleSubmit(async data => {
        console.log(data)//verifica los datos antes de enviar

        if(params.id) {
            await updateTblDatPer(params.id, data)
            toast.success('Comunero actualizado con exito',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
            
        } else {
            await createTblDatPer(data);
            toast.success('Comunero creado con exito',{
                position:"bottom-right",
                style:{
                    background:"#101010",
                    color:"#fff",
                }
            })
        }

        navigate("/dashboard/Datper");

    });
    useEffect(() => {
        async function fetchTiposIdentidad() {
          try {
            const response = await getAllTblTipIdentidad();
            setTiposIdentidad(response.data);
          } catch (error) {
            console.error("Error al obtener los tipos de identidad", error);
          }
        }
        fetchTiposIdentidad();
      }, []);
    useEffect(() => {
        async function fetchTiposEps() {
          try {
            const response = await getAllTblAfiliacion();
            setTiposEps(response.data);
          } catch (error) {
            console.error("Error al obtener los tipos de identidad", error);
          }
        }
        fetchTiposEps();
      }, []);
      // Obtener los tipos de vivienda
    useEffect(() => {
        async function fetchTiposVivienda() {
            try {
                const response = await getAllTblTiposDeVivienda();
                setTiposVivienda(response.data);
            } catch (error) {
                console.error("Error al obtener los tipos de vivienda", error);
            }
        }
        fetchTiposVivienda();
    }, []);
    // Obtener los tipos de Cultivo
    useEffect(() => {
        async function fetchTiposCultivo() {
            try {
                const response = await getAllTblTiposCultivo();
                setTiposCultivo(response.data);
            } catch (error) {
                console.error("Error al obtener los tipos de cultivo", error);
            }
        }
        fetchTiposCultivo();
    }, []);
    // Efecto para cargar los niveles académicos
    useEffect(() => {
        async function fetchNivelesAcademicos() {
            try {
                const response = await getAllTblNivelAcademico();
                setNivelesAcademicos(response.data);
            } catch (error) {
                console.error("Error al obtener los niveles académicos", error);
            }
        }
        fetchNivelesAcademicos();
    }, []);
       // Efecto para cargar los tipos de regimen
       useEffect(() => {
        async function fetchTiposRegimen() {
            try {
                const response = await getAllTblRegimen();
                setTiposRegimen(response.data);
            } catch (error) {
                console.error("Error al obtener los tipos de Regimen", error);
            }
        }
        fetchTiposRegimen();
    }, []);
      // Efecto para cargar los tipos de basura
      useEffect(() => {
        async function fetchTiposBasura() {
            try {
                const response = await getAllTblDisBasuras();
                setTiposBasura(response.data);
            } catch (error) {
                console.error("Error al obtener los tipos de Basura", error);
            }
        }
        fetchTiposBasura();
    }, []);
    // Efecto para cargar los niveles académicos
    useEffect(() => {
        async function fetchSexo() {
            try {
                const response = await getAllTblSexo();
                setTipoSexo(response.data);
            } catch (error) {
                console.error("Error al obtener Sexo", error);
            }
        }
        fetchSexo();
    }, []);



    // Cargar los datos del comunero si hay un ID en los parámetros

    useEffect(() => {
        async function loadDatper() {
            if (params.id) {
                const {
                    data: { tip_iden_usu, identificacion_usuario, nombre_1, nombre_2, apellido_1, apellido_2, fec_nto, lugar_residencia, etnia,
                        resguardo, codigo_eapb, lugar_de_trabajo, nombre_padre, nombre_madre, id_tip_vivienda, tiene_parcela, id_tip_cultivos,
                        nivel_de_academico, estado_civil, regimen, sexo_al_nacer, habla_otra_lenjua, comunidad_de_origen, usa_medicina_tradicional,
                        cuenta_con_servicios_publico, id_disp_de_las_basuras }
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
                setValue('tiene_parcela', tiene_parcela ? "true" : "false")// Convertir a cadena de texto
                setValue('id_tip_cultivos', id_tip_cultivos)
                setValue('nivel_de_academico', nivel_de_academico)
                setValue('estado_civil', estado_civil)
                setValue('regimen', regimen)
                setValue('sexo_al_nacer', sexo_al_nacer)
                setValue('habla_otra_lenjua', habla_otra_lenjua ? "true" : "false")
                setValue('comunidad_de_origen', comunidad_de_origen)
                setValue('usa_medicina_tradicional', usa_medicina_tradicional ? "true" : "false")
                setValue('cuenta_con_servicios_publico', cuenta_con_servicios_publico ? "true" : "false")
                setValue('id_disp_de_las_basuras', id_disp_de_las_basuras)

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
        <div className="w-full max-automax-w-6xl mx-auto p-6 bg-black-100 rounded-lg shadow-lg">

            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">Tipo de Identidad</label>
                    <select
                        {...register("tip_iden_usu", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3">

                        <option value="">Seleccione un tipo</option>
                        {tiposIdentidad.map((tipo) => (
                            <option key={tipo.id_tipo_identidad} value={tipo.id_tipo_identidad}>
                                {tipo.des_tip_identidad}
                            </option>
                        ))}
                    </select>
                    {errors.tip_iden_usu && <span>Este valor es requerido</span>}

                </div>

                <div> <label className="">Identidad de comunero</label>
                    <input
                        type="text"
                        {...register("identificacion_usuario", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    />
                    {errors.identificacion_usuario && <span>Este valor es requerido</span>}
                </div>

                <div> <label className="">Primer Nombre</label>
                    <input
                        type="text"
                        {...register("nombre_1", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    />
                    {errors.nombre_1 && <span>Este valor es requerido</span>}

                </div>

                <div> <label className="">Segundo Nombre</label>
                    <input
                        type="text"
                        {...register("nombre_2", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    />
                    {errors.nombre_2 && <span>Este valor es requerido</span>}
                </div>

                <div> <label className="">Primer Apellido</label>
                    <input
                        type="text"
                        {...register("apellido_1", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    />
                    {errors.apellido_1 && <span>Este valor es requerido</span>}
                </div>

                <div> <label className="">Segundo Apellido</label>
                    <input
                        type="text"
                        {...register("apellido_2", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    />
                    {errors.apellido_1 && <span>Este valor es requerido</span>}
                </div>

                <div> <label className="">Fecha Nacimiento</label>
                    <input
                        type="date"
                        {...register("fec_nto", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    />
                    {errors.fec_nto && <span>Este valor es requerido</span>}
                </div>

                <div> <label htmlFor="">Direccion Residencia</label>
                    <input
                        type="text"
                        {...register("lugar_residencia", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    />
                    {errors.lugar_residencia && <span>Este valor es requerido</span>}
                </div>

                <div> <label htmlFor="">Etnia</label>
                    <input
                        type="text"
                        {...register("etnia", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    />
                    {errors.etnia && <span>Este valor es requerido</span>}
                </div>

                <div> <label htmlFor="">Resguardo</label>
                    <input
                        type="text"
                        {...register("resguardo", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    />
                    {errors.resguardo && <span>Este valor es requerido</span>}
                </div>

                <div> <label htmlFor="">Lugar de Trabajo</label>
                    <input
                        type="text"
                        {...register("lugar_de_trabajo", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    />
                    {errors.resguardo && <span>Este valor es requerido</span>}
                </div>

                <div> <label htmlFor="">Nombre del Padre</label>
                    <input
                        type="text"
                        {...register("nombre_padre", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    />
                    {errors.nombre_padre && <span>Este valor es requerido</span>}
                </div>

                <div> <label htmlFor="">Nombre de la Madre</label>
                    <input
                        type="text"
                        {...register("nombre_madre", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    />
                    {errors.nombre_madre && <span>Este valor es requerido</span>}
                </div>

                <div> <label htmlFor="">Estado Civil</label>
                    <input
                        type="text"
                        {...register("estado_civil", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    />
                    {errors.estado_civil && <span>Este valor es requerido</span>}
                </div>
                <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">Sexo</label>
                    <select
                        {...register("sexo_al_nacer", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block w-full mb-3">

                        <option value="">Seleccione sexo</option>
                        {TipoSexo.map((sex) => (
                            <option key={sex.codigo} value={sex.codigo}>
                                {sex.descripcion}
                            </option>
                        ))}
                    </select>
                    {errors.nivel_de_academico && <span>Este valor es requerido</span>}
                </div>

                <div> <label htmlFor="">Comunidad de Origen</label>
                    <input
                        type="text"
                        {...register("comunidad_de_origen", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    />
                    {errors.comunidad_de_origen && <span>Este valor es requerido</span>}
                </div>

                <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">Tipo de EPS</label>
                    <select
                        {...register("codigo_eapb", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    >
                        <option value="">Seleccione EPS</option>
                        {tiposEps.map((tipo) => (
                            <option key={tipo.id_eapb} value={tipo.id_eapb}>
                                {tipo.nombre_eapbAfiliacion}
                            </option>
                        ))}
                    </select>
                </div>
                {errors.codigo_eapb && <span>Este valor es requerido</span>}


                {/* --- Campo para el Tipo de Vivienda --- */}

                <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">Tipo de Vivienda</label>
                    <select
                        {...register("id_tip_vivienda", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block w-full mb-3">

                        <option value="">Seleccione un tipo de vivienda</option>
                        {tiposVivienda.map((vivienda) => (
                            <option key={vivienda.id_tip_vivienda} value={vivienda.id_tip_vivienda}>
                                {vivienda.tipo_vivienda}
                            </option>
                        ))}
                    </select>
                </div>

                {errors.id_tip_vivienda && <span>Este valor es requerido</span>}



                <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">Tipo de Cultivo</label>
                    <select
                        {...register("id_tip_cultivos", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    >
                        <option value="">Seleccione un tipo de cultivo</option>
                        {TiposCultivo.map((tipo) => (
                            <option key={tipo.id_tip_cultivo} value={tipo.id_tip_cultivo}>
                                {tipo.des_cultivos}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">Nivel Academico</label>
                    <select
                        {...register("nivel_de_academico", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block w-full mb-3">

                        <option value="">Seleccione un nivel académico</option>
                        {nivelesAcademicos.map((nivel) => (
                            <option key={nivel.id_nivel_acad} value={nivel.id_nivel_acad}>
                                {nivel.des_nivel_academico}
                            </option>
                        ))}
                    </select>
                    {errors.nivel_de_academico && <span>Este valor es requerido</span>}
                </div>

                <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">Tipo de Regimen</label>
                    <select
                        {...register("regimen", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    >
                        <option value="">Seleccione un tipo regimen</option>
                        {TiposRegimen.map((tipo) => (
                            <option key={tipo.id_regimen} value={tipo.id_regimen}>
                                {tipo.des_regimen}
                            </option>
                        ))}
                    </select>
                </div>
                {errors.regimen && <span>Este valor es requerido</span>}

                <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">Tipo de Basuras</label>
                    <select
                        {...register("id_disp_de_las_basuras", { required: true })}
                        className="bg-zinc-700 p-3 rounded-lg block e-full mb-3"
                    >
                        <option value="">Seleccione un tipo basura</option>
                        {TiposBasura.map((tipo) => (
                            <option key={tipo.id_dis_basuras} value={tipo.id_dis_basuras}>
                                {tipo.des_disp_basura}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium">¿Habla otra lengua?</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="true"
                                {...register("habla_otra_lenjua", { required: true })}
                                className="bg-zinc-700 p-3 rounded-lg"
                            />
                            <span>Sí</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="false"
                                {...register("habla_otra_lenjua", { required: true })}
                                className="bg-zinc-700 p-3 rounded-lg"
                            />
                            <span>No</span>
                        </label>
                    </div>
                </div>
                {errors.habla_otra_lenjua && <span>Este valor es requerido</span>}


                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium">¿Usa medicina tradicional?</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="true"
                                {...register("usa_medicina_tradicional", { required: true })}
                                className="bg-zinc-700 p-3 rounded-lg"
                            />
                            <span>Sí</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="false"
                                {...register("usa_medicina_tradicional", { required: true })}
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
                                value="true"
                                {...register("cuenta_con_servicios_publico", { required: true })}
                                className="bg-zinc-700 p-3 rounded-lg"
                            />
                            <span>Sí</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="false"
                                {...register("cuenta_con_servicios_publico", { required: true })}
                                className="bg-zinc-700 p-3 rounded-lg"
                            />
                            <span>No</span>
                        </label>
                    </div>
                </div>
                {errors.cuenta_con_servicios_publico && <span>Este valor es requerido</span>}

                {/* Campos tipo checkbox */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium">¿Tiene parcela?</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="true"
                                {...register("tiene_parcela", { required: true })}
                                className="bg-zinc-700 p-3 rounded-lg"
                            />
                            <span>Sí</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="false"
                                {...register("tiene_parcela", { required: true })}
                                className="bg-zinc-700 p-3 rounded-lg"
                            />
                            <span>No</span>
                        </label>
                    </div>
                </div>
                {errors.id_disp_de_las_basuras && <span>Este valor es requerido</span>}
                <div className="flex justify-center">
                <button className="bg-blue-300 hover:bg-blue-400 text-black font-semibold py-4 px-10 rounded-lg mt-3">
                    Actualizar
                </button>
            </div>
            {params.id && (
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 p-3 rounded-lg  w-48 mt-3"
                        onClick={async () => {
                            const accepted = window.confirm('esta seguo de borrar el registro?');
                            if (accepted) {
                                await deleteTblDatPer(params.id);
                                toast.success('comunero eliminado', {
                                    position: "bottom-right",
                                    style: {
                                        background: "#101010",
                                        color: "#ffff",
                                    }
                                })

                                navigate('/dashboard/Datper');
                            }
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
            </form> 
        </div>
    );
}    
