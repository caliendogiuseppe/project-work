const express = require('express')
const router = express.Router()
const reportController = require('../controllers/report-controller')

/**
 * GET /
 * Recupera tutti i report presenti nel database tramite il controller.
 * 
 * @returns {Object} JSON contenente:
 *  - data: array di report
 *  - status: status code HTTP
 */
router.get('/', async (req, res) => {
    const reports = await reportController.getAllInfo()
    res.send( { data: reports, status: 200} )
})

/**
 * GET /:year
 * Recupera tutti i report filtrati per anno specificato.
 * 
 * @param {string|number} req.params.year Anno dei report da recuperare
 * @returns {Object} JSON contenente:
 *  - data: array di report dell'anno specificato
 *  - status: status code HTTP
 */
router.get('/:year', async (req, res) => {
    const report = await reportController.filterByYear(req.params.year)
    res.send( { data: report, status: 200} )
})

/**
 * POST /filters
 * Recupera i report applicando filtri avanzati ricevuti nel body della richiesta.
 * 
 * @param {Object} req.body Oggetto contenente i filtri opzionali
 * @returns {Object} JSON contenente:
 *  - data: array di report filtrati
 *  - status: status code HTTP
 */
router.post('/filters', async (req, res) => {
    const reports = await reportController.advancedFilters(req.body)
    res.send( { data: reports, status: 200} )
})

//export dela costante 'router' in modo che sia visibile all'interno di index.js
module.exports = router