import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d)) return "";
    return d.toISOString().slice(0, 10);
}

const PCNueva = () => {
    const location = useLocation();
    const pcEdit = location.state;
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState(() => pcEdit ? {
        planta_pc: pcEdit.planta_pc || "",
        categoria_pc: pcEdit.categoria_pc || "",
        marca_pc: pcEdit.marca_pc || "",
        modelo_pc: pcEdit.modelo_pc || "",
        usuario_pc: pcEdit.usuario_pc || "",
        serial_pc: pcEdit.serial_pc || "",
        disponibilidad_pc: pcEdit.disponibilidad_pc || "true",
        almacenamiento_pc: pcEdit.almacenamiento_pc || "",
        ram_pc: pcEdit.ram_pc || "",
        so_pc: pcEdit.so_pc || "",
        procesador_pc: pcEdit.procesador_pc || "",
        monitor_pc: pcEdit.monitor_pc || "",
        proveedor_pc: pcEdit.proveedor_pc || "",
        fecha_garantia_pc: formatDate(pcEdit.fecha_garantia_pc),
        entrada_pc: formatDate(pcEdit.entrada_pc),
        salida_pc: formatDate(pcEdit.salida_pc),
        comentarios_pc: pcEdit.comentarios_pc || "",
        estado_pc: pcEdit.estado_pc || "funcional",
    } : {
        planta_pc: "",
        categoria_pc:"",
        marca_pc: "",
        modelo_pc: "",
        usuario_pc: "",
        serial_pc: "",
        disponibilidad_pc: "true",
        almacenamiento_pc: "",
        ram_pc: "",
        so_pc: "",
        procesador_pc: "",
        monitor_pc: "",
        proveedor_pc: "",
        fecha_garantia_pc: "",
        entrada_pc: "",
        salida_pc: "",
        comentarios_pc: "",
        estado_pc: "funcional"
    });

    const navigate = useNavigate();

    // Modifica handleChange
    const handleChange = e => {
        const { name, value } = e.target;
        if (name === "estado_pc" && value === "reparacion") {
            setForm({ ...form, estado_pc: value, disponibilidad_pc: "false" });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true); // Deshabilita el botón
        const isEdit = !!pcEdit?.id_pc;
        const url = isEdit
            ? `http://localhost:8888/pcs/${pcEdit.id_pc}`
            : "http://localhost:8888/addPC";
        const method = isEdit ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    title: isEdit ? "¡Actualizado correctamente!" : "¡Añadido correctamente!",
                    icon: "success",
                    draggable: false
                });
                setTimeout(() => navigate("/inventarioPCs"), 1200);
            } else {
                Swal.fire({
                    title: data.error || "Error en la carga de datos!",
                    icon: "error",
                    draggable: false
                });
            }
        } catch {
            Swal.fire({
                title: "Error de conexión!",
                icon: "error",
                draggable: false
            });
        } finally {
            setLoading(false); // Vuelve a habilitar el botón
        }
    };

    return (
        <div className="container mx-auto p-8 max-w-3xl">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Añadir nueva PC</h2>
            <form onSubmit={handleSubmit} className="bg-blue-50 p-8 rounded-xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Planta</label>
                        <select
                            className="input w-full"
                            name="planta_pc"
                            value={form.planta_pc}
                            onChange={handleChange}

                        >
                            <option value="" disabled hidden>Selecciona una planta</option>
                            <option value="Santiago del Estero">Santiago del Estero</option>
                            <option value="San Martin">San Martín</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Categoría</label>
                        <select
                            className="input w-full"
                            name="categoria_pc"
                            value={form.categoria_pc}
                            onChange={handleChange}

                        >
                            <option value="" disabled hidden>Selecciona una categoría</option>
                            <option value="Notebook">Notebook</option>
                            <option value="PC">PC</option>
                            <option value="Mini PC">Mini PC</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Marca</label>
                        <input className="input w-full" name="marca_pc" placeholder="Marca" value={form.marca_pc} onChange={handleChange}  />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Modelo</label>
                        <input className="input w-full" name="modelo_pc" placeholder="Modelo" value={form.modelo_pc} onChange={handleChange}  />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Usuario</label>
                        <input className="input w-full" name="usuario_pc" placeholder="Usuario" value={form.usuario_pc} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">N° Serie</label>
                        <input className="input w-full" name="serial_pc" placeholder="N° Serie" value={form.serial_pc} onChange={handleChange}  />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Estado</label>
                        <select
                            className="input w-full"
                            name="estado_pc"
                            value={form.estado_pc}
                            onChange={handleChange}
                        >
                            <option value="funcional">Funcional</option>
                            <option value="reparacion">Para reparar</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Disponibilidad</label>
                        <select
                            className="input w-full"
                            name="disponibilidad_pc"
                            value={form.disponibilidad_pc}
                            onChange={handleChange}
                            disabled={form.estado_pc === "reparacion"}
                        >
                            <option value="true">Disponible</option>
                            <option value="false">No disponible</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Almacenamiento (GB)</label>
                        <input className="input w-full" name="almacenamiento_pc" placeholder="Almacenamiento" value={form.almacenamiento_pc} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">RAM (GB)</label>
                        <input className="input w-full" name="ram_pc" placeholder="RAM" value={form.ram_pc} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Sistema Operativo</label>
                        <input className="input w-full" name="so_pc" placeholder="Sistema Operativo" value={form.so_pc} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Procesador</label>
                        <input className="input w-full" name="procesador_pc" placeholder="Procesador" value={form.procesador_pc} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Monitor</label>
                        <input className="input w-full" name="monitor_pc" placeholder="Monitor" value={form.monitor_pc} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Proveedor</label>
                        <input className="input w-full" name="proveedor_pc" placeholder="Proveedor" value={form.proveedor_pc} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Fecha Garantía</label>
                        <input className="input w-full" name="fecha_garantia_pc" type="date" value={form.fecha_garantia_pc} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Fecha Entrada</label>
                        <input className="input w-full" name="entrada_pc" type="date" value={form.entrada_pc} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">Fecha Salida</label>
                        <input className="input w-full" name="salida_pc" type="date" value={form.salida_pc} onChange={handleChange} />
                    </div>
                </div>
                <div className="mt-6">
                    <label className="block mb-1 font-semibold text-gray-700">Comentarios</label>
                    <textarea className="input w-full" name="comentarios_pc" placeholder="Comentarios" value={form.comentarios_pc} onChange={handleChange} rows={3} />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg w-full shadow transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {loading ? "Guardando..." : "Guardar"}
                </button>
            </form>
        </div>
    );
};

export default PCNueva;