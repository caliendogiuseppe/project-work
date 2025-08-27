/**
 * reports-sorting.js
 * 
 * File dedicato alla gestione delle operazioni di ordinamento dei report.
 * Consente all'utente di scegliere un criterio di ordinamento (anno, fatturato, 
 * dipendenti, ecc.) e la direzione (crescente/decrescente). 
 * L'ordinamento è applicato direttamente all'array dei report già recuperato 
 * dal backend e, successivamente, viene aggiornata la paginazione.
 */


// Variabili globali per memorizzare l'ultimo stato di ordinamento
let prevOrderResults
let prevSortDirection

/**
 * Listener sugli elementi <select> del DOM.
 * - Se cambia l'elemento con id "order-results" → aggiorna il criterio di ordinamento.
 * - Se cambia l'elemento con id "incr-decr" → aggiorna la direzione (crescente/decrescente).
 * In entrambi i casi viene richiamata la funzione sortAndFormatArray().
 */
document.addEventListener("change", (e) => {
    let value
    let sortDirection
    if (e.target.id === "order-results") {
        value = e.target.value
        sortDirection = document.getElementById("incr-decr").value

        prevSortDirection = sortDirection
        prevOrderResults = value

        sortAndFormatArray(value, sortDirection)
        keepOptionsStatus()
    }
    if (e.target.id === 'incr-decr') {
        value = document.getElementById("order-results").value
        sortDirection = e.target.value;

        prevSortDirection = sortDirection
        prevOrderResults = value

        sortAndFormatArray(value, sortDirection)
        keepOptionsStatus()
    }
    
});

/**
 * sortAndFormatArray(value, sortDirection)
 * 
 * Esegue l'ordinamento dell'array globale `reports` sulla base del criterio selezionato.
 * Una volta ordinati i dati, richiama le funzioni di paginazione per aggiornare l'interfaccia.
 */
const sortAndFormatArray = (value, sortDirection) => {
    switch(value) {
        case 'year':
            if (sortDirection == 'incr') {
                reports.sort((a, b) => a.anno - b.anno);
            } else {
                reports.sort((a, b) => b.anno - a.anno);
            }
            break;
        case 'total-production':
            if (sortDirection == 'incr') {
                reports.sort((a, b) => a.produzione_totale - b.produzione_totale);
            } else {
                reports.sort((a, b) => b.produzione_totale - a.produzione_totale);
            }
            break;
        case 'net-sales':
            if (sortDirection == 'incr') {
                reports.sort((a, b) => a.fatturato_netto - b.fatturato_netto);
            } else {
                reports.sort((a, b) => b.fatturato_netto - a.fatturato_netto);
            }
            break;
        case 'employees':
            if (sortDirection == 'incr') {
                reports.sort((a, b) => a.dipendenti - b.dipendenti);
            } else {
                reports.sort((a, b) => b.dipendenti - a.dipendenti);
            }
            break;
        case 'co2-emissions':
            if (sortDirection == 'incr') {
                reports.sort((a, b) => a.emissioni_co2 - b.emissioni_co2);
            } else {
                reports.sort((a, b) => b.emissioni_co2 - a.emissioni_co2);
            }
            break;
        case 'water-consumption':
            if (sortDirection == 'incr') {
                reports.sort((a, b) => a.consumo_acqua_totale - b.consumo_acqua_totale);
            } else {
                reports.sort((a, b) => b.consumo_acqua_totale - a.consumo_acqua_totale);
            }
            break;
    }

    // Aggiornamento della paginazione dopo l'ordinamento
    formatArrayForPagination(reports)
    renderAndPaginateReports()
}

/**
 * keepOptionsStatus()
 * 
 * Mantiene salvata la scelta dell’utente riguardo il criterio di ordinamento e la direzione.
 * In questo modo se i dati vengono ricaricati o la pagina aggiornata,
 * le opzioni restano coerenti con l'ultimo stato selezionato.
 */
const keepOptionsStatus = () => {
    let orderResults = document.getElementById('order-results');
    orderResults.value = prevOrderResults != null ? prevOrderResults : 'year'
    sortDirection = document.getElementById('incr-decr');
    sortDirection.value = prevSortDirection != null ? prevSortDirection : 'incr'
}