import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";
import { MdPersonRemove } from "react-icons/md";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

    // Desafectar usuario de la DetallePC
    const handleDesafeccion = async (id) => {
        const confirm = await Swal.fire({
            title: "¿Desafectar usuario?",
            text: "¿Seguro que quieres desafectar el usuario de esta DetallePC?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, desafectar",
            cancelButtonText: "Cancelar"
        });
        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`http://localhost:8888/pcs/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ disaffect: true })
                });
                if (res.ok) {
                    Swal.fire("Desafectado", "El usuario fue desafectado.", "success");
                    fetchPCs();
                } else {
                    Swal.fire("Error", "No se pudo desafectar el usuario.", "error");
                }
            } catch {
                Swal.fire("Error", "Ocurrió un error al desafectar.", "error");
            }
        }
    };

    // Eliminar DetallePC
    const handleDelete = async (marca, modelo, serial, id) => {
        const confirm = await Swal.fire({
            title: "¿Eliminar DetallePC?",
            text: `¿Seguro que quieres eliminar la PC ${marca} ${modelo} (${serial})?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });
        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`http://localhost:8888/pcs/${id}`, {
                    method: "DELETE"
                });
                if (res.ok) {
                    Swal.fire("Eliminado", "La DetallePC fue eliminada.", "success");
                    fetchPCs();
                } else {
                    Swal.fire("Error", "No se pudo eliminar la DetallePC.", "error");
                }
            } catch {
                Swal.fire("Error", "Ocurrió un error al eliminar.", "error");
            }
        }
    };

    // Filtro global
    const filteredItems = pcs.filter(item =>
        (item.planta_pc || "").toLowerCase().includes(filterText.toLowerCase()) ||
        (item.categoria_pc || "").toLowerCase().includes(filterText.toLowerCase()) ||
        (item.marca_pc || "").toLowerCase().includes(filterText.toLowerCase()) ||
        (item.modelo_pc || "").toLowerCase().includes(filterText.toLowerCase()) ||
        (item.usuario_pc || "").toLowerCase().includes(filterText.toLowerCase()) ||
        (item.serial_pc || "").toLowerCase().includes(filterText.toLowerCase())
    );

    // Exportar a Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredItems);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "InventarioPCs");
        XLSX.writeFile(wb, "InventarioPCs.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [[
                "Planta", "Categoria", "Marca", "Modelo", "Usuario", "N° Serie", "Disponibilidad"
            ]],
            body: filteredItems.map(row => [
                row.planta_pc,
                row.categoria_pc,
                row.marca_pc,
                row.modelo_pc,
                row.usuario_pc === "reparacion" ? "REPARACION" : (row.usuario_pc || "-"),
                row.serial_pc,
                row.disponibilidad_pc === "false" ? "No Disponible" : "Disponible"
            ]),
        });
        doc.save("InventarioPCs.pdf");
    };

    const columns = [
        {
            name: "Planta",
            selector: row => row.planta_pc,
            sortable: true,
            grow: 1,
        },
        {
            name: "Categoria",
            selector: row => row.categoria_pc,
            sortable: true,
            grow: 1,
        },
        {
            name: "Marca",
            selector: row => row.marca_pc,
            sortable: true,
            grow: 1,
        },
        {
            name: "Modelo",
            selector: row => row.modelo_pc,
            sortable: true,
            grow: 1,
        },
        {
            name: "Usuario",
            selector: row => row.usuario_pc === "reparacion" ? "REPARACION" : (row.usuario_pc || "-"),
            sortable: true,
            grow: 1,
        },
        {
            name: "N° Serie",
            selector: row => row.serial_pc,
            sortable: true,
            grow: 1,
        },
        {
            name: "Disponibilidad",
            selector: row => row.disponibilidad_pc,
            sortable: true,
            cell: row => (
                <span className={row.disponibilidad_pc === 'false' ? 'text-red-600' : 'text-green-600'}>
                    {row.disponibilidad_pc === 'false' ? 'No Disponible' : 'Disponible'}
                </span>
            ),
            grow: 1,
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

    // Estilos condicionales para filas en reparación
    const conditionalRowStyles = [
        {
            when: row => row.estado_pc === "reparacion",
            style: {
                backgroundColor: "#fee2e2",
                color: "#b91c1c",
                fontWeight: "bold",
                transition: "background 0.2s",
            },
            hoverStyle: {
                backgroundColor: "#fca5a5",
                color: "#b91c1c",
            }
        }
    ];

    return (
        <main>
            <div className="container mx-auto p-2 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold">Inventario de computadoras</h2>
                        <p className="text-gray-700 text-sm sm:text-base">Aquí podrás gestionar el inventario de PCs vinculadas al dominio.</p>
                    </div>
                    <Link
                        to="/inventarioPCs/nuevaPC"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-2 sm:px-4 rounded shadow transition text-sm sm:text-base mt-2 sm:mt-0"
                    >
                        + Añadir PC
                    </Link>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-2 sm:px-4 rounded shadow text-sm sm:text-base"
                        onClick={exportToExcel}
                    >
                        Exportar Excel
                    </button>
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-2 sm:px-4 rounded shadow text-sm sm:text-base"
                        onClick={exportToPDF}
                    >
                        Exportar PDF
                    </button>
                </div>
                <input
                    className="input border-2 border-gray-200 my-2 w-full text-lg sm:text-xl py-3 px-4 rounded-lg"
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
                    conditionalRowStyles={conditionalRowStyles}
                />
            </div>
        </main>
    );
};

export default InventarioPCs;