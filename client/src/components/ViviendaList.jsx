import {useEffect, useState} from  'react';
import {getAllTblTiposDeVivienda} from '../api/Vivienda.api';
import {ViviendaCard} from './ViviendaCard';



export function ViviendaList(){
    const [vivienda, setVivienda] = useState([]);
    

    useEffect(()=> {
        async function loadVivienda(){
            const res = await getAllTblTiposDeVivienda();
            setVivienda(res.data);
        }
        loadVivienda();
    },[]);
    return (
    <div className="grid grid-cols-4 gap-3">
        {vivienda.map((TblTiposDeVivienda) => (
            <ViviendaCard key={TblTiposDeVivienda.id_nivel_acad} TblTiposDeVivienda={TblTiposDeVivienda} />

        ))}
    </div>    
    );
}
