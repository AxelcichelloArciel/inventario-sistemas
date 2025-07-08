import React from 'react'
import { FaMicrochip, FaMemory, FaHdd, FaLaptop, FaUser, FaCalendarAlt } from 'react-icons/fa'
import { BsCpu, BsDisplay, BsShieldCheck } from 'react-icons/bs'


const PC = () => {
    const pc = {
        planta: 'Planta Central',
        categoria: 'PC Escritorio',
        marca: 'HP',
        modelo: 'ProDesk 600 G5',
        usuario: 'Juan Pérez',
        numeroSerie: 'SN123456789',
        garantia: 'Sí',
        libre: 'No',
        ram: '16 GB',
        so: 'Windows 10 Pro',
        procesador: 'Intel Core i5-9500',
        monitor: 'HP 24"',
        almacenamiento: '512 GB SSD',
        comentario: 'Buen estado. Poco uso.',
        proveedor: 'Tech Supplier S.A.',
        entrada: '2023-03-10',
        salida: '',
        disponible: 'Sí',
    }

    return (
        <>
        <div className="max-w-5xl mx-auto mt-10 p-8 bg-white rounded-3xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">🖥️ Detalle del Equipo</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-sm">

                <div><span className="font-semibold">📍 Planta:</span> {pc.planta}</div>
                <div><span className="font-semibold">📂 Categoría:</span> {pc.categoria}</div>

                <div><span className="font-semibold">🏷️ Marca:</span> {pc.marca}</div>
                <div><span className="font-semibold">🆔 Modelo:</span> {pc.modelo}</div>

                <div className="flex items-center gap-2">
                    <FaUser className="text-blue-500" /> <span className="font-semibold">Usuario:</span> {pc.usuario}
                </div>

                <div><span className="font-semibold">🔢 N° Serie:</span> {pc.numeroSerie}</div>

                <div className="flex items-center gap-2">
                    <BsShieldCheck className="text-green-600" /> <span className="font-semibold">Garantía:</span> {pc.garantia}
                </div>

                <div><span className="font-semibold">🔓 Libre:</span> {pc.libre}</div>

                <div className="flex items-center gap-2">
                    <FaMemory className="text-purple-600" /> <span className="font-semibold">RAM:</span> {pc.ram}
                </div>

                <div className="flex items-center gap-2">
                    <FaLaptop className="text-gray-600" /> <span className="font-semibold">Sistema Operativo:</span> {pc.so}
                </div>

                <div className="flex items-center gap-2">
                    <BsCpu className="text-red-500" /> <span className="font-semibold">Procesador:</span> {pc.procesador}
                </div>

                <div className="flex items-center gap-2">
                    <BsDisplay className="text-orange-500" /> <span className="font-semibold">Monitor:</span> {pc.monitor}
                </div>

                <div className="flex items-center gap-2">
                    <FaHdd className="text-gray-800" /> <span className="font-semibold">Almacenamiento:</span> {pc.almacenamiento}
                </div>

                <div><span className="font-semibold">🚚 Proveedor:</span> {pc.proveedor}</div>

                <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-green-700" /> <span className="font-semibold">Entrada:</span> {pc.entrada}
                </div>

                <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-red-700" /> <span className="font-semibold">Salida:</span> {pc.salida || '—'}
                </div>

                <div><span className="font-semibold">✅ Disponible:</span> {pc.disponible}</div>
            </div>

            <div className="mt-8 border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">📝 Comentarios:</h3>
                <p className="text-sm italic text-gray-600">{pc.comentario}</p>
            </div>
        </div>
        </>
    )
}

export default PC
