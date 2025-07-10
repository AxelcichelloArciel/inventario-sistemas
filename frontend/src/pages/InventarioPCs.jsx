import React, { useEffect, useState } from "react";

const InventarioPCs = () => {

    const [pcs, setPcs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8888/pcs")
            .then(res => res.json())
            .then(pcs => setPcs(pcs))
            .catch(err => console.error("Error al obtener PCs:", err));
    }, []);

    return(
        <>
            <main>
                <div className="container mx-auto p-6">
                    <h2 className="text-2xl font-bold mb-4">Inventario de computadoras</h2>
                    <p className="text-gray-700">Aquí podrás gestionar el inventario de PCs vinculadas al dominio.</p>

                    <table className="min-w-full mt-6 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 text-sm text-gray-800">
                        <thead className="bg-blue-300 text-gray-900">
                        <tr>
                            <th className="px-4 py-3 text-left">Planta</th>
                            <th className="px-4 py-3 text-left">Marca</th>
                            <th className="px-4 py-3 text-left">Modelo</th>
                            <th className="px-4 py-3 text-left">Usuario</th>
                            <th className="px-4 py-3 text-left">N° Serie</th>
                            <th className="px-4 py-3 text-left">Disponibilidad</th>
                        </tr>
                        </thead>

                        <tbody>
                        {pcs.map(pc => (


                        <tr key={pc.id_pc} className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 border-b border-gray-200">
                            <td className="px-4 py-2">{pc.planta_pc}</td>
                            <td className="px-4 py-2">{pc.marca_pc}</td>
                            <td className="px-4 py-2">{pc.modelo_pc}</td>
                            <td className="px-4 py-2">{pc.usuario_pc}</td>
                            <td className="px-4 py-2">{pc.serial_pc}</td>
                            <td className={`px-4 py-2 font-semibold ${pc.disponibilidad_pc === 'false'? 'text-red-600' : 'text-green-600'}`}>
                                {pc.disponibilidad_pc === 'false' ? 'No Disponible' : 'Disponible'}
                            </td>
                        </tr>
                        ))}

                        </tbody>
                    </table>

                </div>
            </main>

        </>
    )
}

export default InventarioPCs