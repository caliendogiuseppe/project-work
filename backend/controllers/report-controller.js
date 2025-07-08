/**
 * file contenente tutte le funzioni utili per la gestione dei report e l'interazione tra database e applicativo backend
 */
const db = require('../utils/db')

const getAllInfo = async () => {
    const conn = await db.createConnection()
    const result = await db.executeQuery(conn, 'SELECT * FROM reports')

    return result[0]
}

module.exports = {
    getAllInfo
}