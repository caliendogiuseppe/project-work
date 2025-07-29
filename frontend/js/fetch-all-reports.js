const HOST = "http://localhost:3000"
const FETCH_ALL_URL = "/api/reports/"

// 1. Al caricamento del DOM, esegue la fetch
document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchReports();
    formatArrayForPagination(data.data) //funzione di reports-pagination.js
    displayDatesInFilter(data.data)
    renderAndPaginateReports() //array di oggetti, funzione di reports-pagination.js
});

// chiamata di fecthAll verso il backend
const fetchReports = async () => {
    try {
        const response = await fetch(HOST + FETCH_ALL_URL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

const displayDatesInFilter = (data) => {
    const container = document.getElementById('reports--select-anno'); // 1- trovo il container dall'id 
    container.innerHTML = ''; //2- lo svuoto di tutto

    for (report of data) {
        container.innerHTML += `<option value="${report.anno}"> ${report.anno} </option>`
    }
}