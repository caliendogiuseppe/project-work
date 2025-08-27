
/**
 * config.js
 *
 * File di configurazione del frontend.
 * Contiene gli endpoint e i percorsi principali utilizzati per stabilire
 * la comunicazione con il backend e per la gestione delle risorse statiche.
 * 
 */
const CONFIG = {
    // URL base del backend (varia tra ambiente locale e produzione)
    HOST: "https://project-work-32j4.onrender.com", //https://project-work-32j4.onrender.com http://localhost:3000

    // Endpoint per ottenere la lista completa dei report
    API_REPORTS_URL: "/api/reports/",

    // Percorso della cartella dei file statici (immagini, CSS, JS)
    STATIC_FOLDER_URL: "/public/",

    // Endpoint per scaricare direttamente un report (utilizzato nelle card della pagina reports.html)
    DIRECT_DONWLOAD_URL: "/download/",

    // Endpoint per filtrare i report in base a criteri avanzati (es. anno, tema, ecc.)
    ADVANCED_FILTERS_URL: "/api/reports/filters/"
}