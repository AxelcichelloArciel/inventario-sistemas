import React from "react";
import { FaLaptopCode, FaDesktop, FaBoxes} from 'react-icons/fa';

const Home = () => {
    return(
        <>
            <main>
                <div className="container mx-auto p-6">
                    <h2 className="text-2xl font-bold mb-4">Bienvenido al sistema de inventario</h2>
                    <p className="text-gray-700">Aquí podrás gestionar el inventario de sistemas, monitores y otros equipos.</p>

                    <p className="text-gray-700 mt-2">Utiliza el menú de navegación para acceder a las diferentes secciones.</p>
                </div>
            </main>

        </>
    )
}

export default Home