// db.js
import mysql from 'mysql2/promise';

let connection = null;

export async function getDatabaseConnection() {
    // Check if connection exists and is still open
    if (!connection || connection.connection._closing) {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        // Optional: handle disconnection errors
        connection.on('error', (err) => {
            console.error('MySQL error', err);
            connection = null;
        });
    }
    return connection;
}