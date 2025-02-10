import { Box, Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import appClient from "../../config/axios";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        try{
            appClient.post('/auth/register', {email, password});
            alert('Usuario registrado existosamente')
        }catch(error){
            console.log(error);
            alert('Error al registrar el usuario');
        }
        
    };

    return (
        <>
            <h1 className="text-center text-5xl uppercase font-bold mb-6">
                Registro
            </h1>
        
            <Container>                
                    <Box
                    sx=
                    {{
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: 11,
                        marginRight: 11,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        background: "#fff",
                        paddingTop: "3rem",
                        paddingBottom: "3rem"                        
                    }}
                >
                    <PersonOutlineOutlinedIcon sx={{fontSize: 80, color:'primary.main', mb: 2}}/>
                    <Box component="form" onSubmit={ handleSubmit } sx={{mt:3}}>
                        <TextField
                            margin="normal"
                            variant="filled"
                            required
                            fullWidth
                            id="email"
                            label="Correo electronico"
                            value={ email }
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            variant="filled"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={ password }
                            onChange={(e) => setPasword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Registrar
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
