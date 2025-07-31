import Navbar from "./components/navBar.jsx";
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home.jsx'
import InventarioPCs from "./pages/PCs/InventarioPCs.jsx";
import DetallePC from "./pages/PCs/DetallePC.jsx";
import React from "react";
import PCNueva from "./pages/PCs/PCNueva.jsx";
import InventarioInsumos from "./pages/Insumos/InventarioInsumos.jsx";


function App() {
    return (
        <>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />

            // Rutas inventario PCs
            <Route path="/inventarioPCs" element={<InventarioPCs />} />
            <Route path="/inventarioPCs/:id" element={<DetallePC/>} />
            <Route path="/inventarioPCs/nuevaPC" element={<PCNueva/>} />

            // Rutas inventario insumos
            <Route path="/inventarioInsumos" element={<InventarioInsumos/>} />
        </Routes>

        </>
    )
}

export default App