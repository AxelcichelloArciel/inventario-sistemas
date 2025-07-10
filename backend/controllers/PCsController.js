import db from '../config/database.js';
import * as PCs from '../model/PCs.js';

// Para agregar una PC con 4 datos
export async function addPC(req, res) {
    const {nombre, estado, marca, modelo} = req.body;

    if (!nombre || !estado || !marca || !modelo) {
        return res.status(400).json({error: "Faltan campos obligatorios"});
    }

    try {
        PCs.addPC({nombre, estado, marca, modelo});
        res.status(200).json({message: "PC agregada (no se puede obtener el ID con el modelo actual)"});
    } catch (error) {
        res.status(500).json({message: "Error al agregar la PC", error: error.message});
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