import Navbar from "./components/navBar.jsx";
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home.jsx'
import InventarioPCs from "./pages/InventarioPCs.jsx";
import PC from "./pages/PC.jsx";
import React from "react";
import Inventario from "./pages/Inventario.jsx";
import PCNueva from "./pages/PCNueva.jsx";


function App() {
    return (
        <>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventarioPCs" element={<InventarioPCs />} />
            <Route path="/inventarioPCs/:id" element={<PC/>} />
            <Route path="/inventarioPCs/nuevaPC" element={<PCNueva/>} />
            <Route path="/inventario" element={<Inventario/>} />
        </Routes>

        </>
    )
}

export default App