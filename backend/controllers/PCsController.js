import db from '../config/database.js';
import * as PCs from '../model/PCs.js';

export async function addPC(req, res) {
    const {
        planta_pc, categoria_pc, marca_pc, modelo_pc, usuario_pc, serial_pc,
        disponibilidad_pc, almacenamiento_pc, ram_pc, so_pc, procesador_pc,
        monitor_pc, proveedor_pc, fecha_garantia_pc, entrada_pc, salida_pc, comentarios_pc
    } = req.body;

    if (!planta_pc || !categoria_pc || !marca_pc || !modelo_pc || !serial_pc) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    try {
        const result = await PCs.addPC({
            planta_pc, categoria_pc, marca_pc, modelo_pc, usuario_pc, serial_pc,
            disponibilidad_pc, almacenamiento_pc, ram_pc, so_pc, procesador_pc,
            monitor_pc, proveedor_pc, fecha_garantia_pc, entrada_pc, salida_pc, comentarios_pc
        });
        // Si tu función addPC retorna el ID, lo puedes enviar así:
        res.status(201).json({ message: "PC agregada correctamente", id: result });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar la PC", error: error.message });
    }
}

export async function getPC(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "Falta el ID de la PC" });
    }

    try {
        const result = await PCs.getPC(id);
        if (!result) {
            return res.status(404).json({ error: "PC no encontrada" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la PC", details: error.message });
    }
}

// Para leer todas las PCs.js con los 4 datos
export async function getAllPCs(req, res) {
    try {
        const results = await PCs.getAllPCs()
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las PCs" });
    }
}


export async function deletePC(req, res) {
    const { id } = req.params;
    try {
        // Asume que tienes una función en el modelo para borrar por id
        await PCs.deletePC(id);
        res.status(200).json({ message: "PC eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la PC", error: error.message });
    }
}