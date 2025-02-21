import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import StorageIcon from "@mui/icons-material/Storage";

export default function Almacen() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const navigate = useNavigate();

    const handleNavigate = (path) =>{
        navigate(path);
    }

    useEffect(() => {
        setLoading(true);

        let url = "https://app-mesa-sistemadeinventario-api-prod.azurewebsites.net/api/Entradas/OrdenarPorFecha";
        if (selectedDate) {
            url += `?fechaFiltro=${selectedDate}`;
        }

        fetch(url, { method: "GET" })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then((result) => {
                console.log("Datos recibidos:", result);
                setData(Array.isArray(result) ? result : []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
                toast.error("Ocurrio un error al cargar los datos", {
                    description: "Detalles del error: " + error.message,
                    duration: 5000
                });
            });
    }, [selectedDate]);

    if (loading) {
        return <Typography>Cargando datos...</Typography>;
    }

    return (
        <>
            <h4 className="text-center font-bold uppercase text-5xl">
                Días en almacén
            </h4>

            <Toaster position="top-right" richColors/>

            <div className="flex justify-around mt-10">
                <Button
                    startIcon={ <StorageIcon/> }                    
                    color="secondary"
                    onClick={() => handleNavigate("/")}
                >
                    Entradas
                </Button>

                <Button
                    startIcon={ <StorageIcon/> }
                    color="secondary"
                    onClick={() => handleNavigate("/salidas")}
                >
                    Salidas
                </Button>

            </div>


            <div className="flex justify-start">
                <TextField
                    variant="filled"
                    type="date"
                    value={selectedDate || ''}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{ marginBottom: '20px', marginTop: '20px', marginLeft: '20px', width: '30%' }}
                />
            </div>
            
            {data.length > 0 ? (
                data.map((grupo, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <Typography variant="h6">
                            Fecha: {grupo.fecha}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Número de parte</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                        <TableCell>Días en almacén</TableCell>
                                        <TableCell>Fecha de salida</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {grupo.numerosDeParte.map((item, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{item.numeroDeParte}</TableCell>
                                            <TableCell>{item.cantidad}</TableCell>
                                            <TableCell>{item.diasEnAlmacen}</TableCell>
                                            <TableCell>
                                                {item.fechaDeSalida 
                                                ? new Date(item.fechaDeSalida).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
                                                : "No ha salido"}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ))
            ) : (
                <Typography>No hay datos disponibles para esta fecha.</Typography>
            )}
        </>
    );
}