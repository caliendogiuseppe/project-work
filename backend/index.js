const express = require('express')
const reportRoutes = require('./routes/report-routes') //utilizzo questa variabile per distinguere la logica del server da quella delle routes
const cors = require('cors')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000;

/**
 * Middleware CORS
 * Consente richieste da tutte le origini.
 * Per limitare a specifici domini, si può passare un oggetto { origin: '...' }
 */
app.use(cors({ origin: 'https://project-work-frontend.onrender.com/' })); //app.use(cors({ origin: 'http://localhost:5500' }))

/**
 * Middleware per il parsing del body in formato JSON
 * Necessario per leggere i dati inviati tramite POST
 */
app.use(express.json()); 


/**
 * API routes
 * Tutte le richieste con prefisso '/api/reports' vengono gestite dal router reportRoutes
 */
app.use('/api/reports', reportRoutes) 

/**
 * Servizio dei file statici
 * Tutti i file PDF nella cartella 'reports' saranno accessibili tramite
 * http://{host}/public/nomefile.pdf
 */
app.use('/public', express.static('./reports/'));

/**
 * GET /download/:filename
 * Permette di scaricare direttamente un file PDF invece di aprirlo inline
 * 
 * @param {string} req.params.filename - Nome del file da scaricare
 */
app.get('/download/:filename', async (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'reports', filename);
    res.download(filePath, filename, (err) => {
        if (err) {
            console.error('Errore nel download:', err);
            res.sendStatus(500);
        }
    });
})

/**
 * Avvio del server Express
 */
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`)
})