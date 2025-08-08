// 1. Al caricamento del DOM, esegue la fetch
document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchReports();
    formatArrayForPagination(data.data) //funzione di reports-pagination.js
    displayYearsInFilter(data.data) // funzione che mostra nel filtro degli anni, tutti gli anni presi dal db
    renderAndPaginateReports() //array di oggetti, funzione di reports-pagination.js
});

// chiamata di fecthAll verso il backend
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