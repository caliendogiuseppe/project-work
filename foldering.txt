# project-work
Project work - website for the download of sustainability reports



/project-work
│
├── frontend/
│		│
│		├── index.html               #  Home page CON OVERVIEW AZIENDA FERRERO
│		├── sostenibilita.html       #  Pagina "Obiettivi per la sostenibilità" con impegno sulla sostenibilità
│		├── reports.html             #  Pagina per il download e il filtraggio dei report
│		│
│		├── css/
│		│   └── style.css           # CSS globale per tutte le pagine
│		│   
│		│
│		├── js/
│		│   ├── fetch-all-reports.js           # Esegue la chiamata API al backend per estrapolare le informazioni di tutti i report
|       │   ├── config.js                      # File di configurazione del frontend
|       │   ├── filters.js                     # Gestisce i filtri applicabili ai report nella pagina reports.html
|       │   ├── reports-pagination.js          # Gestisce l’impaginazione e la visualizzazione dei report nella pagina reports.html
|       │   └── reports-sorting.js             # Gestisce le operazioni di ordinamento dei report
│		│
│		└── assets/
│				├── img/              # Immagini statiche usate nel sito
│	    		└── videos/           # Video statici usati nel sito
│	    		
│	    	 
│
├── backend/
│   	├── index.js	                    # Punto di ingresso principale dell'applicazione backend Node.js/Express.
│   	├── routes/
│		│		└── report-routes.js	    # File nel quale sono contenute le rotte destinate alla gestione/estrapolazione dei report
│		│
│   	├── controllers/			        
|       |      └── report-controller.js     # File contenente tutte le funzioni utili per la gestione dei report e l'interazione tra database e applicativo backend
|       |
│   	├── utils/				            
│       │      └── db.js                    # File per la gestione della connessione e interazione backend-db
|       |
│   	├── package.json
│   	├── reports/ 				        # cartella in cui sono contenuti i reports, nominati secondo l'anno di redazione
│   	└── node_modules/
│
├── README.md
└── .gitignore