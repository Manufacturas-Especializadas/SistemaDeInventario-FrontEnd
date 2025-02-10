import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import NavListDrawer from "./NavListDrawer";

export default function Navbar({ navArrayLinks }){
    const [open, setOpen] = useState(false)

    return(
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton 
                                color="inherit" 
                                size="large" 
                                onClick={() => setOpen(true)}
                                edge="start"
                                >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        MESA - SISTEMA DE INVENTARIO
                    </Typography>
                    <Box sx={{display: {xs:"none", sm: "block"}}}>
                        {/* {
                            navArrayLinks.map(item => (
                                <Button 
                                        color="inherit" 
                                        key={ item.title }
                                        component={ NavLink }
                                        to={ item.path }>
                                            { item.title }
                                </Button>
                            ))
                        } */}
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer open={open} 
                    anchor="left" 
                    onClose={() => setOpen(false)}
                    
                >                
                <NavListDrawer 
                            navArrayLinks={ navArrayLinks } 
                            NavLink={ NavLink }
                            setOpen={ setOpen }
                            />
            </Drawer>
        </>
    );
}