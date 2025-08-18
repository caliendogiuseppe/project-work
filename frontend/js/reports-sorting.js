let prevOrderResults
let prevSortDirection

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

    formatArrayForPagination(reports)
    renderAndPaginateReports()
}

const keepOptionsStatus = () => {
    let orderResults = document.getElementById('order-results');
    orderResults.value = prevOrderResults != null ? prevOrderResults : 'year'
    sortDirection = document.getElementById('incr-decr');
    sortDirection.value = prevSortDirection != null ? prevSortDirection : 'incr'
}