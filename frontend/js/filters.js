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


/**
 * FILTRI AVANZATI
 */
// seleziona il bottone di 'applica-filtri' identificato dall'id "btn-apply"
const filterClick = document.getElementById("btn-apply");

filterClick.addEventListener("click", async function () {
    const totalProduction = document.getElementById("produzione_totale").value;
    const netSales = document.getElementById("fatturato_netto").value;
    const employees = document.getElementById("dipendenti").value;
    const co2Emissions = document.getElementById("emissioni-co2").value;
    const waterConsumption = document.getElementById("consumo-acqua").value;

    const payload = {}

    const totalProductionIsMoved = isSliderMoved(document.getElementById("produzione_totale"))
    totalProductionIsMoved ? payload.total_production = totalProduction : ''

    const netSalesIsMoved = isSliderMoved(document.getElementById("fatturato_netto"))
    netSalesIsMoved ? payload.net_sales = netSales : ''

    const emmployeesIsMoved = isSliderMoved(document.getElementById("dipendenti"))
    emmployeesIsMoved ? payload.employees = employees : ''

    const co2EmissionsIsMoved = isSliderMoved(document.getElementById("emissioni-co2"))
    co2EmissionsIsMoved ? payload.co2_emissions = co2Emissions : ''

    const waterConsumptionIsMoved = isSliderMoved(document.getElementById("consumo-acqua"))
    waterConsumptionIsMoved ? payload.water_consumption = waterConsumption : ''

    // se almeno uno slider è stato mosso, fai la chiamata API per il filtro, altrimenti fai chiamata API per tutti i report e blurra il bottone
    if (totalProductionIsMoved || netSalesIsMoved || emmployeesIsMoved || co2EmissionsIsMoved || waterConsumptionIsMoved) {
        const data = await advancedFiltersAPI(payload)

        formatArrayForPagination(data.data) //funzione di reports-pagination.js
        renderAndPaginateReports() //array di oggetti, funzione di reports-pagination.js
    } else {
        const data = await fetchReports();
        formatArrayForPagination(data.data) //funzione di reports-pagination.js
        displayYearsInFilter(data.data) // funzione che mostra nel filtro degli anni, tutti gli anni presi dal db
        renderAndPaginateReports() //array di oggetti, funzione di reports-pagination.js
    }
    
});

const advancedFiltersAPI = async (payload) => {
    try {
        const response = await fetch(CONFIG.HOST + CONFIG.ADVANCED_FILTERS_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

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

// funzione per controllare se lo slider è stato mosso
function isSliderMoved(slider) {
    return slider.value !== slider.min;
}

// funzioni per resettare la label dello slider una volta che torna al valore iniziale
const totalProductionSlider = document.getElementById("produzione_totale")
totalProductionSlider.addEventListener("change", async function ()  {
    if (!isSliderMoved(totalProductionSlider)) {
        document.getElementById("total-production-out").textContent = '-----'
    }
})

const netSalesSlider = document.getElementById("fatturato_netto")
netSalesSlider.addEventListener("change", async function ()  {
    if (!isSliderMoved(netSalesSlider)) {
        document.getElementById("net-sales-out").textContent = '-----'
    }
})

const employeesSlider = document.getElementById("dipendenti")
employeesSlider.addEventListener("change", async function ()  {
    if (!isSliderMoved(employeesSlider)) {
        document.getElementById("employees-out").textContent = '-----'
    }
})

const co2EmissionsSlider = document.getElementById("emissioni-co2")
co2EmissionsSlider.addEventListener("change", async function ()  {
    if (!isSliderMoved(co2EmissionsSlider)) {
        document.getElementById("co2-emissions-out").textContent = '-----'
    }
})

const waterConsumptionSlider = document.getElementById("consumo-acqua")
waterConsumptionSlider.addEventListener("change", async function ()  {
    if (!isSliderMoved(waterConsumptionSlider)) {
        document.getElementById("water-consumption-out").textContent = '-----'
    }
})

// funzione di reset dei filtri al click del bottone
const resetClick = document.getElementById("btn-reset");
resetClick.addEventListener('click', async function () {
    totalProductionSlider.value = totalProductionSlider.min
    netSalesSlider.value = netSalesSlider.min
    employeesSlider.value = employeesSlider.min
    co2EmissionsSlider.value = co2EmissionsSlider.min
    waterConsumptionSlider.value = waterConsumptionSlider.min

    document.getElementById("total-production-out").textContent = '-----'
    document.getElementById("net-sales-out").textContent = '-----'
    document.getElementById("employees-out").textContent = '-----'
    document.getElementById("co2-emissions-out").textContent = '-----'
    document.getElementById("water-consumption-out").textContent = '-----'

    // resetto gli slider, dopodichè rieffettuo la chiamata per ottenere tutti i risultati
    const data = await fetchReports();
    formatArrayForPagination(data.data) //funzione di reports-pagination.js
    displayYearsInFilter(data.data) // funzione che mostra nel filtro degli anni, tutti gli anni presi dal db
    renderAndPaginateReports() //array di oggetti, funzione di reports-pagination.js
})