import {useForm} from "react-hook-form";
import { useEffect,useState } from "react";
import {createTblDatPer, deleteTblDatPer, updateTblDatPer , getTblDatPer} from'../api/Datper.api';
import {useNavigate, useParams} from'react-router-dom';
import {toast} from'react-hot-toast';
import { getAllTblTipIdentidad } from '../api/Identidad.api'; 
import { getAllTblAfiliacion } from '../api/Afiliacion.api';   
import { getAllTblTiposDeVivienda } from '../api/Vivienda.api'; 
import { getAllTblTiposCultivo } from '../api/Cultivo.Api';
import { getAllTblNivelAcademico } from '../api/Academico.api'; 
import { getAllTblRegimen } from '../api/Regimen.api'; 
import {getAllTblDisBasuras} from '../api/Basura.api';
import {getAllTblSexo} from '../api/Sexo.api';

export function DatperFormPage() {
    const{register, handleSubmit, formState: {errors}, setValue} = useForm();
    const navigate = useNavigate();
    const params = useParams(); 
    const [tiposIdentidad, setTiposIdentidad] = useState([]);
    const [tiposEps, setTiposEps] = useState([]);
    const [tiposVivienda, setTiposVivienda] = useState([]);
    const [TiposCultivo, setTiposCultivo] = useState([]);
    const [nivelesAcademicos, setNivelesAcademicos] = useState([]); 
    const [TiposRegimen, setTiposRegimen] = useState([]); 
    const [TiposBasura, setTiposBasura] = useState([]); 
    const [TipoSexo, setTipoSexo] = useState([]); 
    
    console.log(params);
    
    const onSubmit = handleSubmit(async data => {
        console.log(data);

        try {
            if(params.id) {
                await updateTblDatPer(params.id, data);
                toast.success('Comunero actualizado con éxito', {
                    position: "bottom-right",
                    style: {
                        background: "#047857", // Verde oscuro
                        color: "#fff",
                    }
                });
            } else {
                await createTblDatPer(data);
                toast.success('Comunero creado con éxito', {
                    position: "bottom-right",
                    style: {
                        background: "#047857", // Verde oscuro
                        color: "#fff",
                    }
                });
            }
            navigate("/dashboard/Datper");
        } catch (error) {
            toast.error('Error al guardar los datos', {
                position: "bottom-right",
                style: {
                    background: "#DC2626", // Rojo
                    color: "#fff",
                }
            });
        }
    });
// useEffects para cargar datos
    useEffect(() => {
        async function fetchTiposIdentidad() {
          try {
            const response = await getAllTblTipIdentidad();
            setTiposIdentidad(response.data);
          } catch (error) {
            console.error("Error al obtener los tipos de identidad", error);
            toast.error('Error al cargar tipos de identidad', {
                position: "bottom-right",
                style: {
                    background: "#DC2626",
                    color: "#fff",
                }
            });
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
            console.error("Error al obtener los tipos de EPS", error);
            toast.error('Error al cargar tipos de EPS', {
                position: "bottom-right",
                style: {
                    background: "#DC2626",
                    color: "#fff",
                }
            });
          }
        }
        fetchTiposEps();
    }, []);

    useEffect(() => {
        async function fetchTiposVivienda() {
            try {
                const response = await getAllTblTiposDeVivienda();
                setTiposVivienda(response.data);
            } catch (error) {
                console.error("Error al obtener los tipos de vivienda", error);
                toast.error('Error al cargar tipos de vivienda', {
                    position: "bottom-right",
                    style: {
                        background: "#DC2626",
                        color: "#fff",
                    }
                });
            }
        }
        fetchTiposVivienda();
    }, []);

    useEffect(() => {
        async function fetchTiposCultivo() {
            try {
                const response = await getAllTblTiposCultivo();
                setTiposCultivo(response.data);
            } catch (error) {
                console.error("Error al obtener los tipos de cultivo", error);
                toast.error('Error al cargar tipos de cultivo', {
                    position: "bottom-right",
                    style: {
                        background: "#DC2626",
                        color: "#fff",
                    }
                });
            }
        }
        fetchTiposCultivo();
    }, []);

    useEffect(() => {
        async function fetchNivelesAcademicos() {
            try {
                const response = await getAllTblNivelAcademico();
                setNivelesAcademicos(response.data);
            } catch (error) {
                console.error("Error al obtener los niveles académicos", error);
                toast.error('Error al cargar niveles académicos', {
                    position: "bottom-right",
                    style: {
                        background: "#DC2626",
                        color: "#fff",
                    }
                });
            }
        }
        fetchNivelesAcademicos();
    }, []);

    useEffect(() => {
        async function fetchTiposRegimen() {
            try {
                const response = await getAllTblRegimen();
                setTiposRegimen(response.data);
            } catch (error) {
                console.error("Error al obtener los tipos de Regimen", error);
                toast.error('Error al cargar tipos de régimen', {
                    position: "bottom-right",
                    style: {
                        background: "#DC2626",
                        color: "#fff",
                    }
                });
            }
        }
        fetchTiposRegimen();
    }, []);

    useEffect(() => {
        async function fetchTiposBasura() {
            try {
                const response = await getAllTblDisBasuras();
                setTiposBasura(response.data);
            } catch (error) {
                console.error("Error al obtener los tipos de Basura", error);
                toast.error('Error al cargar tipos de basura', {
                    position: "bottom-right",
                    style: {
                        background: "#DC2626",
                        color: "#fff",
                    }
                });
            }
        }
        fetchTiposBasura();
    }, []);

    useEffect(() => {
        async function fetchSexo() {
            try {
                const response = await getAllTblSexo();
                setTipoSexo(response.data);
            } catch (error) {
                console.error("Error al obtener Sexo", error);
                toast.error('Error al cargar tipos de sexo', {
                    position: "bottom-right",
                    style: {
                        background: "#DC2626",
                        color: "#fff",
                    }
                });
            }
        }
        fetchSexo();
    }, []);
// Cargar los datos del comunero si hay un ID en los parámetros
    useEffect(() => {
        async function loadDatper() {
            if (params.id) {
                try {
                    const {
                        data: { tip_iden_usu, identificacion_usuario, nombre_1, nombre_2, apellido_1, apellido_2, fec_nto, edad, lugar_residencia,codigo_vereda, numero_familia,etnia,
                            resguardo, codigo_eapb, id_tip_vivienda, tiene_parcela, id_tip_cultivos,
                            nivel_de_academico, estado_civil, regimen, sexo_al_nacer, habla_otra_lenjua, comunidad_de_origen, usa_medicina_tradicional,
                            cuenta_con_servicios_publico, id_disp_de_las_basuras, esta_vivo}
                    } = await getTblDatPer(params.id);
                    
                    setValue('tip_iden_usu', tip_iden_usu);
                    setValue('identificacion_usuario', identificacion_usuario);
                    setValue('nombre_1', nombre_1);
                    setValue('nombre_2', nombre_2);
                    setValue('apellido_1', apellido_1);
                    setValue('apellido_2', apellido_2);
                    setValue('fec_nto', fec_nto);
                    setValue('edad', edad);
                    setValue('lugar_residencia', lugar_residencia);
                    setValue('codigo_vereda', codigo_vereda);
                    setValue('numero_familia', numero_familia);
                    setValue('etnia', etnia);
                    setValue('resguardo', resguardo);
                    setValue('codigo_eapb', codigo_eapb);
                    setValue('id_tip_vivienda', id_tip_vivienda);
                    setValue('tiene_parcela', tiene_parcela ? "true" : "false");
                    setValue('id_tip_cultivos', id_tip_cultivos);
                    setValue('nivel_de_academico', nivel_de_academico);
                    setValue('estado_civil', estado_civil);
                    setValue('regimen', regimen);
                    setValue('sexo_al_nacer', sexo_al_nacer);
                    setValue('habla_otra_lenjua', habla_otra_lenjua ? "true" : "false");
                    setValue('comunidad_de_origen', comunidad_de_origen);
                    setValue('usa_medicina_tradicional', usa_medicina_tradicional ? "true" : "false");
                    setValue('cuenta_con_servicios_publico', cuenta_con_servicios_publico ? "true" : "false");
                    setValue('id_disp_de_las_basuras', id_disp_de_las_basuras);
                    setValue('esta_vivo', esta_vivo ? "true" : "false");

                    toast.success('Datos cargados correctamente', {
                        position: "bottom-right",
                        style: {
                            background: "#047857",
                            color: "#fff",
                        }
                    });
                } catch (error) {
                    toast.error('Error al cargar los datos', {
                        position: "bottom-right",
                        style: {
                            background: "#DC2626",
                            color: "#fff",
                        }
                    });
                }
            }
        }
        loadDatper();
    }, [params.id, setValue]);
    const veredas = {
  "20 DE JULIO": 1,
  "ALTO ANAMBIO": 2,
  "AMBIRO": 3,
  "CAMPAMENTO": 4,
  "CHAPIO": 5,
  "CUARE": 6,
  "HATO VIEJO": 7,
  "HISPALA": 8,
  "PATIA": 9,
  "PATICO": 10,
  "PULULO": 11,
  "PURACE": 12,
  "TABIO": 13,
};

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {params.id ? 'Editar Comunero' : 'Registrar Nuevo Comunero'}
            </h1>
            
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                
                {/* Tipo de Identidad */}
                <div>
                    <label htmlFor="tip_iden_usu" className="block text-gray-700 font-medium mb-1">Tipo de Identidad</label>
                    <select
                        id="tip_iden_usu"
                        {...register("tip_iden_usu", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="">Seleccione un tipo</option>
                        {tiposIdentidad.map((tipo) => (
                            <option key={tipo.id_tipo_identidad} value={tipo.id_tipo_identidad}>
                                {tipo.des_tip_identidad}
                            </option>
                        ))}
                    </select>
                    {errors.tip_iden_usu && (
                        <p className="text-red-500 text-sm mt-1">{errors.tip_iden_usu.message}</p>
                    )}
                </div>

                {/* Identificación */}
                <div>
                    <label htmlFor="identificacion_usuario" className="block text-gray-700 font-medium mb-1">Identificación de Comunero</label>
                    <input
                        type="text"
                        id="identificacion_usuario"
                        placeholder="Ingrese la identificación"
                        {...register("identificacion_usuario", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.identificacion_usuario && (
                        <p className="text-red-500 text-sm mt-1">{errors.identificacion_usuario.message}</p>
                    )}
                </div>

                {/* Primer Nombre */}
                <div>
                    <label htmlFor="nombre_1" className="block text-gray-700 font-medium mb-1">Primer Nombre</label>
                    <input
                        type="text"
                        id="nombre_1"
                        placeholder="Ingrese el primer nombre"
                        {...register("nombre_1", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.nombre_1 && (
                        <p className="text-red-500 text-sm mt-1">{errors.nombre_1.message}</p>
                    )}
                </div>

                {/* Segundo Nombre */}
                <div>
                    <label htmlFor="nombre_2" className="block text-gray-700 font-medium mb-1">Segundo Nombre</label>
                    <input
                        type="text"
                        id="nombre_2"
                        placeholder="Ingrese el segundo nombre"
                        {...register("nombre_2", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.nombre_2 && (
                        <p className="text-red-500 text-sm mt-1">{errors.nombre_2.message}</p>
                    )}
                </div>
{/* Primer Apellido */}
                <div>
                    <label htmlFor="apellido_1" className="block text-gray-700 font-medium mb-1">Primer Apellido</label>
                    <input
                        type="text"
                        id="apellido_1"
                        placeholder="Ingrese el primer apellido"
                        {...register("apellido_1", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.apellido_1 && (
                        <p className="text-red-500 text-sm mt-1">{errors.apellido_1.message}</p>
                    )}
                </div>

                {/* Segundo Apellido */}
                <div>
                    <label htmlFor="apellido_2" className="block text-gray-700 font-medium mb-1">Segundo Apellido</label>
                    <input
                        type="text"
                        id="apellido_2"
                        placeholder="Ingrese el segundo apellido"
                        {...register("apellido_2", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.apellido_2 && (
                        <p className="text-red-500 text-sm mt-1">{errors.apellido_2.message}</p>
                    )}
                </div>

                {/* Fecha de Nacimiento */}
                <div>
                    <label htmlFor="fec_nto" className="block text-gray-700 font-medium mb-1">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        id="fec_nto"
                        {...register("fec_nto", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.fec_nto && (
                        <p className="text-red-500 text-sm mt-1">{errors.fec_nto.message}</p>
                    )}
                </div>

                {/* Edad */}
                <div>
                    <label htmlFor="edad" className="block text-gray-700 font-medium mb-1">Edad</label>
                    <input
                        type="number"
                        id="edad"
                        placeholder="Ingrese la edad"
                        {...register("edad")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.edad && (
                        <p className="text-red-500 text-sm mt-1">{errors.edad.message}</p>
                    )}
                </div>

                {/* Lugar de Residencia */}
<div>
  <label htmlFor="lugar_residencia" className="block text-gray-700 font-medium mb-1">
    Lugar de Residencia (Vereda)
  </label>
  <select
    id="lugar_residencia"
    {...register("lugar_residencia", { required: "Este campo es requerido" })}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
    onChange={(e) => {
      const selected = e.target.value;
      setValue("lugar_residencia", selected);
      setValue("codigo_vereda", veredas[selected]); // 👈 Se asigna automático
    }}
  >
    <option value="">Seleccione una vereda</option>
    {Object.keys(veredas).map((nombre) => (
      <option key={veredas[nombre]} value={nombre}>
        {nombre}
      </option>
    ))}
  </select>
  {errors.lugar_residencia && (
    <p className="text-red-500 text-sm mt-1">{errors.lugar_residencia.message}</p>
  )}
</div>

{/* Código de Vereda (solo lectura, se llena automático) */}
<div>
  <label htmlFor="codigo_vereda" className="block text-gray-700 font-medium mb-1">
    Código de la Vereda
  </label>
  <input
    type="text"
    id="codigo_vereda"
    {...register("codigo_vereda", { required: "Este campo es requerido" })}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-100 cursor-not-allowed"
    readOnly
  />
  {errors.codigo_vereda && (
    <p className="text-red-500 text-sm mt-1">{errors.codigo_vereda.message}</p>
  )}
</div>

{/* Número de Familia */}
<div>
  <label htmlFor="numero_familia" className="block text-gray-700 font-medium mb-1">
    Número de Familia
  </label>
  <input
    type="text"
    id="numero_familia"
    placeholder="Ingrese el número de familia"
    {...register("numero_familia", { required: "Este campo es requerido" })}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
  />
  {errors.numero_familia && (
    <p className="text-red-500 text-sm mt-1">{errors.numero_familia.message}</p>
  )}
</div>


                
                

                {/* Etnia */}
                <div>
                    <label htmlFor="etnia" className="block text-gray-700 font-medium mb-1">Etnia</label>
                    <input
                        type="text"
                        id="etnia"
                        placeholder="Ingrese la etnia"
                        {...register("etnia", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.etnia && (
                        <p className="text-red-500 text-sm mt-1">{errors.etnia.message}</p>
                    )}
                </div>

                {/* Resguardo */}
                <div>
                    <label htmlFor="resguardo" className="block text-gray-700 font-medium mb-1">Resguardo</label>
                    <input
                        type="text"
                        id="resguardo"
                        placeholder="Ingrese el resguardo"
                        {...register("resguardo", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.resguardo && (
                        <p className="text-red-500 text-sm mt-1">{errors.resguardo.message}</p>
                    )}
                </div>

                

                {/* Estado Civil */}
                <div>
                    <label htmlFor="estado_civil" className="block text-gray-700 font-medium mb-1">Estado Civil</label>
                    <input
                        type="text"
                        id="estado_civil"
                        placeholder="Ingrese el estado civil"
                        {...register("estado_civil", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.estado_civil && (
                        <p className="text-red-500 text-sm mt-1">{errors.estado_civil.message}</p>
                    )}
                </div>

                {/* Sexo */}
                <div>
                    <label htmlFor="sexo_al_nacer" className="block text-gray-700 font-medium mb-1">Sexo</label>
                    <select
                        id="sexo_al_nacer"
                        {...register("sexo_al_nacer", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="">Seleccione sexo</option>
                        {TipoSexo.map((sex) => (
                            <option key={sex.codigo} value={sex.codigo}>
                                {sex.descripcion}
                            </option>
                        ))}
                    </select>
                    {errors.sexo_al_nacer && (
                        <p className="text-red-500 text-sm mt-1">{errors.sexo_al_nacer.message}</p>
                    )}
                </div>

                {/* Comunidad de Origen */}
                <div>
                    <label htmlFor="comunidad_de_origen" className="block text-gray-700 font-medium mb-1">Comunidad de Origen</label>
                    <input
                        type="text"
                        id="comunidad_de_origen"
                        placeholder="Ingrese la comunidad de origen"
                        {...register("comunidad_de_origen", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.comunidad_de_origen && (
                        <p className="text-red-500 text-sm mt-1">{errors.comunidad_de_origen.message}</p>
                    )}
                </div>
{/* Tipo de EPS */}
                <div>
                    <label htmlFor="codigo_eapb" className="block text-gray-700 font-medium mb-1">Tipo de EPS</label>
                    <select
                        id="codigo_eapb"
                        {...register("codigo_eapb", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="">Seleccione EPS</option>
                        {tiposEps.map((tipo) => (
                            <option key={tipo.id_eapb} value={tipo.id_eapb}>
                                {tipo.nombre_eapbAfiliacion}
                            </option>
                        ))}
                    </select>
                    {errors.codigo_eapb && (
                        <p className="text-red-500 text-sm mt-1">{errors.codigo_eapb.message}</p>
                    )}
                </div>

                {/* Tipo de Vivienda */}
                <div>
                    <label htmlFor="id_tip_vivienda" className="block text-gray-700 font-medium mb-1">Tipo de Vivienda</label>
                    <select
                        id="id_tip_vivienda"
                        {...register("id_tip_vivienda", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="">Seleccione un tipo de vivienda</option>
                        {tiposVivienda.map((vivienda) => (
                            <option key={vivienda.id_tip_vivienda} value={vivienda.id_tip_vivienda}>
                                {vivienda.tipo_vivienda}
                            </option>
                        ))}
                    </select>
                    {errors.id_tip_vivienda && (
                        <p className="text-red-500 text-sm mt-1">{errors.id_tip_vivienda.message}</p>
                    )}
                </div>

                {/* Tipo de Cultivo */}
                <div>
                    <label htmlFor="id_tip_cultivos" className="block text-gray-700 font-medium mb-1">Tipo de Cultivo</label>
                    <select
                        id="id_tip_cultivos"
                        {...register("id_tip_cultivos", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="">Seleccione un tipo de cultivo</option>
                        {TiposCultivo.map((tipo) => (
                            <option key={tipo.id_tip_cultivo} value={tipo.id_tip_cultivo}>
                                {tipo.des_cultivos}
                            </option>
                        ))}
                    </select>
                    {errors.id_tip_cultivos && (
                        <p className="text-red-500 text-sm mt-1">{errors.id_tip_cultivos.message}</p>
                    )}
                </div>

                {/* Nivel Académico */}
                <div>
                    <label htmlFor="nivel_de_academico" className="block text-gray-700 font-medium mb-1">Nivel Académico</label>
                    <select
                        id="nivel_de_academico"
                        {...register("nivel_de_academico", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="">Seleccione un nivel académico</option>
                        {nivelesAcademicos.map((nivel) => (
                            <option key={nivel.id_nivel_acad} value={nivel.id_nivel_acad}>
                                {nivel.des_nivel_academico}
                            </option>
                        ))}
                    </select>
                    {errors.nivel_de_academico && (
                        <p className="text-red-500 text-sm mt-1">{errors.nivel_de_academico.message}</p>
                    )}
                </div>

                {/* Tipo de Régimen */}
                <div>
                    <label htmlFor="regimen" className="block text-gray-700 font-medium mb-1">Tipo de Régimen</label>
                    <select
                        id="regimen"
                        {...register("regimen", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="">Seleccione un tipo de régimen</option>
                        {TiposRegimen.map((tipo) => (
                            <option key={tipo.id_regimen} value={tipo.id_regimen}>
                                {tipo.des_regimen}
                            </option>
                        ))}
                    </select>
                    {errors.regimen && (
                        <p className="text-red-500 text-sm mt-1">{errors.regimen.message}</p>
                    )}
                </div>

                {/* Tipo de Basuras */}
                <div>
                    <label htmlFor="id_disp_de_las_basuras" className="block text-gray-700 font-medium mb-1">Disposición de Basuras</label>
                    <select
                        id="id_disp_de_las_basuras"
                        {...register("id_disp_de_las_basuras", { required: "Este campo es requerido" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="">Seleccione disposición de basuras</option>
                        {TiposBasura.map((tipo) => (
                            <option key={tipo.id_dis_basuras} value={tipo.id_dis_basuras}>
                                {tipo.des_disp_basura}
                            </option>
                        ))}
                    </select>
                    {errors.id_disp_de_las_basuras && (
                        <p className="text-red-500 text-sm mt-1">{errors.id_disp_de_las_basuras.message}</p>
                    )}
                </div>

                {/* ¿Habla otra lengua? */}
                <div className="col-span-full md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">¿Habla otra lengua?</label>
                    <div className="flex space-x-6">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="true"
                                {...register("habla_otra_lenjua", { required: "Este campo es requerido" })}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            />
                            <span className="text-gray-700">Sí</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="false"
                                {...register("habla_otra_lenjua", { required: "Este campo es requerido" })}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            />
                            <span className="text-gray-700">No</span>
                        </label>
                    </div>
                    {errors.habla_otra_lenjua && (
                        <p className="text-red-500 text-sm mt-1">{errors.habla_otra_lenjua.message}</p>
                    )}
                </div>

                {/* ¿Usa medicina tradicional? */}
                <div className="col-span-full md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">¿Usa medicina tradicional?</label>
                    <div className="flex space-x-6">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="true"
                                {...register("usa_medicina_tradicional", { required: "Este campo es requerido" })}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            />
                            <span className="text-gray-700">Sí</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="false"
                                {...register("usa_medicina_tradicional", { required: "Este campo es requerido" })}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            />
                            <span className="text-gray-700">No</span>
                        </label>
                    </div>
                    {errors.usa_medicina_tradicional && (
                        <p className="text-red-500 text-sm mt-1">{errors.usa_medicina_tradicional.message}</p>
                    )}
                </div>

                {/* ¿Cuenta con servicios públicos? */}
                <div className="col-span-full md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">¿Cuenta con servicios públicos?</label>
                    <div className="flex space-x-6">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="true"
                                {...register("cuenta_con_servicios_publico", { required: "Este campo es requerido" })}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            />
                            <span className="text-gray-700">Sí</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="false"
                                {...register("cuenta_con_servicios_publico", { required: "Este campo es requerido" })}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            />
                            <span className="text-gray-700">No</span>
                        </label>
                    </div>
                    {errors.cuenta_con_servicios_publico && (
                        <p className="text-red-500 text-sm mt-1">{errors.cuenta_con_servicios_publico.message}</p>
                    )}
                </div>

                {/* ¿Tiene parcela? */}
                <div className="col-span-full md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">¿Tiene parcela?</label>
                    <div className="flex space-x-6">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="true"
                                {...register("tiene_parcela", { required: "Este campo es requerido" })}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            />
                            <span className="text-gray-700">Sí</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                value="false"
                                {...register("tiene_parcela", { required: "Este campo es requerido" })}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            />
                            <span className="text-gray-700">No</span>
                        </label>
                    </div>
                    {errors.tiene_parcela && (
                        <p className="text-red-500 text-sm mt-1">{errors.tiene_parcela.message}</p>
                    )}
                </div>
                {/* ¿Estado de la persona? */}
                <div className="col-span-full md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Estado de la persona</label>
                <div className="flex space-x-6">
                    {/* Opción Vivo */}
                    <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        value="true"
                        {...register("esta_vivo", { required: "Este campo es requerido" })}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="text-gray-700">Vivo</span>
                    </label>

                    {/* Opción Fallecido */}
                    <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        value="false"
                        {...register("esta_vivo", { required: "Este campo es requerido" })}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                        onChange={(e) => {
                        const palabra = window.prompt(
                            "⚠️ Está a punto de marcar a la persona como 'Fallecida'.\n\nEscriba la palabra CONFIRMAR para continuar:"
                        );

                        if (palabra !== "CONFIRMAR") {
                            alert("❌ Cambio cancelado. Debe escribir exactamente CONFIRMAR.");
                            e.preventDefault();

                            // 🔄 Revertimos la selección y dejamos "Vivo"
                            e.target.checked = false;
                            const vivoRadio = document.querySelector('input[name="esta_vivo"][value="true"]');
                            if (vivoRadio) vivoRadio.checked = true;
                        }
                        }}
                    />
                    <span className="text-gray-700">Fallecido</span>
                    </label>
                </div>

                {errors.esta_vivo && (
                    <p className="text-red-500 text-sm mt-1">{errors.esta_vivo.message}</p>
                )}
                </div>




                {/* Botón de Guardar/Actualizar */}
                <div className="col-span-full pt-6">
                    <button 
                        type="submit" 
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center font-medium"
                    >
                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {params.id ? 'Actualizar Comunero' : 'Guardar Comunero'}
                    </button>
                </div>
            </form>

            {/* Botón de Eliminar (solo si existe ID) */}
            {params.id && (
                <div className="mt-6">
                    <button
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center font-medium"
                        onClick={async () => {
                            const accepted = window.confirm('¿Está seguro de eliminar este registro?');
                            if (accepted) {
                                try {
                                    await deleteTblDatPer(params.id);
                                    toast.success('Comunero eliminado correctamente', {
                                        position: "bottom-right",
                                        style: {
                                            background: "#047857",
                                            color: "#fff",
                                        }
                                    });
                                    navigate('/dashboard/Datper');
                                } catch (error) {
                                    toast.error('Error al eliminar', {
                                        position: "bottom-right",
                                        style: {
                                            background: "#DC2626",
                                            color: "#fff",
                                        }
                                    });
                                }
                            }
                        }}
                    >
                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v10M9 7h1m-1 4h1m4-4h-1m-1 4h1" />
                        </svg>
                        Eliminar Comunero
                    </button>
                </div>
            )}

            {/* Botón de Volver */}
            <div className="mt-4">
                <button
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center font-medium"
                    onClick={() => navigate('/dashboard/Datper')}
                >
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver al Listado
                </button>
            </div>
        </div>
    );
}