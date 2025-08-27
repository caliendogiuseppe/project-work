const mysql = require('mysql2/promise');
require('dotenv').config()


/**
 * Crea e restituisce una connessione al database MySQL.
 * 
 * @returns {Promise<Object>} Connessione al database se riuscita, altrimenti un oggetto con errore e descrizione
 */
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

/**
 * Esegue una query SQL sulla connessione fornita.
 * 
 * @param {Object} conn Connessione MySQL creata tramite createConnection
 * @param {string} query Query SQL da eseguire
 * @returns {Promise<Array>} Risultato della query (array di righe e metadata)
 */
const executeQuery = async (conn, query) => {
    const result = await conn.query(query)

    return result
}   

/**
 * Chiude la connessione al database.
 * 
 * @param {Object} connection - Connessione MySQL da chiudere
 */
const endConnection = async (connection) => {
    connection.end()
}

// esportazione delle funzioni per l'utilizzo in altri moduli
module.exports = {
    createConnection, 
    executeQuery,
    endConnection
};