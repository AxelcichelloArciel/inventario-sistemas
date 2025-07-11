import db from '../config/database.js';

export async function getAllPCs() {
    const query = 'SELECT * FROM pcs';

    try {
        const results = await db.all(query);
        return results;
    } catch (error) {
        throw error;
    }
}

export async function getPC(id) {
    const query = 'SELECT * FROM pcs WHERE id_pc = ?';

    try {
        const result = await db.get(query, [id]);
        return result;
    } catch (error) {
        throw error;
    }
}


export async function addPC(data) {
    const query = `
        INSERT INTO pcs (
            planta_pc, categoria_pc, marca_pc, modelo_pc, usuario_pc, serial_pc,
            disponibilidad_pc, almacenamiento_pc, ram_pc, so_pc, procesador_pc,
            monitor_pc, proveedor_pc, fecha_garantia_pc, entrada_pc, salida_pc, comentarios_pc
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        data.planta_pc, data.categoria_pc, data.marca_pc, data.modelo_pc, data.usuario_pc, data.serial_pc,
        data.disponibilidad_pc, data.almacenamiento_pc, data.ram_pc, data.so_pc, data.procesador_pc,
        data.monitor_pc, data.proveedor_pc, data.fecha_garantia_pc, data.entrada_pc, data.salida_pc, data.comentarios_pc
    ];

    const result = await db.run(query, values);
    return result.lastID;
}


export async function deletePC(id) {
    const query = "DELETE FROM pcs WHERE id_pc = ?";
    await db.run(query, [id]);
}