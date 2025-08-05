import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {MdDeleteForever, MdAdsClick} from "react-icons/md";
import { CiViewList } from "react-icons/ci";


const InventarioInsumos = () => {
    const [insumos, setInsumos] = useState([]); // Estado para almacenar los insumos
    const [filterText, setFilterText] = useState(""); // Estado para el filtro global

    const fetchInsumos = () => {
        fetch("http://localhost:8888/insumos") // URL del backend para obtener insumos
            .then(res => res.json())
            .then(data => setInsumos(data))
            .catch(err => console.error("Error al obtener insumos:", err));
    };

    useEffect(() => {
        fetchInsumos();
    }, []); // Cargar insumos al montar el componente

    const handleViewInsumo = async (insumo) => {
        await Swal.fire({
            title: `Detalle del insumo`,
            html: `
            <strong>Categoría:</strong> ${insumo.categoria}<br/>
            <strong>Insumo:</strong> ${insumo.insumo}<br/>
            <strong>Marca:</strong> ${insumo.marca}<br/>
            <strong>Cantidad:</strong> ${insumo.cantidad}<br/>
            <strong>Almacenamiento:</strong> ${insumo.almacenamiento}<br/>
            <strong>Observaciones:</strong> ${insumo.observaciones || "-"}
        `,
            confirmButtonText: 'Cerrar'
        });
    }

    const handleAddInsumo = async () => {
        const {value: formValues} = await Swal.fire({
            title: 'Añadir nuevo insumo',
            html: `<input id="swal-categoria" class="swal2-input" placeholder="Categoría">` + `<input id="swal-insumo" class="swal2-input" placeholder="Insumo">` + `<input id="swal-marca" class="swal2-input" placeholder="Marca">` + `<input id="swal-cantidad" type="number" min="1" class="swal2-input" placeholder="Cantidad">` + `<input id="swal-almacenamiento" class="swal2-input" placeholder="Almacenamiento">` + `<input id="swal-observaciones" class="swal2-input" placeholder="Observaciones">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Añadir',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const categoria = document.getElementById('swal-categoria').value.trim();
                const insumo = document.getElementById('swal-insumo').value.trim();
                const marca = document.getElementById('swal-marca').value.trim();
                const cantidad = parseInt(document.getElementById('swal-cantidad').value, 10);
                const almacenamiento = document.getElementById('swal-almacenamiento').value.trim();
                const observaciones = document.getElementById('swal-observaciones').value.trim();

                if (!categoria || !insumo || !marca || !cantidad || cantidad <= 0 || !almacenamiento) {
                    Swal.showValidationMessage('Completa todos los campos y asegúrate que la cantidad sea válida');
                    return false;
                }
                return {categoria, insumo, marca, cantidad, almacenamiento, observaciones};
            }
        });

        if (formValues) {
            try {
                const res = await fetch("http://localhost:8888/insumos", {
                    method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(formValues)
                });
                if (res.ok) {
                    Swal.fire("¡Listo!", "Insumo añadido correctamente.", "success");
                    fetchInsumos();
                } else {
                    Swal.fire("Error", "No se pudo añadir el insumo.", "error");
                }
            } catch {
                Swal.fire("Error", "Ocurrió un error al añadir.", "error");
            }
        }
    }

    const handleConsume = async (id, nombre, cantidadActual) => {
        const {value: cantidadConsumida} = await Swal.fire({
            title: `Consumir insumo: ${nombre}`,
            input: 'number',
            inputLabel: `Cantidad disponible: ${cantidadActual}`,
            inputPlaceholder: 'Ingrese la cantidad a consumir',
            inputAttributes: {
                min: 1, max: cantidadActual, step: 1
            },
            showCancelButton: true,
            confirmButtonText: 'Consumir',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value || value <= 0) {
                    return 'Debes ingresar una cantidad válida';
                }
                if (value > cantidadActual) {
                    return `No puedes consumir más de ${cantidadActual} unidades`;
                }
                return null;
            }
        });

        if (cantidadConsumida) {
            try {
                const res = await fetch(`http://localhost:8888/insumos/${id}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({cantidad: parseInt(cantidadConsumida, 10)})
                });
                if (res.ok) {
                    Swal.fire("¡Listo!", "Cantidad consumida correctamente.", "success");
                    fetchInsumos();
                } else {
                    Swal.fire("Error", "No se pudo consumir el insumo.", "error");
                }
            } catch {
                Swal.fire("Error", "Ocurrió un error al consumir.", "error");
            }
        }
    };

    // Eliminar insumo
    const handleDelete = async (id, nombre) => {
        const confirm = await Swal.fire({
            title: "¿Eliminar insumo?",
            text: `¿Seguro que quieres eliminar el insumo ${nombre}? Esto lo borrará permanentemente.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });
        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`http://localhost:8888/insumos/${id}`, {
                    method: "DELETE"
                });
                if (res.ok) {
                    Swal.fire("Eliminado", "El insumo fue eliminado.", "success");
                    fetchInsumos();
                } else {
                    Swal.fire("Error", "No se pudo eliminar el insumo.", "error");
                }
            } catch {
                Swal.fire("Error", "Ocurrió un error al eliminar.", "error");
            }
        }
    };

    // Filtro global
    const filteredItems = insumos.filter(item => (item.categoria || "").toLowerCase().includes(filterText.toLowerCase()) || (item.insumo || "").toLowerCase().includes(filterText.toLowerCase()) || (item.marca || "").toLowerCase().includes(filterText.toLowerCase()) || (item.almacenamiento || "").toLowerCase().includes(filterText.toLowerCase()) || (item.observaciones || "").toLowerCase().includes(filterText.toLowerCase()) || (item.cantidad || "").toString().toLowerCase().includes(filterText.toLowerCase()));

    // Exportar a Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredItems);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "InventarioInsumos");
        XLSX.writeFile(wb, "InventarioInsumos.xlsx");
    };

    // Exportar a PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [["Categoría", "Insumo", "Marca", "Almacenamiento", "Observaciones"]],
            body: filteredItems.map(row => [row.categoria, row.insumo, row.marca, row.cantidad, row.almacenamiento, row.observaciones]),
        });
        doc.save("InventarioInsumos.pdf");
    };

    const columns = [{name: "Categoría", selector: row => row.categoria, sortable: true, grow: 1}, {
        name: "Insumo", selector: row => row.insumo, sortable: true, grow: 1
    }, {name: "Marca", selector: row => row.marca, sortable: true, grow: 1}, {
        name: "Cantidad", selector: row => row.cantidad, sortable: true, grow: 1
    }, {name: "Almacenamiento", selector: row => row.almacenamiento, sortable: true, grow: 1}, {
        name: "Observaciones", selector: row => row.observaciones, sortable: true, grow: 2
    }, {
        name: "Acciones", cell: row => (

            <div className="flex items-center gap-2">

                <button
                    className="text-green-600 hover:text-green-800"
                    title="Ver insumo"
                    onClick={() => handleViewInsumo(row)}
                >
                    <CiViewList size={18}/>

                </button>

                <button
                    className="text-blue-600 hover:text-blue-800"
                    title="Consumir insumo"
                    onClick={() => handleConsume(row.id_insumo, row.insumo, row.cantidad)}
                >
                    <MdAdsClick size={18}/>

                </button>

                <button
                    className="text-red-600 hover:text-red-800"
                    title="Eliminar insumo"
                    onClick={() => handleDelete(row.id_insumo, row.insumo)}
                >
                    <MdDeleteForever size={18}/>

                </button>

            </div>


        ), ignoreRowClick: true, allowOverflow: true, button: true,
    }];

    return (<main>
        <div className="container mx-auto p-2 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold">Inventario de insumos</h2>
                    <p className="text-gray-700 text-sm sm:text-base">Aquí podrás gestionar el inventario de
                        insumos.</p>
                </div>
                <button
                    onClick={handleAddInsumo}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-2 sm:px-4 rounded shadow transition text-sm sm:text-base mt-2 sm:mt-0"
                >
                    + Añadir insumo
                </button>
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
            />
        </div>
    </main>);
};

export default InventarioInsumos;