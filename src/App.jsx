import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Entradas from "./pages/Entradas/Entradas";
import Salidas from "./pages/Salidas/Salidas";
import Almacen from "./pages/Entradas/Almacen";
import StorageIcon from "@mui/icons-material/Storage";
import Login from "./pages/authentication/Register";
import Register from "./pages/authentication/Login";

const navArrayLinks =[
    {
        title: "Entradas", 
        path: "/",
        icon: <StorageIcon/>
    },
    {
        title: "Salidas", 
        path: "/salidas",
        icon: <StorageIcon/>
    },
    {
        title: "Almacén",
        path: "/almacen",
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
                    {/* <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/> */}
                </Routes>
            </Container>
        </>
    )
}