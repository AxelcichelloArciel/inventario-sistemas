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
        comentarios_pc,
        estado_pc
    } = req.body;

    if (!planta_pc || !categoria_pc || !marca_pc || !modelo_pc || !serial_pc) {
        return res.status(400).json({error: "Faltan campos obligatorios"});
    }

    try {
        const existente = await PCs.getPCBySerial(serial_pc);
        if (existente) {
            return res.status(400).json({ error: "El número de serie ya existe." });
        }

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
            comentarios_pc,
            estado_pc
        });

        await EmailService.sendAltaPC(req.body);

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

export async function getAllPCs(req, res) {
    try {
        const results = await PCs.getAllPCs();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({error: "Error al obtener las PCs"});
    }
}

export async function deletePC(req, res) {
    const {id} = req.params;
    try {
        await PCs.deletePC(id);
        res.status(200).json({message: "PC eliminada correctamente"});
    } catch (error) {
        res.status(500).json({message: "Error al eliminar la PC", error: error.message});
    }
}

export async function updatePC(req, res) {
    const { id } = req.params;

    if (req.body.disaffect) {
        try {
            const pcDeBaja = await PCs.getPC(id);
            const usuarioBaja = pcDeBaja.usuario_pc;
            pcDeBaja.disponibilidad_pc = "true";
            pcDeBaja.usuario_pc = "";

            // Validar serial solo si cambia
            const existente = await PCs.getPCBySerial(pcDeBaja.serial_pc);
            if (existente && existente.id_pc != id) {
                return res.status(400).json({ error: "El número de serie ya existe." });
            }

            await PCs.updatePC(id, pcDeBaja);
            await EmailService.sendDesvinculacionPCUsuario(
                usuarioBaja,
                pcDeBaja.marca_pc,
                pcDeBaja.modelo_pc,
                pcDeBaja.serial_pc
            );
            return res.status(200).json({ message: "PC desafectada correctamente" });
        } catch (error) {
            return res.status(500).json({ message: "Error al dar de baja la PC del usuario", error: error.message });
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
        comentarios_pc,
        estado_pc
    } = req.body;

    if (!id || !planta_pc || !categoria_pc || !marca_pc || !modelo_pc || !serial_pc) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    try {
        // Validar que el serial no esté repetido en otra PC
        const existente = await PCs.getPCBySerial(serial_pc);
        if (existente && existente.id_pc != id) {
            return res.status(400).json({ error: "El número de serie ya existe." });
        }

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
            comentarios_pc,
            estado_pc
        });
        res.status(200).json({ message: "PC actualizada correctamente", id: result });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la PC", error: error.message });
    }
}