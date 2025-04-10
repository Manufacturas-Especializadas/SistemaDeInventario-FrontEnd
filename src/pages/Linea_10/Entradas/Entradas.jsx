import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from "@mui/material";
import { toast, Toaster } from "sonner";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import StorageIcon from "@mui/icons-material/Storage";
import config from "../../../../config";

export default function Entradas(){
    const [entradas, setEntradas] = useState([]);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    }

        useEffect(() => {
            const fetchEntradas = async () => {
                await toast.promise(
                    fetch(`${config.apiUrl}/Entradas/ObtenerEntradas`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`Error ${response.status}: ${response.statusText}`);
                            }
                            return response.json();
                        })
                        .then((data) => {
                            console.log("Datos recibidos de la API de entradas:", data);
                            setEntradas(data);
                        }),
                    {
                        loading: "Cargando los datos...",
                        success: "Datos cargados correctamente",
                        error: (error) => {
                            console.error("Error fetching data:", error);
                            return `Ocurrió un error al cargar los datos: ${error.message}`;
                        },
                    }
                );
            };

            fetchEntradas();
        }, []);

    const handleExport = async () =>{
        try{
            const url = `${config.apiUrl}/Entradas/DescargarExcel`;

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
                Linea 10 - Entrada
            </h1>

            <Toaster position="top-right" richColors/>

            <div className="flex justify-between mt-10">
                <Button
                    startIcon={ <StorageIcon/> }
                    color="secondary"
                    onClick={() => handleNavigate("/almacen")}
                >                    
                    Almacen
                </Button>

                <Button
                    startIcon={ <StorageIcon/> }
                    color="secondary"
                    onClick={() => handleNavigate("/salidas")}
                >
                    <a href="/salidas"></a>
                    Salidas
                </Button>

                <Button 
                    startIcon={<CloudDownloadIcon/>} 
                    color="secondary"
                    onClick={ handleExport }
                >
                    Descargar información
                </Button>
            </div>
    
            <Box sx={{ height: 400, width: '100%', background: "#fff", marginTop: 1 , boxShadow: 5}}>
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