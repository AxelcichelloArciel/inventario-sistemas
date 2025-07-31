import db from '../config/database.js';

export async function getAllInsumos(req, res) {
    const query = 'SELECT * FROM insumos';

    try {
        const results = await db.all(query);
        return results;
    } catch (error) {
        throw error;
    }
}

export async function getInsumo(id) {
    const query = 'SELECT * FROM insumos WHERE id_insumo = ?'

    try {
        const result = await db.get(query, [id]);
        return result;
    } catch (error) {
        throw error;
    }
}

export async function deleteInsumo(id) {
    const query = 'DELETE FROM insumos WHERE id_insumo = ?';

    try {
        const result = await db.run(query, [id]);
        return result;
    } catch (error) {
        throw error;
    }
}

export async function consumirInsumo(id, cantidad) {
    const insumo = await db.get('SELECT * FROM insumos WHERE id_insumo = ?', [id]);
    if (!insumo) throw new Error('Insumo no encontrado');
    if (insumo.cantidad < cantidad) throw new Error('Cantidad supera limites del stock');

    //actualizar la cantidad del insumo

    await db.run('UPDATE insumos SET cantidad = cantidad - ? WHERE id_insumo = ?', [cantidad, id]);
    return true;
}