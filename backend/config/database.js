// config/database.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const db = await open({
    filename: './db.sqlite',
    driver: sqlite3.Database
});

await db.exec(`
    CREATE TABLE IF NOT EXISTS pcs (
                                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                                       nombre TEXT,
                                       estado TEXT,
                                       marca TEXT,
                                       modelo TEXT
    )
`);

export default db;
