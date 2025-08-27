/**
 * fetch-all-reports.js
 *
 * Gestisce il recupero di tutti i report dal backend tramite chiamata API.
 * I dati ottenuti vengono utilizzati per la visualizzazione e 
 * la paginazione all’interno della pagina reports.html.
 */


/**
 * Evento DOMContentLoaded
 *
 * Viene eseguito automaticamente quando la pagina reports.html è stata caricata
 * e il DOM è pronto. Al suo interno:
 *  - richiama la funzione fetchReports() per ottenere i dati dei report dal backend,
 *  - formatta l’array di report per consentire la paginazione (reports-pagination.js),
 *  - popola il filtro "anni" con i valori recuperati dal database,
 *  - avvia il rendering iniziale con la paginazione dei report.
 */
document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchReports();
    formatArrayForPagination(data.data) 
    displayYearsInFilter(data.data) 
    renderAndPaginateReports()
});


/**
 * fetchReports
 * Esegue la chiamata API al backend per ottenere la lista completa dei report.
 */
const fetchReports = async () => {
    try {
        const response = await fetch(CONFIG.HOST + CONFIG.API_REPORTS_URL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        currentPage = 1
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);

        return {
            "result": -1,
            "error": error.message,
            "data": []
        }
    }
}