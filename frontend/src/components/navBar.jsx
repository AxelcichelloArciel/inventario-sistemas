import React from "react";
import { FaLaptopCode, FaDesktop, FaBoxes} from 'react-icons/fa';
import {Link} from "react-router-dom";

const Navbar = () => {

    return (
        <header className="mx-auto py-3 bg-blue-300 px-6">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-3xl">Inventario sistemas</h1>

                <div className="flex gap-6 items-center">
                    {/* Ícono 1 - PC.jsx */}
                    <Link to="/inventarioPCs">
                        <div className="flex flex-col items-center">
                            <FaLaptopCode size={32} />
                            <h2 className="text-sm font-semibold">PC</h2>
                        </div>
                    </Link>

                    {/* Ícono 2 - Monitor */}
                    <Link to="/inventarioMonitores">
                    <div className="flex flex-col items-center">
                        <FaDesktop size={32} />
                        <h2 className="text-sm font-semibold">Monitores</h2>
                    </div>
                    </Link>

                    {/* Ícono 3 - Inventario general */}
                    <Link to="/inventario">
                        <div className="flex flex-col items-center">
                            <FaBoxes size={32} />
                            <h2 className="text-sm font-semibold">Inventario</h2>
                        </div>
                    </Link>
                </div>
            </div>
        </header>

    )
}

export default Navbar;