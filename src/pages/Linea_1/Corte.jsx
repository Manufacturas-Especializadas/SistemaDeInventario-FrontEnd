import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material';
import { toast, Toaster } from "sonner";
import { DataGrid } from '@mui/x-data-grid';
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export const Corte = () => {
    const[corte, setCorte] = useState([]);

    useEffect(() => {
        const fetchCorte = async () => {
            await toast.promise(
                fetch('https://localhost:44314/api/Corte/ObtenerCorte')
                .then((response) => {
                    if(!response.ok){
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Datos recibidos del API: ", data);
                    setCorte(data);
                }),
                {
                    loading: "Cargando datos...",
                    success: "Datos cargados correctamente",
                    error: (error) => {
                        console.log("Error fetching data: ", error);
                        return `Ocurrio un error al cargar los datos: ${error.message}`;
                    }
                }
            );
        };
        fetchCorte()
    }, []);

    const handleExport = async () => {
        try{
            const url = "https://localhost:44314/api/Corte/DescargarExcel";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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
            link.setAttribute("download", "DatosExportadosCorte.xlsx");
            document.body.appendChild(link);
            link.click();

            link.remove();
        }catch(error){
            console.log("Error al exportar el excel: ", error);
        }        
    };

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
            field: "fechaDeCorte",
            headerName: "FECHA DE CORTE",
            flex: 1
        }
    ];

    return (
        <>
            <h1 className="text-center text-5xl 
                font-bold uppercase"
            >
                Corte
            </h1>

            <Toaster position="top-right" richColors/>


            <div className="flex justify-end mt-5">
                <Button
                    startIcon={<CloudDownloadIcon/>} 
                    color="secondary"
                    onClick={ handleExport }
                >
                    Descargar información
                </Button>
            </div>

            <Box sx={{height: 400, width: '100%', background: '#fff', marginTop: 1, boxShadow: 5}}>
                <DataGrid
                    rows={ corte }
                    columns={ columns }
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                />
            </Box>
        </>
    )
}