import {useEffect, useState} from  'react';
import {getAllTblRegimen} from '../api/Regimen.api';
import {RegimenCard} from './RegimenCard';



export function RegimenList(){
    const [regimen, setRegimen] = useState([]);
    

    useEffect(()=> {
        async function loadRegimen(){
            const res = await getAllTblRegimen();
            setRegimen(res.data);
        }
        loadRegimen();
    },[]);
    return (
    <div className="grid grid-cols-4 gap-3">
        {regimen.map((TblRegimen) => (
            <RegimenCard key={TblRegimen.id_regimen} TblRegimen={TblRegimen} />

        ))}
    </div>    
    );
}
