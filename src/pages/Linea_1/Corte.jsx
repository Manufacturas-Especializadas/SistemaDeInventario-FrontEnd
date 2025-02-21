import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import { toast, Toaster } from "sonner";
import { DataGrid } from '@mui/x-data-grid';

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

            <Box sx={{height: 400, width: '100%', background: '#fff', marginTop: 5, boxShadow: 5}}>
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