let currentPage = 1
let formattedArray = []
const HOST = "http://localhost:3000"
const FETCH_ALL_URL = "/api/reports/"
const STATIC_FOLDER_URL ="/public/"

// 1. Al caricamento del DOM, esegui la fetch
document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchReports();
    formatArrayForPagination(data.data) 

    renderAndPaginateReports(formattedArray) //array di oggetti
    
});

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

const formatArrayForPagination = (data) => {
    let actualPage = 1;
    const elementsPerPage = 6;

    formattedArray = [
        {
            page: actualPage,
            items: []
        }
    ]

    for(report of data) {
        if (formattedArray[actualPage - 1].items.length >= elementsPerPage) {
            actualPage ++

            formattedArray.push({
                page: actualPage,
                items: []
            })
        } 

        formattedArray[actualPage - 1].items.push(report)
    }
}

const renderAndPaginateReports = () => {
    const container = document.getElementById('reports-container'); // 1- trovo il container dall'id (in seguito al suo interno inserirò le card figlie)
    container.innerHTML = ''; //2- lo svuoto di tutto
    
    for (item of formattedArray) { //formattedArray a questo punto è [ { page:1, items: [....] } , { page:2, items:[...] } ]
        if (item.page == currentPage) {
            for (report of item.items) {
                const card = document.createElement('div'); // 3- creo il div della card (il figlio del container)
                card.className = 'report-card'; //  4- assegno la classe al div della card
                card.innerHTML = `
                    <div class="report-card--year">
                        <h2>${report.anno}</h2>
                    </div>

                    <div class="report-card--title">
                        <h3>${report.titolo}</h3>
                    </div>

                    <div class="report-card--values">
                        <ul class="report-values-list">
                            <li><span class="label">Produzione totale:</span> <span class="value">${report.produzione_totale} t</span></li>
                            <li><span class="label">Fatturato netto:</span> <span class="value">${report.fatturato_netto} M€</span></li>
                            <li><span class="label">Dipendenti:</span> <span class="value">${report.dipendenti}</span></li>
                            <li><span class="label">Emissioni CO₂:</span> <span class="value">${report.emissioni_co2} t</span></li>
                            <li><span class="label">Consumo acqua:</span> <span class="value">${report.consumo_acqua_totale} m³</span></li>
                        </ul>
                    </div>

                    <div class="report-card--actions">
                        
                        <!-- svg per visualizzare-->
                        <a href="${HOST + STATIC_FOLDER_URL + report.filename}" target="_blank">
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </a>
                        
                        <!-- link per scaricare-->
                        <a href="${HOST + STATIC_FOLDER_URL + report.filename}" download="${report.filename}">
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z" fill="#1C274C"/>
                                <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill="#1C274C"/>
                            </svg>
                        </a>

                    </div>
                `;
                container.appendChild(card) // 5- faccio l'append del figlio al container
            }           
        }  
    }

    let onCurrentPageId
    const paginationLinksContainer = document.createElement('div'); 
    paginationLinksContainer.className = 'pagination-links--container'; 
    paginationLinksContainer.id = 'pagination-links--container';
    paginationLinksContainer.innerHTML = `
        <a href="" onclick="previousPage(); return false;"> <h4> < </h4> </a> `;
    
    
    for (item of formattedArray) {
        item.page == currentPage ? onCurrentPageId = ` id = "h4-current-page"` : onCurrentPageId = ``
        paginationLinksContainer.innerHTML += `<a href="" onclick="changePage(${item.page}); return false;" > <h4 ${onCurrentPageId}> ${item.page} </h4> </a> `;
    }

    paginationLinksContainer.innerHTML += `<a href="" onclick="nextPage(); return false;"> <h4> > </h4> </a>`

    container.appendChild(paginationLinksContainer)
}

// funzione per andare alla pagina successiva
const nextPage = () => {
    if (currentPage < formattedArray.length) {
        currentPage ++;
    }
    
    renderAndPaginateReports()
}

// funzione per andare alla pagina precedente
const previousPage = () => {
    if (currentPage > 1) {
        currentPage --;
    }

    renderAndPaginateReports()
}

// funzione per andare alla pagina passata come parametro (viene utilizzata al click sui numeri dell'impaginazione)
const changePage = (page = 1) => {
    currentPage = page;
    renderAndPaginateReports()
}