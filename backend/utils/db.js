const mysql = require('mysql2/promise');
const HOST = 'localhost'
const USER = 'root'
const DB = 'ferrero'

// funzione per creare la connessione al db e restituire l'istanza della connessione
const createConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: HOST,
            user: USER,
            database: DB,
            password: 'root',
            port: 3306
        });

        return connection

    } catch(err) {
        console.log(err)
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

module.exports = {
    createConnection, executeQuery
};