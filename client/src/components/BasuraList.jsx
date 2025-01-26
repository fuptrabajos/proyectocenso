import {useEffect, useState} from  'react';
import {getAllTblDisBasuras} from '../api/Basura.api';
import {BasuraCard} from './BasuraCard';



export function BasuraList(){
    const [basura, setBasura] = useState([]);
    

    useEffect(()=> {
        async function loadBasura(){
            const res = await getAllTblDisBasuras();
            setBasura(res.data);
        }
        loadBasura();
    },[]);
    return (
    <div className="grid grid-cols-4 gap-3">
        {basura.map((TblDisBasuras) => (
            <BasuraCard key={TblDisBasuras.id_dis_basuras} TblDisBasuras={TblDisBasuras} />

        ))}
    </div>    
    );
}
