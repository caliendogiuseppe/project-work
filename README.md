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
│		│   └── fetch-all-reports.js           # codice Javascript che esegue la chiamata API al backend per estrapolare le informazioni di tutti i report
│		│
│		└── assets/
│				├── img/              # Immagini statiche usate nel sito
│	    		└── videos/           # Video statici usati nel sito
│	    		
│	    	 
│
├── backend/
│   	├── index.js	                    # punto di ingresso principale dell'applicazione backend Node.js/Express.
│   	├── routes/
│		│		└── report-routes.js	    # file nel quale sono contenute le rotte destinate alla gestione/estrapolazione dei report
│		│
│   	├── controllers/			        # i controller necessari contenenti la logica computazionale che viene eseguita quando viene ricevuta una richiesta
|       |      └── report-controller.js 
│   	├── utils/				            # contiene le funzioni comuni e evita duplicazione del codice
│       │      └── db.js                    # file per la gestione della connessione e interazione backend-db
│   	├── package.json
│   	├── reports/ 				        # cartella in cui sono contenuti i reports, nominati secondo l'anno di redazione
│   	└── node_modules/
│
├── README.md
└── .gitignore