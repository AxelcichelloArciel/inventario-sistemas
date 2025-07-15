import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";
import { MdPersonRemove } from "react-icons/md";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Render inputs de filtro por columna
const FilterComponent = ({ columnKey, label, value, onChange }) => (
    <input
        className="input w-full mb-1"
        placeholder={`Filtrar ${label}`}
        value={value}
        onChange={e => onChange(columnKey, e.target.value)}
    />
);

const InventarioPCs = () => {
    const [pcs, setPcs] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [columnFilters, setColumnFilters] = useState({
        planta_pc: "",
        categoria_pc: "",
        marca_pc: "",
        modelo_pc: "",
        usuario_pc: "",
        serial_pc: "",
    });

    const handleColumnFilterChange = (key, value) => {
        setColumnFilters(prev => ({ ...prev, [key]: value }));
    };

    const fetchPCs = () => {
        fetch("http://localhost:8888/pcs")
            .then(res => res.json())
            .then(pcs => setPcs(pcs))
            .catch(err => console.error("Error al obtener PCs:", err));
    };

    useEffect(() => { fetchPCs(); }, []);

    // Desafectar usuario de la PC
    const handleDesafeccion = async (id) => {
        const confirm = await Swal.fire({
            title: "¿Desafectar usuario?",
            text: "¿Seguro que quieres desafectar el usuario de esta PC?",
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

    // Eliminar PC
    const handleDelete = async (marca, modelo, serial, id) => {
        const confirm = await Swal.fire({
            title: "¿Eliminar PC?",
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
                    Swal.fire("Eliminado", "La PC fue eliminada.", "success");
                    fetchPCs();
                } else {
                    Swal.fire("Error", "No se pudo eliminar la PC.", "error");
                }
            } catch (err) {
                Swal.fire("Error", "Ocurrió un error al eliminar.", "error");
            }
        }
    };

    // Filtros por columna
    const filteredItems = pcs.filter(item =>
        (item.planta_pc || "").toLowerCase().includes(columnFilters.planta_pc.toLowerCase()) &&
        (item.categoria_pc || "").toLowerCase().includes(columnFilters.categoria_pc.toLowerCase()) &&
        (item.marca_pc || "").toLowerCase().includes(columnFilters.marca_pc.toLowerCase()) &&
        (item.modelo_pc || "").toLowerCase().includes(columnFilters.modelo_pc.toLowerCase()) &&
        (item.usuario_pc || "").toLowerCase().includes(columnFilters.usuario_pc.toLowerCase()) &&
        (item.serial_pc || "").toLowerCase().includes(columnFilters.serial_pc.toLowerCase()) &&
        (
            (item.planta_pc || "").toLowerCase().includes(filterText.toLowerCase()) ||
            (item.categoria_pc || "").toLowerCase().includes(filterText.toLowerCase()) ||
            (item.marca_pc || "").toLowerCase().includes(filterText.toLowerCase()) ||
            (item.modelo_pc || "").toLowerCase().includes(filterText.toLowerCase()) ||
            (item.usuario_pc || "").toLowerCase().includes(filterText.toLowerCase()) ||
            (item.serial_pc || "").toLowerCase().includes(filterText.toLowerCase())
        )
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
                <div className="flex gap-2 mb-2">
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
                        onClick={exportToExcel}
                    >
                        Exportar Excel
                    </button>
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow"
                        onClick={exportToPDF}
                    >
                        Exportar PDF
                    </button>
                </div>
                <input
                    className="input mb-2 w-full"
                    placeholder="Buscar global..."
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                />
                <div className="grid grid-cols-6 gap-2 mb-2">
                    <FilterComponent columnKey="planta_pc" label="Planta" value={columnFilters.planta_pc} onChange={handleColumnFilterChange} />
                    <FilterComponent columnKey="categoria_pc" label="Categoria" value={columnFilters.categoria_pc} onChange={handleColumnFilterChange} />
                    <FilterComponent columnKey="marca_pc" label="Marca" value={columnFilters.marca_pc} onChange={handleColumnFilterChange} />
                    <FilterComponent columnKey="modelo_pc" label="Modelo" value={columnFilters.modelo_pc} onChange={handleColumnFilterChange} />
                    <FilterComponent columnKey="usuario_pc" label="Usuario" value={columnFilters.usuario_pc} onChange={handleColumnFilterChange} />
                    <FilterComponent columnKey="serial_pc" label="N° Serie" value={columnFilters.serial_pc} onChange={handleColumnFilterChange} />
                </div>
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