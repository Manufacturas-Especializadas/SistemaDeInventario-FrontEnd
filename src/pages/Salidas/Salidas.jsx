import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react"

export default function Salidas(){
    const[salidas, setSalidas] = useState([]);

    useEffect(() =>{
        const fetchSalidas = async () =>{
            const response = await fetch('https://app-mesa-sistemadeinventario-api-prod.azurewebsites.net/api/Salidas/ObtenerSalidas');
            const data = await response.json();
            console.log("Datos recibidos de la API de salidas:", data);
            setSalidas(data);
        }
        fetchSalidas();
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
            field: "fechaDeSalida",
            headerName: "FECHA DE SALIDA",
            flex: 1
        }
    ];

    return(
        <>
            <h1 className="text-center text-5xl uppercase font-bold mb-2">
                Salidas
            </h1>

            <Box sx={{ height: 400, width: '100%', background: "#fff" }}>
                <DataGrid
                    rows={ salidas }
                    columns={ columns }
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                />
            </Box>
        </>
    )
}