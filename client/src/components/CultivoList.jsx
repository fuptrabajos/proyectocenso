import {useEffect, useState} from  'react';
import {getAllTblTiposCultivo} from '../api/Cultivo.api';
import {CultivoCard} from './CultivoCard';



export function CultivoList(){
    const [cultivo, setCultivo] = useState([]);
    

    useEffect(()=> {
        async function loadCultivo(){
            const res = await getAllTblTiposCultivo();
            setCultivo(res.data);
        }
        loadCultivo();
    },[]);
    return (
    <div className="grid grid-cols-4 gap-3">
        {cultivo.map((TblTiposCultivo) => (
            <CultivoCard key={TblTiposCultivo.id_tip_cultivo} TblTiposCultivo={TblTiposCultivo} />

        ))}
    </div>    
    );
}

