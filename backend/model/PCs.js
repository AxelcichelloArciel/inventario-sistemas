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
    // Supón que ya tienes importado sqlite3 y la conexión db creada

    const { nombre, estado, marca, modelo } = data;
    db.run(
        'INSERT INTO pcs (nombre, estado, marca, modelo) VALUES (?, ?, ?, ?)',
        [nombre, estado, marca, modelo],
        function(err) {
            if (err) {
                console.error('Error al insertar:', err.message);
                return;
            }
            console.log('PC agregada con ID:', this.lastID);
        }
    )
}