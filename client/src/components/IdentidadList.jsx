import {useEffect, useState} from  'react';
import {getAllTblTipIdentidad} from '../api/Identidad.api';
import {IdentidadCard} from './IdentidadCard';



export function IdentidadList(){
    const [identidad, setIdentidad] = useState([]);
    

    useEffect(()=> {
        async function loadIdentidad(){
            const res = await getAllTblTipIdentidad();
            setIdentidad(res.data);
        }
        loadIdentidad();
    },[]);
    return (
    <div className="grid grid-cols-4 gap-3">
        {identidad.map((TblTipIdentidad) => (
            <IdentidadCard key={TblTipIdentidad.id_tip_identidad} TblTipIdentidad={TblTipIdentidad} />

        ))}
    </div>    
    );
}
