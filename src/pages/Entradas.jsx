import { useEffect } from "react";
import { useState } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { Box } from "@mui/material";
import { es } from 'date-fns/locale';


export default function Entradas(){
    const [entradas, setEntradas] = useState([]);

    useEffect(() => {
        const fetchEntradas = async () => {
            const response = await fetch('https://app-mesa-sistemadeinventario-api-prod.azurewebsites.net/api/Entradas/ObtenerEntradas');
            const data = await response.json();
            console.log("Datos recibidos de la API de entradas:", data);
            setEntradas(data);
        };
        fetchEntradas();
    }, []);

    const columns = [
        {
            field: "numeroDeParte", 
            headerName: "NÚMERO DE PARTE",
            flex: 1
        },
        {
            field: "cantidad", 
            headerName: "CANTIDAD", 
            flex: 1
        },
        {
            field: "fechaDeEntrada",
            headerName: "FECHA DE ENTRADA",
            flex: 1
        }
    ];

    return (
        <>
            <h1 className="text-center text-5xl font-bold uppercase mb-2">
                Entradas
            </h1>

            <Box sx={{ height: 400, width: '100%', background: "#fff" }}>
                <DataGrid
                    rows={ entradas }
                    columns={ columns }
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                />
            </Box>
        </>
    );
}