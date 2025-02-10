import { Box, Button, Container, Grid2, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { LockOutlined as LockIcon } from "@mui/icons-material";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();

        //Validación
        if(!email || !password){
            setError('Completa todos los campos');
        }        
    }

    return (
        <>
            <h1 className="text-center text-5xl uppercase font-bold">
                Login
            </h1>

            <Container maxWidth="md">
                <Box
                    sx=
                    {{
                        marginTop: 8,
                        marginBottom: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        background: "#fff",
                        paddingTop: "2rem",
                        paddingBottom: "2rem",
                        borderRadius: 4,
                        boxShadow: 1
                    }}
                >
                    <LockIcon sx={{fontSize: 40, color:'primary.main', mb: 2}}/>

                    <Box component="form" onSubmit={ handleSubmit } sx={{mt: 3}}>
                        <TextField
                            margin="normal"
                            variant="filled"
                            required
                            fullWidth
                            id="email"
                            label="Correo electronico"
                            name="email"
                            autoComplete="email"
                            autoFocus
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
                            Inciar sesión
                        </Button>

                        <Grid2 container>
                            <Grid2>
                                <Link href="#" variant="body2">
                                    {"¿No tienes cuenta? Registrate"}
                                </Link>
                            </Grid2>
                        </Grid2>
                    </Box>
                </Box>
            </Container>
        </>
    )
}