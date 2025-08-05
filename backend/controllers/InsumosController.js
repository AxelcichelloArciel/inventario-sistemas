// backend/controllers/InsumosController.js
import * as Insumo from '../model/Insumo.js';

export const getAllInsumos = async (req, res) => {
    try {
        const insumos = await Insumo.getAllInsumos();
        res.status(200).json(insumos);

    } catch (error) {
        console.error("Error al obtener insumos:", error);
        return res.status(500).json({error: "Error al obtener insumos"});
    }
};

export const addInsumo = async (req, res) => {
    try{
        const {categoria, insumo, marca, almacenamiento, observaciones, cantidad} = req.body;

        if (!categoria || !insumo || !marca || !almacenamiento || !cantidad) {
            return res.status(400).json({error: "Faltan datos requeridos"});
        }
        if (cantidad <= 0) {
            return res.status(400).json({error: "La cantidad debe ser mayor a cero"});
        }
        const result = await Insumo.addInsumo({categoria, insumo, marca, almacenamiento, observaciones, cantidad});

        res.status(201).json({message: "Insumo agregado correctamente", id: result});
    } catch (error) {
        res.status(500).json({error: "Error al agregar insumo", details: error.message});
    }
}

export const consumirInsumo = async (req, res) => {
    const {id} = req.params;
    const {cantidad} = req.body;

    if (!cantidad || cantidad <= 0) {
        return res.status(400).json({error: "Cantidad inválida"});
    }

    try {
        await Insumo.consumirInsumo(id, cantidad);
        res.status(200).json({message: "Insumo consumido correctamente"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

export const deleteInsumo = async (req, res) => {
    const {id} = req.params;
    try {
        const insumo = await Insumo.getInsumo(id);
        if (!insumo) {
            return res.status(404).json({error: "Insumo no encontrado"});
        }

        await Insumo.deleteInsumo(id);
        res.status(200).json({message: "Insumo eliminado correctamente"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}