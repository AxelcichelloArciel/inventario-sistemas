// config/database.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const db = await open({
    filename: './db.sqlite',
    driver: sqlite3.Database
});

// Crear la tabla si no existe (adaptado a async/await)
await db.exec(`
    CREATE TABLE IF NOT EXISTS pcs (
                                       id_pc INTEGER PRIMARY KEY AUTOINCREMENT,
                                       planta_pc TEXT,
                                       categoria_pc TEXT,
                                       marca_pc TEXT,
                                       modelo_pc TEXT,
                                       usuario_pc TEXT,
                                       serial_pc TEXT,
                                       disponibilidad_pc TEXT,
                                       almacenamiento_pc TEXT,
                                       ram_pc TEXT,
                                       so_pc TEXT,
                                       procesador_pc TEXT,
                                       monitor_pc TEXT,
                                       proveedor_pc TEXT,
                                       fecha_garantia_pc TEXT,
                                       entrada_pc TEXT,
                                       salida_pc TEXT,
                                       comentarios_pc TEXT
    )
`);

export default db;
