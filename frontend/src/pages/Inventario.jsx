import React from "react";

const Inventario = () => {
    return(
        <>
            <main>
                <div className="container mx-auto p-6">
                    <h2 className="text-2xl font-bold mb-4">Inventario de insumos </h2>
                    <p className="text-gray-700">Aqui podras gestionar los insumos del area de sistemas.</p>

                    <table className="min-w-full mt-6 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 text-sm text-gray-800">
                        <thead className="bg-green-300 text-gray-900">
                        <tr>
                            <th className="px-4 py-3 text-left">Categoria</th>
                            <th className="px-4 py-3 text-left">Modelo</th>
                            <th className="px-4 py-3 text-left">Marca</th>
                            <th className="px-4 py-3 text-left">N° Serie</th>
                            <th className="px-4 py-3 text-left">Almacenamiento</th>
                            <th className="px-4 py-3 text-left">Observaciones</th>
                            <th className="px-4 py-3 text-left">Disponibilidad</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 border-b border-gray-200">
                            <td className="px-4 py-2">Planta 1</td>
                            <td className="px-4 py-2">PC</td>
                            <td className="px-4 py-2">Dell</td>
                            <td className="px-4 py-2">115544</td>
                            <td className="px-4 py-2">OptiPlex 3070</td>
                            <td className="px-4 py-2">Juan Perez</td>
                            <td className="px-4 py-2">1234567890</td>
                        </tr>


                        </tbody>
                    </table>

                </div>
            </main>

        </>
    )
}

export default Inventario