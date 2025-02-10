import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#2073ef",
      light: "#5f96ea",
    },
    secondary: {
      main: "#7b35e2",
    },
    info: {
      main: "#a4a6a8",
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={ theme }> {/* Tema personalizado */}
      <BrowserRouter>
        <CssBaseline/>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)