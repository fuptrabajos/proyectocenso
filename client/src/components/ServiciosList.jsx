import {useEffect, useState} from  'react';
import {getAllTblTiposServiPubli} from '../api/Servicios.api';
import {ServiciosCard} from './ServiciosCard';



export function ServiciosList(){
    const [servicios, setServicios] = useState([]);
    

    useEffect(()=> {
        async function loadServicios(){
            const res = await getAllTblTiposServiPubli();
            setServicios(res.data);
        }
        loadServicios();
    },[]);
    return (
    <div className="grid grid-cols-4 gap-3">
        {servicios.map((TblTiposServiPubli) => (
            <ServiciosCard key={TblTiposServiPubli.id_tip_ser_publi} TblTiposServiPubli={TblTiposServiPubli} />

        ))}
    </div>    
    );
}
