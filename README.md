# project-work
Project work - page for the download of sustainability reports



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
│   	├── app.js (o server.js)	#punto di ingresso principale dell'applicazione backend Node.js/Express.
│   	├── routes/
│		│		└── reportRoutes.js	#file nel quale sono contenute le rotte dei report (/reports oppure/reports/:year). In questo modo in futuro se necessario sarà possibile creare nuovi file per ogni "sezione" logica del sito
│		│
│   	├── controllers/			#Ricevere la richiesta dal client esegue la logica necessaria (es. chiamare il database tramite i model, fare elaborazioni) e restituisce una risposta (JSON, HTML, file, errore...)
│   	├── models/				#contiene il model della tabella MYSQL dei report. La tabella tuttavia viene creata manualmente dato che in una prima versione non sono previste funzioni di creazione/modifica di dati IN-SITE
│   	├── utils/					#contiene le funzioni comuni (come invio mail/log...) e evita duplicazione del codice
│   	├── package.json
│   	├── REPORTS/ 				#cartella in cui sono presenti i report
│   	└── node_modules/
│
├── README.md
├── .gitignore
└── package.json (opzionale, se vuoi un root per comandi comuni)