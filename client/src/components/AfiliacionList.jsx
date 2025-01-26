import {useEffect, useState} from  'react';
import {getAllTblAfiliacion} from '../api/Afiliacion.api';
import {AfiliacionCard} from './AfiliacionCard';



export function AfiliacionList(){
    const [afiliacion, setAfiliacion] = useState([]);
    

    useEffect(()=> {
        async function loadAfiliacion(){
            const res = await getAllTblAfiliacion();
            setAfiliacion(res.data);
        }
        loadAfiliacion();
    },[]);
    return (
    <div className="grid grid-cols-4 gap-3">
        {afiliacion.map((TblAfiliacion) => (
            <AfiliacionCard key={TblAfiliacion.id_eapb} TblAfiliacion={TblAfiliacion} />

        ))}
    </div>    
    );
}

