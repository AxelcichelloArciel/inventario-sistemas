import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import { FaEye, FaTrash } from 'react-icons/fa';
import { MdPersonRemove } from 'react-icons/md';
import Swal from "sweetalert2";

const InventarioPCs = () => {

    const [pcs, setPcs] = useState([]);

    const fetchPCs = () => {
        fetch("http://localhost:8888/pcs")
            .then(res => res.json())
            .then(pcs => setPcs(pcs))
            .catch(err => console.error("Error al obtener PCs:", err));
    };

    useEffect(() => {
        fetchPCs();
    }, []);

    const handleDesafeccion = async (id) => {
        try {
            await fetch(`http://localhost:8888/pcs/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ disaffect: true })
            });

            await Swal.fire({
                title: "¡Desafectado correctamente!",
                icon: "success",
                draggable: false
            });

            fetchPCs();
        } catch (err) {
            Swal.fire({
                title: "Error!" + err.message,
                icon: "error",
                draggable: true
            });
        }
    };

    const handleDelete = async (marca, modelo, serial, id) => {
        const result = await Swal.fire({
            title: `Seguro que deseas eliminar ${marca} ${modelo} ${serial}?`,
            showCancelButton: true,
            confirmButtonText: "Eliminar",
        });

        if (result.isConfirmed) {
            try {
                await fetch(`http://localhost:8888/pcs/${id}`, { method: "DELETE" });
                setPcs(pcs.filter(pc => pc.id_pc !== id));
                await Swal.fire({
                    title: "¡Eliminado correctamente!",
                    icon: "success",
                    draggable: false
                });
            } catch (err) {
                Swal.fire({
                    title: "Error!" + err.message,
                    icon: "error",
                    draggable: true
                });
            }
        }
    };

    return (<>
        <main>
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold">Inventario de computadoras</h2>
                        <p className="text-gray-700">Aquí podrás gestionar el inventario de PCs vinculadas al
                            dominio.</p>
                    </div>
                    <Link
                        to="/inventarioPCs/nuevaPC"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition"
                    >
                        + Añadir PC
                    </Link>
                </div>

                <table
                    className="min-w-full mt-6 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 text-sm text-gray-800">
                    <thead className="bg-blue-300 text-gray-900">
                    <tr>
                        <th className="px-4 py-3 text-left">Planta</th>
                        <th className="px-4 py-3 text-left">Categoria</th>
                        <th className="px-4 py-3 text-left">Marca</th>
                        <th className="px-4 py-3 text-left">Modelo</th>
                        <th className="px-4 py-3 text-left">Usuario</th>
                        <th className="px-4 py-3 text-left">N° Serie</th>
                        <th className="px-4 py-3 text-center">Disponibilidad</th>
                    </tr>
                    </thead>

                    <tbody>
                    {pcs.map(pc => (
                        <tr
                            key={pc.id_pc}
                            className={
                                pc.estado_pc === "reparacion"
                                    ? "bg-red-300 border-b border-gray-200 hover:bg-red-200"
                                    : "odd:bg-white even:bg-gray-50 hover:bg-blue-50 border-b border-gray-200"
                            }
                        >
                        <td className="px-4 py-2">{pc.planta_pc}</td>
                        <td className="px-4 py-2">{pc.categoria_pc}</td>
                        <td className="px-4 py-2">{pc.marca_pc}</td>
                        <td className="px-4 py-2">{pc.modelo_pc}</td>
                        <td className="px-4 py-2">
                            {pc.usuario_pc
                                ? pc.usuario_pc === "reparacion"
                                    ? "REPARACION"
                                    : pc.usuario_pc
                                : '-'}
                        </td>
                        <td className="px-4 py-2">{pc.serial_pc}</td>
                        <td className="px-4 py-2 font-semibold">
                            <div className="flex items-center justify-center gap-4">
                                <span className={pc.disponibilidad_pc === 'false' ? 'text-red-600' : 'text-green-600'}>
                                    {pc.disponibilidad_pc === 'false' ? 'No Disponible' : 'Disponible'}
                                </span>
                                <Link to={`/inventarioPCs/${pc.id_pc}`} className="text-blue-600 hover:text-blue-800" title="Ver detalles">
                                    <FaEye/>
                                </Link>
                                {pc.usuario_pc && pc.estado_pc !== "reparacion" && (
                                    <button
                                        className="text-gray-600 hover:text-gray-800"
                                        title="Desafectar usuario"
                                        onClick={() => handleDesafeccion(pc.id_pc)}
                                    >
                                        <MdPersonRemove size={18}/>
                                    </button>
                                )}
                                <button
                                    className="text-red-600 hover:text-red-800"
                                    title="Eliminar registro"
                                    onClick={() => handleDelete(pc.marca_pc, pc.modelo_pc, pc.serial_pc, pc.id_pc)}
                                >
                                    <FaTrash/>
                                </button>
                            </div>
                        </td>
                    </tr>))}

                    </tbody>
                </table>
            </div>
        </main>
    </>)
}

export default InventarioPCs