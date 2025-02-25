import {useEffect, useState} from  'react';
import {getAllTblTiposCultivo} from '../api/Cultivo.Api';
import {CultivoCard} from './CultivoCard';
import {getTblTiposCultivo} from '../api/Cultivo.Api';


export function DatperFormPage() {
    const [cultivos, setCultivos] = useState([]);
    
    useEffect(() => {
        async function loadCultivos() {
            try {
                const response = await getCultivos(); // Suponiendo que la API devuelve un array de cultivos con id y nombre
                setCultivos(response.data);
            } catch (error) {
                console.error("Error cargando cultivos:", error);
            }
        }
        loadCultivos();
    }, []);
}



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

