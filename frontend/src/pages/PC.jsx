import React, {useEffect, useState} from 'react'
import {FaMicrochip, FaMemory, FaHdd, FaLaptop, FaUser, FaCalendarAlt} from 'react-icons/fa'
import {BsCpu, BsDisplay, BsShieldCheck} from 'react-icons/bs'
import {useParams, useNavigate} from 'react-router-dom'

const PC = () => {
    const {id} = useParams();
    const [pc, setPc] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8888/pcs/${id}`)
            .then(res => res.json())
            .then(data => setPc(data))
            .catch(err => console.error("Error al obtener la PC:", err));
    }, [id]);

    if (!pc) return <div className="text-center mt-10">Cargando...</div>;

    return (
        <>
            <div className="max-w-5xl mx-auto mt-10 p-8 bg-white rounded-3xl shadow-xl border border-gray-200">
                <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">🖥️ Detalle del Equipo</h2>

                <div className="flex justify-end mt-4">
                    <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => navigate('/inventarioPCs/nuevaPC', { state: pc })}
                    >
                        ✏️ Editar
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-sm">

                    <div><span className="font-semibold">📍 Planta:</span> {pc.planta_pc}</div>
                    <div><span className="font-semibold">📂 Categoría:</span> {pc.categoria_pc}</div>
                    <div><span className="font-semibold">🏷️ Marca:</span> {pc.marca_pc}</div>
                    <div><span className="font-semibold">🆔 Modelo:</span> {pc.modelo_pc}</div>
                    <div className="flex items-center gap-2">
                        <FaUser className="text-blue-500"/> <span
                        className="font-semibold">Usuario:</span> {pc.usuario_pc ? `${pc.usuario_pc}` : '-'}
                    </div>
                    <div><span className="font-semibold">🔢 N° Serie:</span> {pc.serial_pc}</div>
                    <div className="flex items-center gap-2">
                        <BsShieldCheck className="text-green-600"/> <span
                        className="font-semibold">Garantía:</span> {pc.fecha_garantia_pc}
                    </div>


                    <div className="flex items-center gap-2">
                        <FaHdd className="text-gray-600"/> <span
                        className="font-semibold">Almacenamiento:</span> {pc.almacenamiento_pc} GB
                    </div>

                    <div className="flex items-center gap-2">
                        <FaMemory className="text-purple-600"/> <span
                        className="font-semibold">RAM:</span> {pc.ram_pc} GB
                    </div>
                    <div className="flex items-center gap-2">
                        <FaLaptop className="text-gray-600"/> <span
                        className="font-semibold">Sistema Operativo:</span> {pc.so_pc}
                    </div>
                    <div className="flex items-center gap-2">
                        <BsCpu className="text-red-500"/> <span
                        className="font-semibold">Procesador:</span> {pc.procesador_pc}
                    </div>
                    <div className="flex items-center gap-2">
                        <BsDisplay className="text-orange-500"/> <span
                        className="font-semibold">Monitor:</span> {pc.monitor_pc ? `${pc.monitor_pc}` : 'No asignado'}
                    </div>
                    <div><span className="font-semibold">🚚 Proveedor:</span> {pc.proveedor_pc}</div>
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-green-700"/> <span
                        className="font-semibold">Entrada:</span> {pc.entrada_pc || '-'}
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-red-700"/> <span
                        className="font-semibold">Salida:</span> {pc.salida_pc}
                    </div>
                    <div>
                        <span className="font-semibold">✅ Disponible:</span>
                        <span
                            className={pc.disponible ? "text-green-600 font-bold ml-2" : "text-red-600 font-bold ml-2"}>
                            {pc.disponible ? "Disponible" : "No disponible"}
                        </span>
                    </div>
                </div>
                <div className="mt-8 border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">📝 Comentarios:</h3>
                    <p className="text-sm italic text-gray-600">{pc.comentarios_pc}</p>
                </div>
            </div>
        </>
    )
}

export default PC