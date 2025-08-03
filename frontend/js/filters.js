/**
 * FILTRO IN BASE ALL'ANNO
 */
// seleziono la <select> con le option all'interno
const selectedYear = document.getElementById("reports--select-anno");

// all'evento di change del filtro dell'anno faccio partire la chiamata API per il filtro
selectedYear.addEventListener("change", async function ()  {
    const selectedYear = this.value
    
    const data = await filterByYear(selectedYear)
    formatArrayForPagination(data.data) //funzione di reports-pagination.js
    renderAndPaginateReports() //array di oggetti, funzione di reports-pagination.js
})

// filtro in base all'anno: mostro i risultati degli anni nell option del filtro in basee agli anni presenti nel db
const displayYearsInFilter = (data) => {
    const container = document.getElementById('reports--select-anno'); // 1- trovo il container dall'id 
    container.innerHTML = ''; //2- lo svuoto di tutto

    for (report of data) {
        container.innerHTML += `<option value="${report.anno}"> ${report.anno} </option>`
    }
}

// funzione che effettua la chiamata API per filtrare i report in base all'anno
const filterByYear = async (year) => {
    try {
        const response = await fetch(CONFIG.HOST + CONFIG.API_REPORTS_URL + year);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}



/**
 * FILTRI AVANZATI
 */