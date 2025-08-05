const mysql = require('mysql2/promise');
require('dotenv').config()

// funzione per creare la connessione al db e restituire l'istanza della connessione
const createConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT || 3306
        });

        return connection

    } catch(err) {
        console.log("errore di connessione lol " + err)
        return {
            error: 500,
            description: err
        }
    }
}

// funzione per eseguire le query inviate come parametro e restituirle
const executeQuery = async (conn, query) => {
    const result = await conn.query(query)

    return result
}   

const endConnection = async (connection) => {
    connection.end()
}

module.exports = {
    createConnection, 
    executeQuery,
    endConnection
};