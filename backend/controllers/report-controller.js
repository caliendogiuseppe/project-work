/**
 * file contenente tutte le funzioni utili per la gestione dei report e l'interazione tra database e applicativo backend
 */
const db = require('../utils/db')

const getAllInfo = async () => {
    const QUERY = `SELECT * FROM reports`

    const conn = await db.createConnection()
    const result = await db.executeQuery(conn, QUERY)
    await db.endConnection(conn)

    return result[0]
}

const filterByYear = async (year) => {
    const QUERY = `SELECT * FROM reports WHERE anno = ${year}`

    const conn = await db.createConnection()
    const result = await db.executeQuery(conn, QUERY)
    await db.endConnection(conn)

    return result[0]
}

module.exports = {
    getAllInfo,
    filterByYear
}