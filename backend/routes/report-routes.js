const express = require('express')
const router = express.Router()
const reportController = require('../controllers/report-controller')

//rotta che, dopo aver recuperato grazie al controller 'report-controller.js' tutti i dati di tutti i report, li restituisce
router.get('/', async (req, res) => {
    const reports = await reportController.getAllInfo()
    res.send( { data: reports, status: 200} )
})

//export dela costante 'router' in modo che sia visibile all'interno di index.js
module.exports = router