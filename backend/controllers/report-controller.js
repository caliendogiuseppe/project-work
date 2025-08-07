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

const advancedFilters = async (data) => {
    let QUERY = `SELECT * FROM reports WHERE`
    QUERY += (data.total_production !== 'undefined') ? ` produzione_totale <= ${data.total_production} AND` : ``
    QUERY += (data.net_sales !== 'undefined') ? ` fatturato_netto <= ${data.net_sales} AND` : ``
    QUERY += (data.employees !== 'undefined') ? ` dipendenti <= ${data.employees} AND` : ``
    QUERY += (data.co2_emissions !== 'undefined') ? ` emissioni_co2 <= ${data.co2_emissions} AND` : ``
    QUERY += (data.water_consumption !== 'undefined') ? ` consumo_acqua_totale <= ${data.water_consumption} AND` : ``

    // se termina con 'AND', cancello l'ultima parola
    let queryArray = QUERY.split(" ")
    if (queryArray[queryArray.length - 1] == 'AND') {
        queryArray.splice(queryArray.length - 1)
    } 

    QUERY = queryArray.join(' ')
    console.log(QUERY)
    const conn = await db.createConnection()
    const result = await db.executeQuery(conn, QUERY)
    await db.endConnection(conn)

    console.log(result[0])
    return result[0]
}

module.exports = {
    getAllInfo,
    filterByYear,
    advancedFilters
}