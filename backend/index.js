const express = require('express')
const reportRoutes = require('./routes/report-routes') //utilizzo questa variabile per distinguere la logica del server da quella delle routes
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors()); //consente tutte le origini
// oppure specifica solo per il tuo frontend:
// app.use(cors({ origin: 'http://localhost:5500' }))


//quando l'app riceve una richiesta https col prefisso '/reports', reindirizza la richiesta al gestore di rotte 'report-routes'
app.use('/api/reports', reportRoutes) 

// riga di codice per servire i file statici, ossia i report in formato .pdf presenti nella cartella 'reports' saranno accessibili da http://{host}/public/nomefile.pdf


app.use('/public', express.static('./reports/'));

//inizializzazione del server in ascolto sulla porta 3000
app.listen(port, () => {
    console.log('Server in ascolto sulla porta 3000 -> http://localhost:3000')
})