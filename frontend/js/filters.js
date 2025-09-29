/**
 * filters.js
 *
 * Gestisce i filtri applicabili ai report nella pagina reports.html.
 * Sono presenti due tipologie di filtro:
 * 
 * 1. **Filtro per anno**: Permette di selezionare un anno dal menu a tendina e mostra solo il report relativo a quell’anno.
 *
 * 2. **Filtri avanzati**: Utilizzano degli slider per filtrare i report in base a valori numerici e consentono 
 *                         di inviare un payload al backend con i parametri da filtrare. È previsto anche un pulsante 
 *                         per resettare i filtri e mostrare nuovamente tutti i report.
 *
 */


/**
 * Selezione dell’anno dai report
 * Recupera l’elemento <select> dalla pagina, al cambiamento del valore selezionato 
 * viene fatta una chiamata API che restituisce solo il report dell’anno scelto.
 */
const selectedYear = document.getElementById("reports--select-anno");

selectedYear.addEventListener("change", async function ()  {
    const selectedYear = this.value
    
    const data = await filterByYear(selectedYear)
    formatArrayForPagination(data.data) //funzione di reports-pagination.js
    renderAndPaginateReports() //array di oggetti, funzione di reports-pagination.js
})

/**
 * displayYearsInFilter
 *
 * Inserisce dinamicamente nell’elemento <select> tutti gli anni disponibili nel database,
 * ottenuti dal backend.
 *
 * @param {Array} data - Elenco dei report contenente i valori di anno
 */
const displayYearsInFilter = (data) => {
    const container = document.getElementById('reports--select-anno'); // 1- trovo il container dall'id 
    container.innerHTML = ''; // 2- lo svuoto di tutto

    for (report of data) {
        container.innerHTML += `<option value="${report.anno}"> ${report.anno} </option>`
    }
}

/**
 * filterByYear
 *
 * Esegue la chiamata API al backend per ottenere i report filtrati in base all’anno.
 *
 * @param {string} year - L’anno selezionato dall’utente
 * @returns {Object} JSON con i report filtrati
 */
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
 * Selezione dei filtri avanzati:
 * Al click sul pulsante "Applica filtri" raccoglie i valori degli slider, crea un oggetto `payload` 
 * solo con i parametri modificati dall’utente. Se almeno uno slider è stato spostato, 
 * invia il payload al backend tramite la funzione advancedFiltersAPI(). Se nessun filtro è attivo, 
 * ricarica tutti i report dal backend.
 */
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

        showPopupNumbersOfResults(data)
        formatArrayForPagination(data.data) 
        renderAndPaginateReports() 
    } else {
        const data = await fetchReports();
        showPopupNumbersOfResults(data)
        formatArrayForPagination(data.data) 
        displayYearsInFilter(data.data) 
        renderAndPaginateReports() 
    }
    
});

/**
 * advancedFiltersAPI
 *
 * Esegue la chiamata API al backend con il payload dei filtri avanzati e restituisce
 * solo i report che soddisfano i criteri selezionati.
 *
 * @param {Object} payload - Parametri dei filtri avanzati
 * @returns {Object} JSON con i report filtrati
 */
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

/**
 * isSliderMoved
 *
 * Controlla se lo slider è stato spostato rispetto al valore iniziale.
 * @param {HTMLElement} slider - L’elemento <input type="range">
 * @returns {boolean} true se lo slider è stato mosso
 */
function isSliderMoved(slider) {
    return slider.value !== slider.min;
}

/**
 * Event listener per ciascuno slider: se l’utente riporta lo slider al valore minimo,
 * la label associata viene resettata a "-----".
 */

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

/**
 * Reset dei filtri: riporta tutti gli slider al valore iniziale, ripristina 
 * le label di output con "-----" e ricarica tutti i report dal backend.
 */
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

    showPopupNumbersOfResults(data)
    formatArrayForPagination(data.data) 
    displayYearsInFilter(data.data) 
    renderAndPaginateReports() 
})

const showPopupNumbersOfResults = (data) => {
    const popup = document.getElementById("popup")
    popup.textContent = data.data.length + " report trovati"
    popup.classList.add("show");

    // scompare dopo 3 secondi
    setTimeout(() => {
        popup.classList.remove("show");
    }, 3000);
}