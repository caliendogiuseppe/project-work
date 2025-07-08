# project-work
Project work - website for the download of sustainability reports



/project-work
│
├── frontend/
│		│
│		├── index.html               # Home page CON OVERVIEW AZIENDA FERRERO
│		├── obiettivi.html           # (da capire) Pagina "Obiettivi per la sostenibilità" con impegno sulla sostenibilità
│		├── download.html            # (da capire) Pagina per il download dei report
│		│
│		├── css/
│		│   ├── styles.css           # CSS globale per tutte le pagine
│		│   └── obiettivi.css        # (opzionale) stili specifici per la pagina obiettivi
│		│
│		├── js/
│		│   └── scripts.js           # JS globale (se serve)
│		│
│		└── assets/
│				├── images/              # Immagini usate nel sito
│	    		├── fonts/               # (da capire)Font custom (se presenti)
│	    		└── downloads/           # PDF o altri file per il download
│	    	 
│
├── backend/
│   	├── index.js	#punto di ingresso principale dell'applicazione backend Node.js/Express.
│   	├── routes/
│		  │		└── report-routes.js	#file nel quale sono contenute le rotte dei report (/reports oppure/reports/:year). In questo modo in futuro se necessario sarà possibile creare nuovi file per ogni "sezione" logica del sito
│		  │
│   	  ├── controllers/			#Ricevuta la richiesta dal client esegue la logica necessaria (chiamare il database) e restituisce una risposta (JSON)
│   	  ├── utils/				#contiene le funzioni comuni (come invio mail/log...) e evita duplicazione del codice
│   	  ├── package.json
│   	  ├── reports/ 				#cartella in cui sono contenuti i reports, nominati secondo l'anno di redazione
│   	  └── node_modules/
│
├── README.md
├── .gitignore
└── package.json (opzionale, se vuoi un root per comandi comuni)
