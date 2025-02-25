import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Entradas from "./pages/Linea_10/Entradas/Entradas";
import Salidas from "./pages/Linea_10/Salidas/Salidas";
import Almacen from "./pages/Linea_10/Entradas/Almacen";
import StorageIcon from "@mui/icons-material/Storage";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import { Corte } from "./pages/Linea_1/Corte";

const navArrayLinks =[
    {
        title: "Línea 1",
        path: "/linea-1",
        icon: <StorageIcon/>
    },
    {

        title: "Linea 10", 
        path: "/",
        icon: <StorageIcon/>
    }
]

export default function App(){
    return(
        <>
            <Navbar navArrayLinks={ navArrayLinks }/>
            <Container  sx={{mt:5}}>
                <Routes>
                    <Route path="/" element={<Entradas/>}/>
                    <Route path="/salidas" element={<Salidas/>}/>
                    <Route path="/almacen" element={<Almacen/>}/>
                    <Route path="/linea-1" element={<Corte/>}/>
                    {/* <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/> */}
                </Routes>
            </Container>
        </>
    )
}