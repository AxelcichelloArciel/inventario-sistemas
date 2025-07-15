import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";
import { MdPersonRemove } from "react-icons/md";
import Swal from "sweetalert2";

const InventarioPCs = () => {
    const [pcs, setPcs] = useState([]);
    const [filterText, setFilterText] = useState("");

    const fetchPCs = () => {
        fetch("http://localhost:8888/pcs")
            .then(res => res.json())
            .then(pcs => setPcs(pcs))
            .catch(err => console.error("Error al obtener PCs:", err));
    };

    useEffect(() => { fetchPCs(); }, []);

    const handleDesafeccion = async (id) => { /* igual que antes */ };
    const handleDelete = async (marca, modelo, serial, id) => { /* igual que antes */ };

    const columns = [
        { name: "Planta", selector: row => row.planta_pc, sortable: true },
        { name: "Categoria", selector: row => row.categoria_pc, sortable: true },
        { name: "Marca", selector: row => row.marca_pc, sortable: true },
        { name: "Modelo", selector: row => row.modelo_pc, sortable: true },
        { name: "Usuario", selector: row => row.usuario_pc === "reparacion" ? "REPARACION" : (row.usuario_pc || "-"), sortable: true },
        { name: "N° Serie", selector: row => row.serial_pc, sortable: true },
        {
            name: "Disponibilidad",
            selector: row => row.disponibilidad_pc,
            sortable: true,
            cell: row => (
                <span className={row.disponibilidad_pc === 'false' ? 'text-red-600' : 'text-green-600'}>
                    {row.disponibilidad_pc === 'false' ? 'No Disponible' : 'Disponible'}
                </span>
            )
        },
        {
            name: "Acciones",
            cell: row => (
                <div className="flex items-center gap-2">
                    <Link to={`/inventarioPCs/${row.id_pc}`} className="text-blue-600 hover:text-blue-800" title="Ver detalles">
                        <FaEye />
                    </Link>
                    {row.usuario_pc && row.estado_pc !== "reparacion" && (
                        <button
                            className="text-gray-600 hover:text-gray-800"
                            title="Desafectar usuario"
                            onClick={() => handleDesafeccion(row.id_pc)}
                        >
                            <MdPersonRemove size={18} />
                        </button>
                    )}
                    <button
                        className="text-red-600 hover:text-red-800"
                        title="Eliminar registro"
                        onClick={() => handleDelete(row.marca_pc, row.modelo_pc, row.serial_pc, row.id_pc)}
                    >
                        <FaTrash />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    // Filtro global
    const filteredItems = pcs.filter(
        item =>
            (item.planta_pc || "").toLowerCase().includes(filterText.toLowerCase()) ||
            (item.categoria_pc || "").toLowerCase().includes(filterText.toLowerCase()) ||
            (item.marca_pc || "").toLowerCase().includes(filterText.toLowerCase()) ||
            (item.modelo_pc || "").toLowerCase().includes(filterText.toLowerCase()) ||
            (item.usuario_pc || "").toLowerCase().includes(filterText.toLowerCase()) ||
            (item.serial_pc || "").toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <main>
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold">Inventario de computadoras</h2>
                        <p className="text-gray-700">Aquí podrás gestionar el inventario de PCs vinculadas al dominio.</p>
                    </div>
                    <Link
                        to="/inventarioPCs/nuevaPC"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition"
                    >
                        + Añadir PC
                    </Link>
                </div>
                <input
                    className="input mb-2 w-full"
                    placeholder="Buscar..."
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                />
                <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                />
            </div>
        </main>
    );
};

export default InventarioPCs;