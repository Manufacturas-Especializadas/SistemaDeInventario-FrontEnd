import { useEffect } from "react";
import { useState } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";


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

    const handleExport = async () =>{
        try{
            const url = "https://app-mesa-sistemadeinventario-api-prod.azurewebsites.net/api/Entradas/DescargarExcel";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: null
            });

            if(!response.ok){
                throw new Error(`Error: ${response.status}`);
            }

            const blob = await response.blob();            

            const urlBlob = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = urlBlob;
            link.setAttribute("download", "DatosExportadosEntradas.xlsx");
            document.body.appendChild(link);
            link.click();


            link.remove();
        }catch (error){
            console.log("Error al exportar el excel: ", error);
        }
        
    }

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

            <div className="flex justify-end">
                <Button 
                    startIcon={<CloudDownloadIcon/>} 
                    color="secondary"
                    onClick={ handleExport }
                >
                    Descargar información
                </Button>
            </div>
    
            <Box sx={{ height: 400, width: '100%', background: "#fff", marginTop: 1 }}>
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