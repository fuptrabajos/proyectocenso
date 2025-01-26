import {useEffect, useState} from  'react';
import {getAllTblDatPer} from '../api/Datper.api';
import {DatperCard} from './DatperCard';



export function DatperList(){
    const [Datper, setDatper] = useState([]);
    

    useEffect(()=> {
        async function loadComuneros(){
            const res = await getAllTblDatPer();
            setDatper(res.data);
        }
        loadComuneros();
    },[]);
    return (
    <div className="grid grid-cols-4 gap-3">
        {Datper.map((TblDatPer) => (
            <DatperCard key={TblDatPer.id_paciente} TblDatPer={TblDatPer} />

        ))}
    </div>    
    );
}

