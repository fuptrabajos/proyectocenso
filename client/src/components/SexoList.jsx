import {useEffect, useState} from  'react';
import {getAllTblSexo} from '../api/Sexo.api';
import {SexoCard} from './SexoCard';



export function SexoList(){
    const [sexo, setSexo] = useState([]);
    

    useEffect(()=> {
        async function loadSexo(){
            const res = await getAllTblSexo();
            setSexo(res.data);
        }
        loadSexo();
    },[]);
    return (
    <div className="grid grid-cols-4 gap-3">
        {sexo.map((TblSexo) => (
            <SexoCard key={TblSexo.descripcion} TblSexo={TblSexo} />

        ))}
    </div>    
    );
}

