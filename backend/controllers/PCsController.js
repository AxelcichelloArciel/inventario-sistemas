import db from '../config/database.js';
import * as PCs from '../model/PCs.js';
import nodemailer from 'nodemailer';
import EmailService from "../services/emailService.js";

export async function addPC(req, res) {
    const {
        planta_pc,
        categoria_pc,
        marca_pc,
        modelo_pc,
        usuario_pc,
        serial_pc,
        disponibilidad_pc,
        almacenamiento_pc,
        ram_pc,
        so_pc,
        procesador_pc,
        monitor_pc,
        proveedor_pc,
        fecha_garantia_pc,
        entrada_pc,
        salida_pc,
        comentarios_pc
    } = req.body;

    console.log(disponibilidad_pc)

    if (!planta_pc || !categoria_pc || !marca_pc || !modelo_pc || !serial_pc) {
        return res.status(400).json({error: "Faltan campos obligatorios"});
    }

    try {
        const result = await PCs.addPC({
            planta_pc,
            categoria_pc,
            marca_pc,
            modelo_pc,
            usuario_pc,
            serial_pc,
            disponibilidad_pc,
            almacenamiento_pc,
            ram_pc,
            so_pc,
            procesador_pc,
            monitor_pc,
            proveedor_pc,
            fecha_garantia_pc,
            entrada_pc,
            salida_pc,
            comentarios_pc
        });


        await EmailService.sendAltaPC(req.body)

        // Si tu función addPC retorna el ID, lo puedes enviar así:
        res.status(201).json({message: "PC agregada correctamente", id: result});
    } catch (error) {
        res.status(500).json({message: "Error al agregar la PC", error: error.message});
    }
}

export async function getPC(req, res) {
    const {id} = req.params;
    if (!id) {
        return res.status(400).json({error: "Falta el ID de la PC"});
    }

    try {
        const result = await PCs.getPC(id);
        if (!result) {
            return res.status(404).json({error: "PC no encontrada"});
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({error: "Error al obtener la PC", details: error.message});
    }
}

// Para leer todas las PCs.js con los 4 datos
export async function getAllPCs(req, res) {
    try {
        const results = await PCs.getAllPCs()
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({error: "Error al obtener las PCs"});
    }
}


export async function deletePC(req, res) {
    const {id} = req.params;
    try {
        // Asume que tienes una función en el modelo para borrar por id
        await PCs.deletePC(id);
        res.status(200).json({message: "PC eliminada correctamente"});
    } catch (error) {
        res.status(500).json({message: "Error al eliminar la PC", error: error.message});
    }
}


export async function updatePC(req, res) {
    console.log(req.params.length)
    const {id} = req.params;

    if(req.body.disaffect){
        try{
            const pcDeBaja = await PCs.getPC(id);
            pcDeBaja.disponibilidad_pc = true;
            pcDeBaja.usuario_pc = null;

            await PCs.updatePC(id, pcDeBaja);
        }catch (error) {
            return res.status(500).json({message: "Error al dar de baja la PC del usuario", error: error.message});
        }
    }
    const {
        planta_pc,
        categoria_pc,
        marca_pc,
        modelo_pc,
        usuario_pc,
        serial_pc,
        disponibilidad_pc,
        almacenamiento_pc,
        ram_pc,
        so_pc,
        procesador_pc,
        monitor_pc,
        proveedor_pc,
        fecha_garantia_pc,
        entrada_pc,
        salida_pc,
        comentarios_pc
    } = req.body;

    if (!id || !planta_pc || !categoria_pc || !marca_pc || !modelo_pc || !serial_pc) {
        return res.status(400).json({error: "Faltan campos obligatorios"});
    }

    try {
        const result = await PCs.updatePC(id, {
            planta_pc,
            categoria_pc,
            marca_pc,
            modelo_pc,
            usuario_pc,
            serial_pc,
            disponibilidad_pc,
            almacenamiento_pc,
            ram_pc,
            so_pc,
            procesador_pc,
            monitor_pc,
            proveedor_pc,
            fecha_garantia_pc,
            entrada_pc,
            salida_pc,
            comentarios_pc
        });
        res.status(200).json({message: "PC actualizada correctamente", id: result});
    } catch (error) {
        res.status(500).json({message: "Error al actualizar la PC", error: error.message});
    }
}