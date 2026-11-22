/* =============================================================================
   OUTRUN ELAN SYNTHWAVE — STATIC MODEL TELEMETRY SYSTEM
   app.js — Full Application Logic
   Storage: IndexedDB (localStorage fallback)
   ============================================================================= */

'use strict';

// ─── CONSTANTS ─────────────────────────────────────────────────────────────
const DB_NAME    = 'OutRunElanDB';
const DB_VERSION = 1;
const STORE_NAME = 'models';

const STATUS_LABELS = {
  COMPLETED:      '🏆 Costruito',
  WIP:            '🔧 In Costruzione',
  BACKLOG:        '📦 In Possesso (Da Costruire)',
  IN_TRANSIT:     '🚚 Acquistato in Arrivo',
  WISHLIST:       '🔍 Mancante (Wishlist)',
  NOT_INTERESTED: '🚫 Mancante (Non Interessato)',
  OTHER:          '📌 Altro'
};

// Mappa colori per stato (usata in card e filtri)
const STATUS_COLORS = {
  COMPLETED:      'var(--neon-magenta)',
  WIP:            'var(--neon-amber)',
  BACKLOG:        '#4488ff',
  IN_TRANSIT:     '#0d9488',
  WISHLIST:       'var(--neon-orange)',
  NOT_INTERESTED: '#dc2626',
  OTHER:          '#64748b'
};

// Elenco completo produttori di kit statici in ordine alfabetico
const KNOWN_KIT_BRANDS = [
  'Academy',
  'AFV Club',
  'Airfix',
  'Alpha Model',
  'AMT',
  'Amusing Hobby',
  'Aoshima',
  'Arii',
  'Atlantis',
  'Bandai',
  'Bburago',
  'Beemax / NuNu',
  'Belkits',
  'Border Model',
  'Bronco',
  'Crown',
  'Cyber-Hobby',
  'Doyusha',
  'Dragon',
  'Ebbro',
  'Eduard',
  'Entex',
  'Esci',
  'Fine Molds',
  'FlyHawk',
  'Fujimi',
  'Gunze Sangyo',
  'Hasegawa',
  'Heller',
  'Hobby Boss',
  'ICM',
  'Imai',
  'Italeri',
  'Jo-Han',
  'Kinetic',
  'Kotobukiya',
  'LS',
  'Maisto',
  'Marui',
  'Matchbox',
  'Meng',
  'Merit',
  'Micro Ace',
  'MiniArt',
  'Minicraft',
  'Model Factory Hiro',
  'Moebius',
  'Monogram',
  'MPC',
  'Nagano',
  'Nichimo',
  'Nitto',
  'Otaki',
  'Platz',
  'Pocher',
  'Polar Lights',
  'Profil24',
  'Protar',
  'Revell',
  'Roden',
  'Rosso',
  'Salvinos JR',
  'Scale Production',
  'Smer',
  'Special Hobby',
  'Studio27',
  'Takom',
  'Tameo Kits',
  'Tamiya',
  'Testors',
  'Trumpeter',
  'Union',
  'Wave',
  'Zvezda'
];

const STAGE_OPTIONS = [
  'Non Iniziato (Backlog)',
  'Pulizia & Preparazione Pezzi',
  'Montaggio a Secco (Dry Fit)',
  'Primerizzazione',
  'Verniciatura Carrozzeria / Scafo',
  'Dettagli Interni & Motore',
  'Applicazione Decalcomanie',
  'Invecchiamento / Weathering',
  'Trasparente Finale (Clear Coat)',
  'Assemblaggio Finale',
  'Esposto in Vetrina'
];

const SAMPLE_MODELS = [
  {
    name: 'Ferrari F40 LM Racing', brand: 'Tamiya', scale: '1:24', category: 'Sport Car',
    status: 'WISHLIST', progress: 0, stage: 'Non Iniziato (Backlog)',
    kitCode: 'TAM 24299', location: 'Vetrina A - Ripiano 1', year: '2023',
    purchasePrice: 28.50, estimatedValue: 55.00,
    paints: 'Tamiya TS-8 Italian Red, XF-1 Flat Black, X-11 Chrome Silver',
    aftermarket: 'Eduard Fotoincisioni 1:24, Cinture Scame Studio27',
    notes: 'Costruzione con ampio uso di photoetch. Carrozzeria laccata a mano libera con aerografo. Dettagli del vano motore completamente assemblati e pitturati. Verniciatura finale con Alclad II lacquer.',
    photo: null
  },
  {
    name: 'Lotus Elan M100 Turbo SE', brand: 'Fujimi', scale: '1:24', category: 'Auto Stradali',
    status: 'WISHLIST', progress: 0, stage: 'Non Iniziato (Backlog)',
    kitCode: 'FUJ 03658', location: 'Banco di Lavoro', year: '2024',
    purchasePrice: 22.00, estimatedValue: 38.00,
    paints: 'Tamiya TS-52 Candy Lime Green, X-22 Clear, XF-56 Metallic Grey',
    aftermarket: 'Mascherature Hartmann scala 1:24',
    notes: 'Versione "British Racing Colors" personalizzata. In attesa del clear coat finale. Alcune zone di weathering in avanzamento sulle minigonne.',
    photo: null
  },
  {
    name: 'Spitfire Mk.IXc RAF 1944', brand: 'Hasegawa', scale: '1:48', category: 'Aerei / Velivoli',
    status: 'WISHLIST', progress: 0, stage: 'Non Iniziato (Backlog)',
    kitCode: 'HAS JT102', location: 'Banco di Lavoro', year: '2024',
    purchasePrice: 16.50, estimatedValue: 28.00,
    paints: 'Gunze Mr. Color C331 Dark Green, C335 Ocean Grey, C316 PRU Blue',
    aftermarket: 'Eduard Weekend Edition Masks',
    notes: 'Schema camouflage RAF bicolore in progress. Necessita applicazione decalcomanie di squadriglia.',
    photo: null
  },
  {
    name: 'T-34/85 Mod. 1944', brand: 'Tamiya', scale: '1:35', category: 'Mezzi Militari',
    status: 'WISHLIST', progress: 0, stage: 'Non Iniziato (Backlog)',
    kitCode: 'TAM 35138', location: 'Magazzino - Scaffale B', year: '2022',
    purchasePrice: 34.00, estimatedValue: 34.00,
    paints: '', aftermarket: 'Set fotoincisioni Eduard + Zimmerit Eduard',
    notes: 'Kit in perfette condizioni. Previsto diorama con base paesaggio russo invernale.',
    photo: null
  },
  {
    name: 'RX-78-2 Gundam MG 2.0', brand: 'Bandai', scale: '1:100', category: 'Sci-Fi / Gunpla',
    status: 'WISHLIST', progress: 0, stage: 'Non Iniziato (Backlog)',
    kitCode: 'BAN 0145', location: 'Vetrina B - Ripiano 2', year: '2023',
    purchasePrice: 45.00, estimatedValue: 85.00,
    paints: 'Vallejo Model Air 71.004 White, Tamiya X-7 Red, XF-8 Flat Blue',
    aftermarket: 'Waterslide decals Bandai + Metallico Alclad II',
    notes: 'Panel line con Tamiya Panel Line Accent. Top coat matte Gaianotes Flat. Posa display base inclusa.',
    photo: null
  },
  {
    name: 'Porsche 911 RSR 1973', brand: 'Revell', scale: '1:24', category: 'Sport Car',
    status: 'WISHLIST', progress: 0, stage: 'Non Iniziato (Backlog)',
    kitCode: 'REV 07031', location: '', year: '',
    purchasePrice: 0, estimatedValue: 32.00,
    paints: '', aftermarket: 'Da valutare fotoincisioni',
    notes: 'Wishlist: versione Carrera RSR Martini Racing. Da acquistare.',
    photo: null
  }
];

// ─── TAMIYA 1/20 GRAND PRIX COLLECTION COMPLETA & UFFICIALE (GIAPPONE) ───
const TAMIYA_1_20_MODELS = [
  {
    name: "Tyrrell P34 Six-Wheeler (1976)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20001", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1976", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-15 Blue, XF-16 Flat Aluminum, X-11 Chrome Silver", aftermarket: "",
    notes: "Tamiya GP No.1 — La rivoluzionaria F1 a 6 ruote di Derek Gardner con motore Ford Cosworth DFV (Scheckter/Depailler).", photo: null
  },
  {
    name: "McLaren M23 Ford (1976)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20002", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1976", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-26 Pure White, TS-36 Fluorescent Red", aftermarket: "",
    notes: "Tamiya GP No.2 — La monoposto con cui James Hunt vinse il leggendario mondiale 1976 contro Lauda.", photo: null
  },
  {
    name: "Porsche 928", brand: "Tamiya", scale: "1/20",
    category: "Auto Stradali", kitCode: "Tamiya 20003", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1977", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-17 Gloss Aluminum, TS-14 Black", aftermarket: "",
    notes: "Tamiya GP No.3 — Gran Turismo con motore V8 anteriore 4.5L e fari a scomparsa (Auto dell'Anno 1978).", photo: null
  },
  {
    name: "Team Lotus Type 78 Ford (1977)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20004", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1977", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-14 Black, X-12 Gold Leaf", aftermarket: "",
    notes: "Tamiya GP No.4 — J.P.S. Mk.III, la prima wing-car a effetto suolo di Colin Chapman (Mario Andretti / Gunnar Nilsson).", photo: null
  },
  {
    name: "Martini Porsche 935 Turbo Gr.5", brand: "Tamiya", scale: "1/20",
    category: "Sport Car", kitCode: "Tamiya 20005", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1976", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-26 Pure White, TS-15 Blue, TS-8 Italian Red", aftermarket: "",
    notes: "Tamiya GP No.5 — Mostro del Campionato Mondiale Marche Gruppo 5 con motore 2.8L turbo da 590 CV e livrea Martini.", photo: null
  },
  {
    name: "Wolf WR-1 Ford (1977)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20006", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1977", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-15 Blue, X-12 Gold Leaf", aftermarket: "",
    notes: "Tamiya GP No.6 — Walter Wolf Racing, Jody Scheckter vince al debutto assoluto nel GP d'Argentina 1977.", photo: null
  },
  {
    name: "Brabham BT46 Alfa Romeo (1978)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20007", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1978", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-8 Italian Red, X-11 Chrome Silver", aftermarket: "",
    notes: "Tamiya GP No.7 — Niki Lauda & John Watson con motore flat-12 Alfa Romeo e scambiatori di calore superficiali.", photo: null
  },
  {
    name: "Kremer Porsche 935 Turbo", brand: "Tamiya", scale: "1/20",
    category: "Sport Car", kitCode: "Tamiya 20008", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1977", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-26 White, TS-35 Park Green", aftermarket: "",
    notes: "Tamiya GP No.8 — Silhouette Gr.5 preparata dal Team Kremer per il campionato DRM.", photo: null
  },
  {
    name: "Toyota Celica LB Turbo Gr.5", brand: "Tamiya", scale: "1/20",
    category: "Sport Car", kitCode: "Tamiya 20009", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1977", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-10 French Blue, TS-26 White", aftermarket: "",
    notes: "Tamiya GP No.9 — Preparazione Schnitzer Motorsport DRM con motore 4 cilindri turbo 560 CV e carrozzeria silhouette.", photo: null
  },
  {
    name: "Ferrari 312T3 (1978)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20010", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1978", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-8 Italian Red, X-11 Chrome", aftermarket: "",
    notes: "Tamiya GP No.10 — Motore boxer 12 cilindri 3.0L con Carlos Reutemann e prima vittoria di Gilles Villeneuve in Canada.", photo: null
  },
  {
    name: "Racing Pit Team (Set Meccanici & Box)", brand: "Tamiya", scale: "1/20",
    category: "Diorami", kitCode: "Tamiya 20011", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1979", purchasePrice: 0, estimatedValue: 0,
    paints: "XF-1 Flat Black, XF-15 Flesh, X-7 Red, X-4 Blue", aftermarket: "",
    notes: "Tamiya GP No.11 — Set 8 figure meccanici, team manager con lavagna tempi, pilota e attrezzatura pit-stop in scala 1/20.", photo: null
  },
  {
    name: "Ligier JS11 Ford (1979)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20012", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1979", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-10 French Blue, TS-26 White", aftermarket: "",
    notes: "Tamiya GP No.12 — Jacques Laffite e Patrick Depailler dominano l'inizio del mondiale 1979 a effetto suolo.", photo: null
  },
  {
    name: "Fiat 131 Abarth Rally (1977)", brand: "Tamiya", scale: "1/20",
    category: "Rally", kitCode: "Tamiya 20013", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1977", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-15 Blue, TS-16 Yellow", aftermarket: "",
    notes: "Tamiya GP No.13 — Campione del Mondo Rally WRC 1977, livrea ufficiale Olio Fiat, motore bialbero 16V Abarth.", photo: null
  },
  {
    name: "Williams FW07 Ford (1979)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20014", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1979", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-26 White, TS-9 British Green", aftermarket: "",
    notes: "Tamiya GP No.14 — Prima vittoria di Frank Williams a Silverstone con Clay Regazzoni e Alan Jones.", photo: null
  },
  {
    name: "Fiat 131 Abarth Rally Monte Carlo (1980)", brand: "Tamiya", scale: "1/20",
    category: "Rally", kitCode: "Tamiya 20015", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1980", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-26 Pure White, TS-15 Blue, TS-36 Fluorescent Red", aftermarket: "",
    notes: "Tamiya GP No.15 — Versione vincitrice del Rally di Monte Carlo 1980 con Walter Röhrl e Christian Geistdörfer.", photo: null
  },
  {
    name: "Porsche 928S", brand: "Tamiya", scale: "1/20",
    category: "Auto Stradali", kitCode: "Tamiya 20016", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1980", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-14 Black, TS-17 Gloss Aluminum", aftermarket: "",
    notes: "Tamiya GP No.16 — Versione potenziata 928S con spoiler anteriore/posteriore e motore V8 4.7L da 300 CV.", photo: null
  },
  {
    name: "Brabham BT50 BMW Turbo (1982)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20017", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1982", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-15 Blue, TS-26 White", aftermarket: "",
    notes: "Tamiya GP No.17 — Motore 4 cilindri BMW M12 turbo da oltre 800 CV con Nelson Piquet e Riccardo Patrese.", photo: null
  },
  {
    name: "Renault RE-30B Turbo (1982)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20018", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1982", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-16 Yellow, TS-26 White, TS-14 Black", aftermarket: "",
    notes: "Tamiya GP No.18 — Alain Prost e René Arnoux con 4 vittorie nel 1982 e motore V6 biturbo EF1.", photo: null
  },
  {
    name: "Williams FW-11 Honda F-1 (1986)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20019", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1986", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-16 Yellow, TS-15 Blue, TS-26 White", aftermarket: "",
    notes: "Tamiya GP No.19 — Titolo Mondiale Costruttori 1986 con motore Honda RA166E V6 Turbo da oltre 1000 CV (Mansell/Piquet).", photo: null
  },
  {
    name: "Lotus Honda 99T (1987)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20020", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1987", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-16 Yellow (Camel Yellow), TS-15 Blue", aftermarket: "",
    notes: "Tamiya GP No.20 — Ayrton Senna vince a Monaco e Detroit con sospensioni attive computerizzate e motore Honda Turbo.", photo: null
  },
  {
    name: "Benetton Ford B188 (1988)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20021", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1988", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-16 Yellow, TS-10 Blue, TS-35 Green, TS-8 Red", aftermarket: "",
    notes: "Tamiya GP No.21 — La coloratissima United Colors of Benetton di Rory Byrne con motore Ford Cosworth DFR (Nannini/Boutsen).", photo: null
  },
  {
    name: "McLaren Honda MP4/4 (1988)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20022", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1988", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-26 Pure White, TS-36 Fluorescent Red", aftermarket: "",
    notes: "Tamiya GP No.22 — L'auto più dominante della storia: 15 vittorie su 16 gare. Ayrton Senna Campione del Mondo 1988.", photo: null
  },
  {
    name: "Ferrari F189 / 640 Early (1989)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20023", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1989", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-8 Italian Red, TS-14 Black", aftermarket: "",
    notes: "Tamiya GP No.23 — Disegnata da John Barnard con il primo cambio al volante con paddle (Nigel Mansell vince in Brasile).", photo: null
  },
  {
    name: "Ferrari F189 Portuguese GP (1989)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20024", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1989", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-8 Italian Red, TS-14 Black", aftermarket: "",
    notes: "Tamiya GP No.24 — Versione Estoril GP 1989 con nuova presa d'aria periscopica. Vittoria di Gerhard Berger.", photo: null
  },
  {
    name: "Williams FW13B Renault (1990)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20025", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1990", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-15 Blue, TS-26 White, TS-16 Yellow", aftermarket: "",
    notes: "Tamiya GP No.25 — Monoposto motorizzata Renault RS2 V10 3.5L con Thierry Boutsen e Riccardo Patrese.", photo: null
  },
  {
    name: "McLaren Honda MP4/5B (1990)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20026", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1990", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-26 Pure White, TS-36 Fluorescent Red", aftermarket: "",
    notes: "Tamiya GP No.26 — Ayrton Senna Campione del Mondo 1990 dopo il celebre duello di Suzuka con Alain Prost.", photo: null
  },
  {
    name: "F-1 Driver & Technical Engineer Set", brand: "Tamiya", scale: "1/20",
    category: "Diorami", kitCode: "Tamiya 20027", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1990", purchasePrice: 0, estimatedValue: 0,
    paints: "XF-1 Flat Black, XF-15 Flesh", aftermarket: "",
    notes: "Tamiya GP No.27 — Figure set in scala 1/20 per diorami box: pilota in piedi/seduto e ingegneri di pista.", photo: null
  },
  {
    name: "Leyton House CG901B (1990)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20028", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1990", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-41 Coral Blue (Miami Blue), TS-26 White", aftermarket: "",
    notes: "Tamiya GP No.28 — Capolavoro aerodinamico di Adrian Newey con livrea azzurro Miami e motore Judd EV V8 (Capelli/Gugelmin).", photo: null
  },
  {
    name: "Braun Tyrrell Honda 020 (1991)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20029", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1991", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-14 Black, TS-26 White", aftermarket: "",
    notes: "Tamiya GP No.29 — Muso alto rialzato e motore Honda RA101E V10, guidata da Satoru Nakajima e Stefano Modena.", photo: null
  },
  {
    name: "Lotus Type 102B Judd (1991)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20030", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1991", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-9 British Green, TS-26 White", aftermarket: "",
    notes: "Tamiya GP No.30 — Il debutto in Formula 1 del giovane Mika Häkkinen e Johnny Herbert con motore Judd EV V8.", photo: null
  },
  {
    name: "Tire Changing Pit Crew Set", brand: "Tamiya", scale: "1/20",
    category: "Diorami", kitCode: "Tamiya 20031", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1991", purchasePrice: 0, estimatedValue: 0,
    paints: "XF-1 Flat Black, XF-15 Flesh", aftermarket: "",
    notes: "Tamiya GP No.31 — Set 5 meccanici con pistola pneumatica per dadi, sollevatori e pneumatici slick di ricambio.", photo: null
  },
  {
    name: "Jordan 191 Ford 7Up (1991)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20032", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1991", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-35 Park Green, TS-10 French Blue", aftermarket: "",
    notes: "Tamiya GP No.32 — La leggendaria 7Up con cui Michael Schumacher debuttò a Spa 1991 (Gary Anderson designer).", photo: null
  },
  {
    name: "Lotus Ford 102D Herbert (1992)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20033", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1992", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-9 British Green, TS-16 Yellow", aftermarket: "",
    notes: "Tamiya GP No.33 — Monoposto motorizzata Ford Cosworth HB V8, numero 12 Johnny Herbert.", photo: null
  },
  {
    name: "Lotus Ford 102D Häkkinen (1992)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20034", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1992", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-9 British Green, TS-16 Yellow", aftermarket: "",
    notes: "Tamiya GP No.34 — Monoposto motorizzata Ford Cosworth HB V8, numero 11 Mika Häkkinen (6° posto in Francia e Ungheria).", photo: null
  },
  {
    name: "McLaren Honda MP4/7 (1992)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20035", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1992", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-26 Pure White, TS-36 Fluorescent Red", aftermarket: "",
    notes: "Tamiya GP No.35 — Motore Honda RA122E V12 e cambio semiautomatico. Senna vince l'indimenticabile GP di Monaco 1992.", photo: null
  },
  {
    name: "Benetton Ford B192 (1992)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20036", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1992", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-16 Yellow, TS-35 Green", aftermarket: "",
    notes: "Tamiya GP No.36 — Prima vittoria in carriera di Michael Schumacher a Spa-Francorchamps sotto la pioggia (Rory Byrne / Ross Brawn).", photo: null
  },
  {
    name: "Lotus 107 Ford (1992)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20037", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1992", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-9 British Green, TS-16 Yellow", aftermarket: "",
    notes: "Tamiya GP No.37 — Disegnata da Chris Murphy, motore Ford Cosworth HB V8 con livrea Castrol (Häkkinen/Herbert).", photo: null
  },
  {
    name: "Lotus 107B Ford (1993)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20038", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1993", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-9 British Green, TS-16 Yellow", aftermarket: "",
    notes: "Tamiya GP No.38 — Evoluzione con sospensioni attive guidata da Alex Zanardi, Johnny Herbert e Pedro Lamy.", photo: null
  },
  {
    name: "McLaren MP4/8 Ford (1993)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20039", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1993", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-26 Pure White, TS-36 Fluorescent Red", aftermarket: "",
    notes: "Tamiya GP No.39 — Il leggendario 'giro degli dei' di Ayrton Senna a Donington Park 1993 e vittoria a Monaco.", photo: null
  },
  {
    name: "Newman Haas Kmart Texaco Lola T93/00 Ford (1993)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20040", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1993", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-14 Black, TS-26 Pure White", aftermarket: "",
    notes: "Tamiya GP No.40 — La Lola T93/00 IndyCar del team Newman/Haas con cui Nigel Mansell vinse il titolo CART 1993 al debutto.", photo: null
  },
  {
    name: "Dick Simon Duracell Mobil 1 Lola T93/00 Ford (1993)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20041", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1993", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-14 Black, X-12 Gold Leaf / Copper", aftermarket: "",
    notes: "Tamiya GP No.41 — Lola T93/00 Ford IndyCar in livrea rame/nero Duracell Mobil 1 Sadia guidata da Raul Boesel.", photo: null
  },
  {
    name: "Tyrrell Yamaha 023 (1995)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20042", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1995", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-26 White, TS-15 Blue", aftermarket: "",
    notes: "Tamiya GP No.42 — Motore Yamaha OX10C V10 3.0L con Ukyo Katayama e Mika Salo (5° posto a Monza).", photo: null
  },
  {
    name: "Honda RA272 1965 Mexico GP Winner", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20043", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1965", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-7 Racing White, TS-8 Red", aftermarket: "",
    notes: "Tamiya GP No.43 — La storica prima vittoria di Honda in F1 con Richie Ginther nel GP del Messico 1965 (motore trasversale V12 1.5L).", photo: null
  },
  {
    name: "Lotus 25 Coventry Climax (1963)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20044", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1963", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-9 British Green, TS-16 Yellow", aftermarket: "",
    notes: "Tamiya GP No.44 — La prima vera monoscocca in alluminio della storia della F1. Jim Clark Campione del Mondo 1963.", photo: null
  },
  {
    name: "Ferrari F310B (1997)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20045", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1997", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-8 Italian Red, TS-26 White", aftermarket: "",
    notes: "Tamiya GP No.45 — Michael Schumacher lotta per il mondiale 1997 con 5 vittorie (Monaco, Spa, Magny-Cours, Suzuka).", photo: null
  },
  {
    name: "McLaren Mercedes MP4/13 (1998)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20046", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1998", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-14 Black, TS-17 Gloss Aluminum", aftermarket: "",
    notes: "Tamiya GP No.46 — Mika Häkkinen Campione del Mondo 1998. La prima McLaren firmata da Adrian Newey con livrea West.", photo: null
  },
  {
    name: "Ferrari F1-2000 (2000)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20048", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2000", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-8 Italian Red, TS-26 White", aftermarket: "",
    notes: "Tamiya GP No.48 — Michael Schumacher riporta il titolo Piloti a Maranello dopo 21 anni con la vittoria decisiva a Suzuka.", photo: null
  },
  {
    name: "Ferrari F1-2000 Full View (Clear Cowl)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20049", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2000", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-8 Italian Red, X-11 Chrome Silver", aftermarket: "",
    notes: "Tamiya GP No.49 — Edizione speciale Full View con carrozzeria trasparente per esporre il motore Ferrari 049 V10.", photo: null
  },
  {
    name: "Brabham BT46 Alfa Romeo Clear Cowl", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20050", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1978", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-8 Italian Red, X-11 Chrome Silver", aftermarket: "",
    notes: "Tamiya GP No.50 — Edizione speciale Clear Cowl con carrozzeria semi-trasparente per mostrare il motore flat-12 e telaio.", photo: null
  },
  {
    name: "Ferrari 312T3 Clear Cowling Version", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20051", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1978", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-8 Italian Red, X-11 Chrome Silver", aftermarket: "",
    notes: "Tamiya GP No.51 — Edizione Clear Cowling della 312T3 di Gilles Villeneuve e Carlos Reutemann con cofano trasparente.", photo: null
  },
  {
    name: "Ferrari F2001 (2001)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20052", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2001", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-8 Italian Red, TS-26 White", aftermarket: "",
    notes: "Tamiya GP No.52 — Schumacher vince 9 GP e conquista il 4° titolo mondiale con larghissimo anticipo a Budapest.", photo: null
  },
  {
    name: "Tyrrell P34 Six-Wheeler 1977 Monaco GP", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20053", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1977", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-15 Blue, TS-26 White", aftermarket: "",
    notes: "Tamiya GP No.53 — Versione GP Monaco 1977 con carrozzeria integrale aerodinamica guidata da Ronnie Peterson.", photo: null
  },
  {
    name: "Ferrari F2001 Full View (Clear Cowl)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20054", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2001", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-8 Italian Red, X-11 Chrome Silver", aftermarket: "",
    notes: "Tamiya GP No.54 — Edizione Full View della Ferrari F2001 Campione del Mondo con carrozzeria trasparente.", photo: null
  },
  {
    name: "Williams BMW FW24 (2002)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20055", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2002", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-15 Blue, TS-26 White", aftermarket: "",
    notes: "Tamiya GP No.55 — Il motore BMW V10 più potente della griglia (oltre 19.000 giri/min) con Juan Pablo Montoya e Ralf Schumacher.", photo: null
  },
  {
    name: "Williams BMW FW24 Clearview Edition", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20056", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2002", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-15 Blue, TS-26 White", aftermarket: "",
    notes: "Tamiya GP No.56 — Versione Clearview con cofano motore trasparente per mostrare il V10 BMW P82 e il telaio.", photo: null
  },
  {
    name: "Lotus 99T Honda (1987 Re-Release)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20057", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1987", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-16 Yellow, TS-15 Blue", aftermarket: "",
    notes: "Tamiya GP No.57 — Edizione aggiornata della Lotus Honda 99T di Ayrton Senna e Satoru Nakajima con nuove decal.", photo: null
  },
  {
    name: "Tyrrell P34 Japan GP 1976 Photo-Etched", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20058", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1976", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-15 Blue, TS-26 White", aftermarket: "Fotoincisioni incluse",
    notes: "Tamiya GP No.58 — Edizione speciale GP Giappone 1976 sotto il diluvio del Fuji con parti fotoincise e scritte giapponesi.", photo: null
  },
  {
    name: "Ferrari F60 (2009)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20059", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2009", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-85 Bright Mica Red, TS-26 White", aftermarket: "",
    notes: "Tamiya GP No.59 — La 55ª monoposto Ferrari con KERS guidata da Kimi Räikkönen (vittoria a Spa) e Giancarlo Fisichella.", photo: null
  },
  {
    name: "Lotus Type 79 1978 Black Beauty", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20060", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1978", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-14 Black, X-12 Gold Leaf", aftermarket: "",
    notes: "Tamiya GP No.60 — 'Black Beauty', l'iconica monoposto JPS a effetto suolo con cui Mario Andretti vinse il Mondiale 1978.", photo: null
  },
  {
    name: "Martini Lotus Type 79 (1979)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20061", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1979", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-9 British Green, Martini Stripes", aftermarket: "",
    notes: "Tamiya GP No.61 — Versione con la magnifica livrea Martini Racing British Green (Mario Andretti / Carlos Reutemann).", photo: null
  },
  {
    name: "McLaren M23 Ford 1976 (Photo-Etched)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20062", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1976", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-26 Pure White, TS-36 Fluorescent Red", aftermarket: "Fotoincisioni incluse",
    notes: "Tamiya GP No.62 — Ristampa da collezione con parti fotoincise di James Hunt Campione 1976.", photo: null
  },
  {
    name: "Motorsports Team Set (1970-1985)", brand: "Tamiya", scale: "1/20",
    category: "Diorami", kitCode: "Tamiya 20063", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1980", purchasePrice: 0, estimatedValue: 0,
    paints: "XF-1 Flat Black, XF-15 Flesh, X-7 Red", aftermarket: "",
    notes: "Tamiya GP No.63 — Set figure meccanici, piloti e attrezzatura da box F1 anni '70-'85 per diorami in scala 1/20.", photo: null
  },
  {
    name: "Wolf WR1 1977 (Photo-Etched)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20064", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1977", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-15 Blue, X-12 Gold Leaf", aftermarket: "Fotoincisioni incluse",
    notes: "Tamiya GP No.64 — Edizione speciale con parti fotoincise della Wolf WR1 Ford di Jody Scheckter.", photo: null
  },
  {
    name: "Team Lotus Type 78 1977 (Photo-Etched)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20065", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1977", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-14 Black, X-12 Gold Leaf", aftermarket: "Fotoincisioni incluse",
    notes: "Tamiya GP No.65 — Ristampa fedele della J.P.S. Mk.III 1977 con dettagli fotoincisi per radiatori e alettoni.", photo: null
  },
  {
    name: "Porsche 928S (Re-Release)", brand: "Tamiya", scale: "1/20",
    category: "Auto Stradali", kitCode: "Tamiya 20066", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1980", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-14 Black, TS-17 Gloss Aluminum", aftermarket: "",
    notes: "Tamiya GP No.66 — Ristampa celebrativa della Gran Turismo V8 Porsche 928S in scala 1/20.", photo: null
  },
  {
    name: "Red Bull Racing Renault RB6 (2010)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20067", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2010", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-89 Pearl Blue, Fluorescent Yellow", aftermarket: "",
    notes: "Tamiya GP No.67 — Sebastian Vettel e Red Bull Campioni del Mondo 2010 con lo scarico soffiato di Adrian Newey.", photo: null
  },
  {
    name: "Scuderia Ferrari SF70H (2017)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20068", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2017", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-8 Italian Red, TS-26 White, Carbon Decals", aftermarket: "",
    notes: "Tamiya GP No.68 — L'era turbo-ibrida a carreggiata allargata con pinna di squalo guidata da Sebastian Vettel e Kimi Räikkönen.", photo: null
  },
  {
    name: "Fiat 131 Abarth Rally Olio Fiat", brand: "Tamiya", scale: "1/20",
    category: "Rally", kitCode: "Tamiya 20069", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1977", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-15 Blue, TS-16 Yellow", aftermarket: "",
    notes: "Tamiya GP No.69 — Ristampa da collezione della leggenda WRC 1977 (Markku Alén / Maurizio Verini).", photo: null
  },
  {
    name: "Porsche 935 Martini Turbo Gr.5", brand: "Tamiya", scale: "1/20",
    category: "Sport Car", kitCode: "Tamiya 20070", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1976", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-26 Pure White, Martini Stripes", aftermarket: "",
    notes: "Tamiya GP No.70 — Silhouette 1976 Campionato Mondiale Marche con motore boxer turbo e livrea Martini.", photo: null
  },
  {
    name: "Porsche 935 Vaillant Kremer Gr.5", brand: "Tamiya", scale: "1/20",
    category: "Sport Car", kitCode: "Tamiya 20071", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1977", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-35 Park Green, TS-26 White", aftermarket: "",
    notes: "Tamiya GP No.71 — Livrea verde Vaillant Kremer pilotata da Bob Wollek nel campionato DRM tedesco.", photo: null
  },
  {
    name: "Toyota Celica LB Turbo Gr.5", brand: "Tamiya", scale: "1/20",
    category: "Sport Car", kitCode: "Tamiya 20072", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1977", purchasePrice: 0, estimatedValue: 0,
    paints: "TS-10 French Blue, TS-26 White", aftermarket: "",
    notes: "Tamiya GP No.72 — Livrea ufficiale Rodenstock Schnitzer Motorsport con motore 560 CV.", photo: null
  }
];

// ─── IMPORT / AGGIORNAMENTO TAMIYA 1/20 DATA ───
async function importTamiya120Data(forceSync = false) {
  const existingMap = new Map();
  allModels.forEach(m => {
    if (m.kitCode) existingMap.set(m.kitCode, m);
  });

  const toAdd = [];
  const toUpdate = [];

  for (const official of TAMIYA_1_20_MODELS) {
    const existing = existingMap.get(official.kitCode);
    if (existing) {
      toUpdate.push({
        ...existing,
        name: official.name,
        brand: official.brand,
        scale: official.scale,
        category: official.category,
        year: official.year,
        paints: official.paints,
        notes: official.notes,
        photo: existing.photo || null
      });
    } else {
      toAdd.push({ ...official, addedAt: new Date().toISOString() });
    }
  }

  if (toAdd.length === 0 && !forceSync) {
    if (!confirm(`Tutti i ${TAMIYA_1_20_MODELS.length} modelli Tamiya 1/20 sono già registrati!\n\nVuoi AGGIORNARE le schede e le foto delle scatole alle specifiche ufficiali corrette?`)) {
      return;
    }
  } else if (!forceSync) {
    const msg = `Importare e sincronizzare la collezione TAMIYA 1/20 GRAND PRIX (${TAMIYA_1_20_MODELS.length} modelli)?\n\n• Nuovi da aggiungere: ${toAdd.length}\n• Esistenti da aggiornare con foto scatola corretta: ${toUpdate.length}`;
    if (!confirm(msg)) return;
  }

  for (const m of toAdd) {
    await saveModel(m);
  }
  for (const m of toUpdate) {
    await saveModel(m);
  }

  allModels = await getAllModels();
  renderGrid();
  refreshStats();
  showToast(`✓ ${toAdd.length} aggiunti, ${toUpdate.length} aggiornati con foto scatola originale!`, 'cyan');
}

// ─── RESET & RICARICA PULITA CON SCATOLE ORIGINALI VERIFICATE ───
async function resetAndLoadOfficialCollection() {
  const msg = 'ATTENZIONE: Questa operazione sostituirà i modelli Tamiya 1/20 esistenti con la collezione pulita e ufficiale con foto delle scatole originali al 100% (Box Art da collezione da montare).\n\nProcedere con il ripristino pulito?';
  if (!confirm(msg)) return;

  for (const m of allModels) {
    if (m.kitCode && (m.kitCode.startsWith('Tamiya 200') || (m.brand === 'Tamiya' && (m.scale === '1:20' || m.scale === '1/20 Grand Prix')))) {
      await deleteModelById(m.id);
    }
  }

  for (const m of TAMIYA_1_20_MODELS) {
    await saveModel({ ...m, addedAt: new Date().toISOString() });
  }

  allModels = await getAllModels();
  renderGrid();
  refreshStats();
  showToast(`✓ Collezione ripristinata con ${TAMIYA_1_20_MODELS.length} scatole originali verificate!`, 'cyan');
}


// ─── STATE ──────────────────────────────────────────────────────────────────
let db         = null;
let allModels  = [];
let editingId  = null;
let filterStatus   = 'ALL';
let filterScale    = 'ALL';
let filterCategory = 'ALL';
let filterBrand    = 'ALL';
let searchQuery    = '';
let sortKey        = 'kitCode';
let currentPhotoDataUrl = null;

const WISHLIST_MIGRATION_KEY = 'modelkit_default_wishlist_v2';

function isRallyModel(m) {
  const txt = `${m.name || ''} ${m.notes || ''}`.toLowerCase();
  return /\b(rally|wrc|stratos|delta hf|impreza wrc|celica gt-four|206 wrc|focus wrc|131 abarth|quattro rally|escort rs cosworth|alpine a110|corolla wrc|cordoba wrc|lancer evo.*wrc|safari)\b/i.test(txt);
}

function normalizeModelTaxonomy(m, convertBacklogToWishlist = false) {
  let changed = false;

  // Stato di default: MANCANTE (WISHLIST)
  if (!m.status) {
    m.status = 'WISHLIST';
    changed = true;
  } else if (convertBacklogToWishlist && m.status === 'BACKLOG') {
    m.status = 'WISHLIST';
    changed = true;
  }

  // Scala: 1/20 Grand Prix, Formula 1 e 1:20 -> 1/20
  if (m.scale === '1/20 Grand Prix' || m.scale === 'Formula 1' || m.scale === '1:20') {
    m.scale = '1/20';
    changed = true;
  }

  // Categoria: 1/24 Sports Car Series -> Sport Car; Auto Corsa / Rally -> Formula 1 o Rally o Sport Car
  if (m.category === '1/24 Sports Car Series') {
    m.category = 'Sport Car';
    changed = true;
  } else if (m.category === 'Auto Corsa / Rally') {
    if (isRallyModel(m)) {
      m.category = 'Rally';
    } else if (m.scale === '1/20' || /\b(f1|f-1|formula 1|gp|grand prix|mp4|fw\d|312t|f189|f310|f200|sf70|rb6|p34|bt46|bt50|b188|b192)\b/i.test(`${m.name || ''} ${m.notes || ''}`)) {
      m.category = 'Formula 1';
    } else {
      m.category = 'Sport Car';
    }
    changed = true;
  }

  return changed;
}

const TAMIYA_120_RESET_KEY = 'modelkit_tamiya120_wishlist_reset_v3';

function isTamiya120Model(m) {
  if (!m) return false;
  const brand = (m.brand || '').trim().toLowerCase();
  const scale = (m.scale || '').trim();
  const code  = (m.kitCode || '').trim();
  return (brand === 'tamiya' && (scale === '1/20' || scale === '1:20' || scale === '1/20 Grand Prix')) || code.startsWith('Tamiya 200');
}

function resetTamiya120ModelsInList(models) {
  // Disabilitato: non sovrascrivere MAI stato (In Possesso / Costruito / WIP), prezzi, note o collocazioni dell'utente!
  return false;
}

function renderBrandFilterButtons() {
  const datalist = $('brandListOptions');
  if (!datalist) return;

  const brandMap = new Map();
  KNOWN_KIT_BRANDS.forEach(b => {
    brandMap.set(b.toLowerCase(), b);
  });
  allModels.forEach(m => {
    const b = (m.brand || '').trim();
    if (b && !brandMap.has(b.toLowerCase())) {
      brandMap.set(b.toLowerCase(), b);
    }
  });

  const sortedBrands = Array.from(brandMap.values()).sort((a, b) =>
    a.localeCompare(b, 'it', { sensitivity: 'base' })
  );

  datalist.innerHTML = sortedBrands.map(b => `<option value="${escHtml(b)}">`).join('');
}

async function importTamiya124Data(forceSync = false) {
  if (typeof TAMIYA_1_24_MODELS === 'undefined' || !Array.isArray(TAMIYA_1_24_MODELS) || TAMIYA_1_24_MODELS.length === 0) {
    showToast('⚠️ File catalogo tamiya124.js non disponibile.', 'yellow');
    return;
  }

  const existingCodes = new Set(allModels.map(m => (m.kitCode || '').trim().toLowerCase()));
  const toAdd = TAMIYA_1_24_MODELS.filter(m => !existingCodes.has((m.kitCode || '').trim().toLowerCase()));

  if (toAdd.length === 0) {
    if (forceSync) {
      showToast('✓ Tutti i 370 modellini 1/24 Tamiya Sports Car sono già presenti nel catalogo!', 'cyan');
    }
    return;
  }

  showToast(`🚗 Importazione in corso di ${toAdd.length} kit 1/24 Sports Car Series...`, 'cyan');

  const addedCodes = new Set(toAdd.map(m => (m.kitCode || '').trim().toLowerCase()));

  if (db) {
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      toAdd.forEach(m => {
        store.add({ ...m, addedAt: new Date().toISOString() });
      });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    allModels = await getAllModels();
  } else {
    toAdd.forEach(m => {
      const item = { ...m, id: Date.now() + Math.floor(Math.random() * 1000000), addedAt: new Date().toISOString() };
      allModels.push(item);
    });
    try {
      localStorage.setItem(getLocalStorageKey(), JSON.stringify(allModels));
    } catch (e) {
      console.warn('localStorage full:', e);
    }
  }

  // Sincronizzazione in batch su Google Cloud Firestore (database personale dell'utente)
  const userCol = getUserModelsCollection();
  if (userCol && isCloudSyncActive && !isApplyingCloudSnapshot) {
    try {
      const newlySaved = allModels.filter(m => addedCodes.has((m.kitCode || '').trim().toLowerCase()));
      const BATCH_SIZE = 400;
      for (let i = 0; i < newlySaved.length; i += BATCH_SIZE) {
        const chunk = newlySaved.slice(i, i + BATCH_SIZE);
        const batch = firestoreDb.batch();
        for (const m of chunk) {
          const docId = String(m.id || Date.now() + Math.floor(Math.random() * 100000));
          const docRef = userCol.doc(docId);
          batch.set(docRef, { ...m, id: m.id }, { merge: true });
        }
        await batch.commit();
      }
      console.log('☁️ Catalogo 1/24 Tamiya sincronizzato nel database personale su Cloud Firestore!');
    } catch (err) {
      console.warn('Errore sync Firestore per 1/24:', err);
    }
  }

  renderGrid();
  refreshStats();
  showToast(`✓ Aggiunti con successo ${toAdd.length} kit 1/24 Sports Car Series Tamiya!`, 'cyan');
}

// ─── DOM REFERENCES ─────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

// ─── INDEXEDDB SETUP (ISOLATO PER OGNI UTENTE) ─────────────────────────────
let activeUserId = null;

function getLocalStorageKey(uid = activeUserId) {
  return uid ? `outrunElanModels_${uid}` : 'outrunElanModels_guest';
}

function getUserModelsCollection() {
  if (!firestoreDb || !activeUserId) return null;
  return firestoreDb.collection('users').doc(activeUserId).collection('models');
}

function openDatabase(uid = activeUserId) {
  if (db) {
    try { db.close(); } catch {}
    db = null;
  }
  const dbName = uid ? `${DB_NAME}_${uid}` : DB_NAME;
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(dbName, DB_VERSION);
    req.onupgradeneeded = e => {
      const database = e.target.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('status',   'status',   { unique: false });
        store.createIndex('scale',    'scale',    { unique: false });
        store.createIndex('brand',    'brand',    { unique: false });
        store.createIndex('category', 'category', { unique: false });
        store.createIndex('name',     'name',     { unique: false });
      }
    };
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = e => reject(e.target.error);
  });
}

function getAllModels() {
  if (!db) return Promise.resolve([]);
  return new Promise((resolve, reject) => {
    const tx    = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req   = store.getAll();
    req.onsuccess = () => resolve((req.result || []).filter(m => !m.isSystemDoc && m.id !== '_system_test_users'));
    req.onerror   = () => reject(req.error);
  });
}

// ─── FIREBASE CLOUD FIRESTORE & AUTH (ARCHIVIO PERSONALE OBBLIGATORIO) ─────
const firebaseConfig = {
  apiKey: "AIzaSyBOqP0rFWilBPTmADQlJWlwIC4scVmBCiU",
  authDomain: "modelkit-inventory.firebaseapp.com",
  projectId: "modelkit-inventory",
  storageBucket: "modelkit-inventory.firebasestorage.app",
  messagingSenderId: "142287121521",
  appId: "1:142287121521:web:ad185370290b1a7d04bfd0"
};

const ADMIN_EMAIL = 'kenfalco170@gmail.com';
const MAX_BETA_USERS = 20;

let firestoreDb = null;
let firebaseAuth = null;
let currentCloudUser = null;
let firestoreUnsubscribe = null;
let isCloudSyncActive = false;
let isApplyingCloudSnapshot = false;
let isSeedingNewUser = false;
let isSyncing124Batch = false;
let isSyncing148Batch = false;
let isSyncing112Batch = false;
let isSyncingExtra120Batch = false;
let isSyncingExtra148Batch = false;
let isSyncingExtra124Batch = false;
let cachedBetaSlotCount = null;
let lastReportedModelsCount = -1;

function isAuthenticatedUser(user) {
  return Boolean(user && !user.isAnonymous && user.uid && user.email);
}

function isAdminUser(user) {
  return Boolean(isAuthenticatedUser(user) && user.email.trim().toLowerCase() === ADMIN_EMAIL);
}

function formatShortDate(iso) {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return '—';
  }
}

function updateBetaSlotBanner(count) {
  const banner = $('betaSlotBanner');
  const txt = $('betaSlotText');
  const st = $('betaSlotStatus');
  const regBtn = $('btnAuthRegisterSubmit');
  if (!banner || !txt || !st) return;

  if (count === null || typeof count !== 'number') {
    txt.textContent = `SLOT BETA TEST: -- / ${MAX_BETA_USERS} OCCUPATI`;
    st.textContent = 'CONNESSO';
    st.style.color = '#9BAEA6';
    return;
  }

  const isFull = count >= MAX_BETA_USERS;
  txt.textContent = `SLOT BETA TEST: ${count} / ${MAX_BETA_USERS} OCCUPATI`;
  if (isFull) {
    banner.style.background = 'rgba(239, 68, 68, 0.14)';
    banner.style.borderColor = '#EF4444';
    banner.style.color = '#FCA5A5';
    st.textContent = 'LIMITE RAGGIUNTO';
    st.style.color = '#FCA5A5';
    if (regBtn) {
      regBtn.disabled = true;
      regBtn.style.opacity = '0.5';
      regBtn.title = `Limite massimo di ${MAX_BETA_USERS} tester raggiunto`;
    }
  } else {
    banner.style.background = 'rgba(245, 158, 11, 0.10)';
    banner.style.borderColor = 'rgba(245, 158, 11, 0.35)';
    banner.style.color = '#FCD34D';
    st.textContent = `${MAX_BETA_USERS - count} DISPONIBILI`;
    st.style.color = '#6EE7B7';
    if (regBtn) {
      regBtn.disabled = false;
      regBtn.style.opacity = '';
      regBtn.title = '';
    }
  }
}

async function fetchBetaSlotCount() {
  if (!firestoreDb) return cachedBetaSlotCount;
  try {
    // Prova prima il documento pubblico leggero system/beta_stats
    const statsDoc = await firestoreDb.collection('system').doc('beta_stats').get();
    if (statsDoc.exists && typeof statsDoc.data().count === 'number') {
      cachedBetaSlotCount = statsDoc.data().count;
      updateBetaSlotBanner(cachedBetaSlotCount);
      return cachedBetaSlotCount;
    }
  } catch {}
  try {
    // Fallback: conta direttamente i documenti in users (se consentito dalle regole)
    const snap = await firestoreDb.collection('users').get();
    cachedBetaSlotCount = snap.size;
    updateBetaSlotBanner(cachedBetaSlotCount);
    return cachedBetaSlotCount;
  } catch {
    updateBetaSlotBanner(cachedBetaSlotCount);
    return cachedBetaSlotCount;
  }
}

async function loadAdminUsersPanel() {
  const section = $('adminUsersSection');
  const titleEl = $('adminUsersTitle');
  const listEl  = $('adminUsersList');
  if (!section || !listEl || !isAdminUser(currentCloudUser) || !firestoreDb) return;

  section.style.display = '';
  listEl.innerHTML = '<span style="color:#9BAEA6;">Caricamento utenti da Firestore...</span>';

  try {
    const snap = await firestoreDb.collection('users').get();
    const users = [];
    snap.forEach(doc => {
      const d = doc.data() || {};
      users.push({
        uid: doc.id,
        email: d.email || '(senza email)',
        displayName: d.displayName || (d.email ? d.email.split('@')[0] : doc.id.slice(0, 8)),
        createdAt: d.createdAt || null,
        lastLoginAt: d.lastLoginAt || null,
        modelsCount: typeof d.modelsCount === 'number' ? d.modelsCount : null
      });
    });

    users.sort((a, b) => (b.lastLoginAt || b.createdAt || '').localeCompare(a.lastLoginAt || a.createdAt || ''));

    // Sincronizza anche il contatore pubblico system/beta_stats con il conteggio reale
    cachedBetaSlotCount = users.length;
    firestoreDb.collection('system').doc('beta_stats').set({
      count: users.length,
      maxSlots: MAX_BETA_USERS,
      updatedAt: new Date().toISOString()
    }, { merge: true }).catch(() => {});

    if (titleEl) {
      titleEl.textContent = `// ADMIN_TELEMETRY // UTENTI REGISTRATI (${users.length}/${MAX_BETA_USERS})`;
    }

    if (users.length === 0) {
      listEl.innerHTML = '<span style="color:#9BAEA6;">Nessun utente registrato nella raccolta users.</span>';
      return;
    }

    listEl.innerHTML = users.map(u => {
      const isAdm = u.email.toLowerCase() === ADMIN_EMAIL;
      const badge = isAdm
        ? '<span style="background:#F59E0B;color:#121917;padding:1px 5px;border-radius:3px;font-size:8.5px;font-weight:800;margin-left:6px;">ADMIN</span>'
        : '';
      const kitsBadge = u.modelsCount !== null
        ? `<span style="color:#6EE7B7;font-weight:700;">📦 ${u.modelsCount} kit</span>`
        : '<span style="color:#647B72;">📦 —</span>';
      const dateStr = u.createdAt
        ? `Reg: ${formatShortDate(u.createdAt)} · Ultimo: ${formatShortDate(u.lastLoginAt)}`
        : `Ultimo accesso: ${formatShortDate(u.lastLoginAt)}`;
      return `
        <div style="padding:7px 9px;background:#121917;border:1px solid ${isAdm ? 'rgba(245,158,11,0.45)' : '#283731'};border-radius:5px;display:flex;flex-direction:column;gap:3px;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
            <span style="color:#F3F7F5;font-weight:700;">${escHtml(u.displayName)}${badge}</span>
            ${kitsBadge}
          </div>
          <div style="color:#FCD34D;font-size:10px;word-break:break-all;">${escHtml(u.email)}</div>
          <div style="color:#8CA299;font-size:9px;">${escHtml(dateStr)}</div>
        </div>`;
    }).join('');
  } catch (err) {
    console.warn('Errore lettura elenco utenti admin:', err);
    listEl.innerHTML = '<span style="color:#FCA5A5;">⚠️ Impossibile leggere la raccolta <code>users</code>: verifica che le Regole Firestore consentano la lettura ad Admin (<code>kenfalco170@gmail.com</code>).</span>';
  }
}

function setAppLocked(locked) {
  document.body.classList.toggle('app-auth-locked', locked);
  const modal = $('authModalBackdrop');
  const closeBtn = $('btnAuthModalClose');
  const footer = $('authModalFooter');
  if (modal) modal.classList.toggle('auth-mandatory-lock', locked);
  if (closeBtn) closeBtn.style.display = locked ? 'none' : '';
  if (footer) footer.style.display = locked ? 'none' : '';
}

function updateAuthUI(user, errorMsg = null, isSuccessMsg = false) {
  document.body.classList.toggle('is-admin', isAdminUser(user));
  const badge = $('dbStatusBadge');
  const usersBtn = $('btnHeaderUsers');
  const storageDisplay = $('storageTypeDisplay');
  const statusBanner = $('authStatusBanner');
  const logoutSection = $('authLogoutSection');
  const loginSection = $('authLoginSection');

  const loggedIn = isAuthenticatedUser(user);
  const displayName = loggedIn ? (user.displayName || user.email.split('@')[0]) : '';

  if (usersBtn) {
    usersBtn.textContent = loggedIn
      ? `👤 ${displayName.toUpperCase()}`
      : '🔒 ACCEDI / REGISTRATI';
  }

  if (loggedIn) {
    if (badge) {
      badge.textContent = `☁️ ARCHIVIO: ${displayName.toUpperCase()}`;
      badge.style.background = 'rgba(245, 158, 11, 0.14)';
      badge.style.color = '#FCD34D';
      badge.style.borderColor = '#F59E0B';
    }
    if (storageDisplay) storageDisplay.textContent = 'FIRESTORE_PRIVATO';
    if (statusBanner) {
      if (errorMsg) {
        statusBanner.style.background = isSuccessMsg ? 'rgba(52, 211, 153, 0.14)' : 'rgba(245, 158, 11, 0.14)';
        statusBanner.style.borderColor = isSuccessMsg ? '#34D399' : '#F59E0B';
        statusBanner.style.color = isSuccessMsg ? '#6EE7B7' : '#FCD34D';
        statusBanner.innerHTML = `${isSuccessMsg ? '✓' : '⚠️'} ${escHtml(errorMsg)}`;
      } else {
        statusBanner.style.background = 'rgba(52, 211, 153, 0.14)';
        statusBanner.style.borderColor = '#34D399';
        statusBanner.style.color = '#6EE7B7';
        statusBanner.innerHTML = `✓ <strong>Archivio personale attivo:</strong> ${escHtml(displayName)} (${escHtml(user.email)}). I tuoi modellini sono salvati nel tuo database privato.`;
      }
    }
    if (logoutSection) logoutSection.style.display = 'flex';
    if (loginSection) loginSection.style.display = 'none';
    if ($('authValuationSection')) $('authValuationSection').style.display = '';
    if ($('adminUsersSection')) $('adminUsersSection').style.display = isAdminUser(user) ? '' : 'none';
    const hasPasswordProvider = Array.isArray(user.providerData) && user.providerData.some(p => p && p.providerId === 'password');
    if ($('authChangePasswordSection')) $('authChangePasswordSection').style.display = hasPasswordProvider ? 'flex' : 'none';
    if ($('authGooglePwdNote')) $('authGooglePwdNote').style.display = hasPasswordProvider ? 'none' : 'block';
  } else {
    if (badge) {
      badge.textContent = '🔒 ACCESSO RICHIESTO';
      badge.style.background = 'rgba(245, 158, 11, 0.16)';
      badge.style.color = '#F59E0B';
      badge.style.borderColor = '#F59E0B';
    }
    if (storageDisplay) storageDisplay.textContent = 'BLOCCATO';
    if (statusBanner) {
      statusBanner.style.background = errorMsg && !isSuccessMsg ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.14)';
      statusBanner.style.borderColor = errorMsg && !isSuccessMsg ? '#EF4444' : '#F59E0B';
      statusBanner.style.color = errorMsg && !isSuccessMsg ? '#FCA5A5' : '#FCD34D';
      statusBanner.innerHTML = errorMsg
        ? `${isSuccessMsg ? '✓' : '⚠️'} ${escHtml(errorMsg)}`
        : '🔒 <strong>Registrazione obbligatoria:</strong> accedi o crea un nuovo account con Email e Password per avere il tuo database e archivio personale.';
    }
    if (logoutSection) logoutSection.style.display = 'none';
    if (loginSection) loginSection.style.display = 'flex';
    if ($('authValuationSection')) $('authValuationSection').style.display = 'none';
    if ($('adminUsersSection')) $('adminUsersSection').style.display = 'none';
    if ($('authChangePasswordSection')) $('authChangePasswordSection').style.display = 'none';
    if ($('authGooglePwdNote')) $('authGooglePwdNote').style.display = 'none';
    if ($('authChangePasswordForm')) {
      $('authChangePasswordForm').style.display = 'none';
      $('authChangePasswordForm').reset();
    }
    if ($('changePasswordFeedback')) $('changePasswordFeedback').style.display = 'none';
  }
}

function openAuthModal(mandatory = false) {
  const mustLock = mandatory || !isAuthenticatedUser(currentCloudUser);
  setAppLocked(mustLock);
  updateAuthUI(currentCloudUser);
  refreshStats();
  if (isAdminUser(currentCloudUser)) {
    loadAdminUsersPanel();
  } else if (!isAuthenticatedUser(currentCloudUser)) {
    fetchBetaSlotCount();
  }
  const modal = $('authModalBackdrop');
  if (modal) {
    modal.style.display = '';
    document.body.style.overflow = 'hidden';
  }
}

function closeAuthModal() {
  if (!isAuthenticatedUser(currentCloudUser)) return;
  const modal = $('authModalBackdrop');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

async function seedNewUserPersonalArchive() {
  if (isSeedingNewUser || !activeUserId) return;
  isSeedingNewUser = true;
  try {
    const nowIso = new Date().toISOString();
    const initialCatalog = [
      ...TAMIYA_1_20_MODELS.map(m => ({ ...m, status: 'WISHLIST', progress: 0, stage: 'Non Iniziato (Backlog)', location: '', purchasePrice: 0, estimatedValue: 0, aftermarket: '', photo: null, scale: '1/20', addedAt: nowIso })),
      ...(typeof TAMIYA_1_24_MODELS !== 'undefined' && Array.isArray(TAMIYA_1_24_MODELS)
        ? TAMIYA_1_24_MODELS.map(m => ({ ...m, status: 'WISHLIST', progress: 0, addedAt: nowIso }))
        : []),
      ...(typeof TAMIYA_1_48_MODELS !== 'undefined' && Array.isArray(TAMIYA_1_48_MODELS)
        ? TAMIYA_1_48_MODELS.map(m => ({ ...m, status: 'WISHLIST', progress: 0, addedAt: nowIso }))
        : []),
      ...(typeof TAMIYA_1_12_MODELS !== 'undefined' && Array.isArray(TAMIYA_1_12_MODELS)
        ? TAMIYA_1_12_MODELS.map(m => ({ ...m, status: 'WISHLIST', progress: 0, addedAt: nowIso }))
        : []),
      ...(typeof EXTRA_1_20_MODELS !== 'undefined' && Array.isArray(EXTRA_1_20_MODELS)
        ? EXTRA_1_20_MODELS.map(m => ({ ...m, status: 'WISHLIST', progress: 0, addedAt: nowIso }))
        : []),
      ...(typeof EXTRA_1_48_MODELS !== 'undefined' && Array.isArray(EXTRA_1_48_MODELS)
        ? EXTRA_1_48_MODELS.map(m => ({ ...m, status: 'WISHLIST', progress: 0, addedAt: nowIso }))
        : []),
      ...(typeof EXTRA_1_24_MODELS !== 'undefined' && Array.isArray(EXTRA_1_24_MODELS)
        ? EXTRA_1_24_MODELS.map(m => ({ ...m, status: 'WISHLIST', progress: 0, addedAt: nowIso }))
        : [])
    ];

    if (db) {
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        initialCatalog.forEach(item => store.add(item));
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
      allModels = await getAllModels();
    } else {
      allModels = initialCatalog.map((item, idx) => ({ ...item, id: idx + 1 }));
      try { localStorage.setItem(getLocalStorageKey(), JSON.stringify(allModels)); } catch {}
    }

    // Marca il reset 1/20 come già eseguito per questo nuovo utente
    localStorage.setItem(`${TAMIYA_120_RESET_KEY}_${activeUserId}`, '1');
    localStorage.setItem(`${WISHLIST_MIGRATION_KEY}_${activeUserId}`, '1');

    // Mostra subito i modelli a schermo (anche se il cloud dovesse essere lento o offline)
    renderBrandFilterButtons();
    renderGrid();
    refreshStats();
    showToast(`✓ Archivio personale creato! ${allModels.length} kit (60 Tamiya 1/20 + 1/24 in Wishlist).`, 'cyan');

    const userCol = getUserModelsCollection();
    if (userCol && isCloudSyncActive) {
      try {
        const BATCH_SIZE = 400;
        for (let i = 0; i < allModels.length; i += BATCH_SIZE) {
          const chunk = allModels.slice(i, i + BATCH_SIZE);
          const batch = firestoreDb.batch();
          for (const m of chunk) {
            const docId = String(m.id);
            batch.set(userCol.doc(docId), { ...m, id: m.id });
          }
          await batch.commit();
        }
        console.log('☁️ Archivio iniziale sincronizzato su Firestore!');
      } catch (cloudErr) {
        console.warn('Upload cloud archivio iniziale non riuscito (i dati restano salvati in locale):', cloudErr);
      }
    }
  } catch (err) {
    console.error('Errore creazione archivio iniziale utente:', err);
  } finally {
    isSeedingNewUser = false;
  }
}

async function activateUserSession(user) {
  // Controllo limite 5 utenti beta per nuovi profili (incluso primo accesso Google)
  if (firestoreDb) {
    try {
      const userRef = firestoreDb.collection('users').doc(user.uid);
      const existingDoc = await userRef.get();
      const nowIso = new Date().toISOString();

      if (!existingDoc.exists) {
        const currentCount = await fetchBetaSlotCount();
        if (!isAdminUser(user) && typeof currentCount === 'number' && currentCount >= MAX_BETA_USERS) {
          try { await user.delete(); } catch {}
          if (firebaseAuth) {
            try { await firebaseAuth.signOut(); } catch {}
          }
          deactivateUserSession(`Limite massimo di ${MAX_BETA_USERS} tester raggiunto.`);
          showToast(`🚫 Limite massimo di ${MAX_BETA_USERS} tester raggiunto`, 'error');
          return;
        }
        await userRef.set({
          email: (user.email || '').trim().toLowerCase(),
          displayName: user.displayName || (user.email ? user.email.split('@')[0] : 'Utente'),
          createdAt: nowIso,
          lastLoginAt: nowIso,
          modelsCount: 0
        }, { merge: true });

        // Aggiorna subito il contatore pubblico degli slot occupati
        const nextCount = typeof currentCount === 'number' ? currentCount + 1 : 1;
        cachedBetaSlotCount = nextCount;
        updateBetaSlotBanner(nextCount);
        firestoreDb.collection('system').doc('beta_stats').set({
          count: nextCount,
          maxSlots: MAX_BETA_USERS,
          updatedAt: nowIso
        }, { merge: true }).catch(() => {});
      } else {
        const existingData = existingDoc.data() || {};
        const patch = {
          email: (user.email || '').trim().toLowerCase(),
          displayName: user.displayName || existingData.displayName || (user.email ? user.email.split('@')[0] : 'Utente'),
          lastLoginAt: nowIso
        };
        if (!existingData.createdAt) patch.createdAt = nowIso;
        userRef.set(patch, { merge: true }).catch(() => {});
      }
    } catch (profErr) {
      console.warn('Avviso profilo utente Firestore:', profErr);
    }
  }

  currentCloudUser = user;
  activeUserId = user.uid;
  isCloudSyncActive = true;
  lastReportedModelsCount = -1;

  setAppLocked(false);
  updateAuthUI(user);
  closeAuthModal();

  try {
    db = await openDatabase(user.uid);
    allModels = await getAllModels();
  } catch (err) {
    console.warn('IndexedDB non disponibile, uso localStorage per utente:', err);
    db = null;
    try {
      const raw = localStorage.getItem(getLocalStorageKey(user.uid));
      allModels = raw ? JSON.parse(raw) : [];
    } catch { allModels = []; }
  }

  renderBrandFilterButtons();
  updateFilterUI();
  renderGrid();
  refreshStats();

  startFirestoreListener();
  if (isAdminUser(user)) {
    loadAdminUsersPanel();
  }
}

function deactivateUserSession(message = null) {
  if (firestoreUnsubscribe) {
    firestoreUnsubscribe();
    firestoreUnsubscribe = null;
  }
  if (db) {
    try { db.close(); } catch {}
    db = null;
  }
  currentCloudUser = null;
  activeUserId = null;
  isCloudSyncActive = false;
  allModels = [];
  renderGrid();
  refreshStats();
  setAppLocked(true);
  updateAuthUI(null, message);
  openAuthModal(true);
}

async function initFirestore() {
  if (typeof firebase === 'undefined') {
    console.warn('Firebase SDK non disponibile nel browser.');
    deactivateUserSession('Impossibile contattare il servizio di autenticazione Firebase. Verifica la connessione internet.');
    return false;
  }
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firestoreDb = firebase.firestore();
    fetchBetaSlotCount();

    try {
      await firestoreDb.enablePersistence({ synchronizeTabs: true });
    } catch (e) {
      console.log('Persistence note:', e.code);
    }

    if (typeof firebase.auth === 'function') {
      firebaseAuth = firebase.auth();
      // Gestione eventuale ritorno da Google signInWithRedirect (fallback mobile Android)
      firebaseAuth.getRedirectResult().catch(err => {
        if (err && err.code) {
          console.warn('Google redirect auth error:', err);
          updateAuthUI(null, `Errore accesso Google: ${err.message || err.code}`);
        }
      });
      firebaseAuth.onAuthStateChanged(async (user) => {
        if (isAuthenticatedUser(user)) {
          await activateUserSession(user);
          console.log('%c☁️ Archivio personale Firebase autenticato e collegato!', 'color:#0055ff;font-weight:bold;');
        } else {
          if (user && user.isAnonymous) {
            try { await firebaseAuth.signOut(); } catch {}
          }
          deactivateUserSession();
        }
      });
    } else {
      deactivateUserSession('Modulo Firebase Authentication non caricato.');
    }
    return true;
  } catch (err) {
    console.error('Errore inizializzazione Firestore:', err);
    isCloudSyncActive = false;
    deactivateUserSession('Errore connessione Firebase. Riprova tra qualche istante.');
    return false;
  }
}

function startFirestoreListener() {
  const userCol = getUserModelsCollection();
  if (!userCol) return;
  if (firestoreUnsubscribe) {
    firestoreUnsubscribe();
    firestoreUnsubscribe = null;
  }

  firestoreUnsubscribe = userCol.onSnapshot(async (snapshot) => {
    // Non sovrascrivere mentre stiamo creando il catalogo iniziale del nuovo utente
    if (isSeedingNewUser) return;

    // Se l'archivio cloud personale è vuoto: crea il catalogo pulito (tutti i 1/20 in Wishlist) oppure carica eventuali dati locali
    if (snapshot.empty) {
      if (allModels.length === 0) {
        await seedNewUserPersonalArchive();
      } else {
        console.log('☁️ Upload archivio locale verso il database personale Cloud...');
        try {
          const BATCH_SIZE = 400;
          for (let i = 0; i < allModels.length; i += BATCH_SIZE) {
            const chunk = allModels.slice(i, i + BATCH_SIZE);
            const batch = firestoreDb.batch();
            for (const m of chunk) {
              const docId = String(m.id || Date.now());
              batch.set(userCol.doc(docId), { ...m, id: m.id });
            }
            await batch.commit();
          }
          showToast('☁️ Archivio personale sincronizzato nel Cloud!', 'cyan');
        } catch (uploadErr) {
          console.warn('Errore upload archivio locale su Firestore:', uploadErr);
        }
      }
      return;
    }

    // Dati presenti nel database personale dell'utente: sincronizzazione in tempo reale
    isApplyingCloudSnapshot = true;
    const cloudModels = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      if (doc.id === '_system_test_users' || data.isSystemDoc) return;
      data.id = data.id || parseInt(doc.id, 10) || doc.id;
      cloudModels.push(data);
    });

    // Se per qualsiasi motivo mancassero i 60 Tamiya 1/20, li ripristiniamo puliti in Wishlist
    let needCloudUpdate = false;
    const hasTamiya120 = cloudModels.some(m => isTamiya120Model(m));
    if (!hasTamiya120 && TAMIYA_1_20_MODELS.length > 0) {
      const nowIso = new Date().toISOString();
      let maxId = cloudModels.reduce((mx, m) => Math.max(mx, parseInt(m.id, 10) || 0), 0);
      TAMIYA_1_20_MODELS.forEach(m => {
        maxId++;
        cloudModels.push({
          ...m,
          id: maxId,
          status: 'WISHLIST',
          progress: 0,
          stage: 'Non Iniziato (Backlog)',
          location: '',
          purchasePrice: 0,
          estimatedValue: 0,
          aftermarket: '',
          photo: null,
          scale: '1/20',
          addedAt: nowIso
        });
      });
      needCloudUpdate = true;
    }

    // Popolamento automatico dei 370 kit Tamiya 1/24 Sports Car Series (24001-24370) anche per account già esistenti
    if (
      !isSyncing124Batch &&
      typeof TAMIYA_1_24_MODELS !== 'undefined' &&
      Array.isArray(TAMIYA_1_24_MODELS) &&
      TAMIYA_1_24_MODELS.length > 0
    ) {
      const existing124Nums = new Set();
      cloudModels.forEach(m => {
        const match = String(m.kitCode || '').match(/\b(24\d{3})\b/);
        if (match) existing124Nums.add(match[1]);
      });
      if (existing124Nums.size < 50) {
        isSyncing124Batch = true;
        const nowIso = new Date().toISOString();
        let maxId = cloudModels.reduce((mx, m) => Math.max(mx, parseInt(m.id, 10) || 0), 0);
        const added124Models = [];
        for (const m of TAMIYA_1_24_MODELS) {
          const match = String(m.kitCode || '').match(/\b(24\d{3})\b/);
          const num = match ? match[1] : null;
          if (num && existing124Nums.has(num)) continue;
          maxId++;
          const newItem = {
            ...m,
            id: maxId,
            status: 'WISHLIST',
            progress: 0,
            stage: 'Non Iniziato (Backlog)',
            location: '',
            purchasePrice: 0,
            estimatedValue: 0,
            aftermarket: '',
            photo: null,
            scale: '1:24',
            addedAt: nowIso
          };
          cloudModels.push(newItem);
          added124Models.push(newItem);
          if (num) existing124Nums.add(num);
        }
        if (added124Models.length > 0 && userCol) {
          (async () => {
            try {
              const BATCH_SIZE = 250;
              for (let i = 0; i < added124Models.length; i += BATCH_SIZE) {
                const chunk = added124Models.slice(i, i + BATCH_SIZE);
                const batch = firestoreDb.batch();
                for (const item of chunk) {
                  batch.set(userCol.doc(String(item.id)), { ...item, id: item.id }, { merge: true });
                }
                await batch.commit();
              }
              showToast(`🚗 Aggiunti ${added124Models.length} kit Tamiya 1/24 Sports Car Series in Wishlist!`, 'cyan');
            } catch (e) {
              console.warn('Errore upload batch Tamiya 1/24:', e);
              isSyncing124Batch = false;
            }
          })();
        } else {
          isSyncing124Batch = false;
        }
      }
    }

    // Popolamento automatico Tamiya 1/48 Aircraft Series (61012-61129) per account esistenti
    if (!isSyncing148Batch && typeof TAMIYA_1_48_MODELS !== 'undefined' && Array.isArray(TAMIYA_1_48_MODELS) && TAMIYA_1_48_MODELS.length > 0 && cloudModels.length > 0) {
      const existing148Nums = new Set();
      cloudModels.forEach(m => {
        const match = String(m.kitCode || '').match(/\b(61\d{3})\b/);
        if (match) existing148Nums.add(match[1]);
      });
      if (existing148Nums.size < 50) {
        isSyncing148Batch = true;
        const nowIso = new Date().toISOString();
        let maxId = cloudModels.reduce((mx, m) => Math.max(mx, parseInt(m.id, 10) || 0), 0);
        const added148Models = [];
        for (const m of TAMIYA_1_48_MODELS) {
          const match = String(m.kitCode || '').match(/\b(61\d{3})\b/);
          const num = match ? match[1] : null;
          if (num && existing148Nums.has(num)) continue;
          maxId++;
          const newItem = {
            ...m,
            id: maxId,
            status: 'WISHLIST',
            progress: 0,
            stage: 'Non Iniziato (Backlog)',
            location: '',
            purchasePrice: 0,
            estimatedValue: 0,
            aftermarket: '',
            photo: null,
            scale: '1:48',
            category: 'Aerei / Velivoli',
            addedAt: nowIso
          };
          cloudModels.push(newItem);
          added148Models.push(newItem);
          if (num) existing148Nums.add(num);
        }
        if (added148Models.length > 0 && userCol) {
          (async () => {
            try {
              const BATCH_SIZE = 250;
              for (let i = 0; i < added148Models.length; i += BATCH_SIZE) {
                const chunk = added148Models.slice(i, i + BATCH_SIZE);
                const batch = firestoreDb.batch();
                for (const item of chunk) {
                  batch.set(userCol.doc(String(item.id)), { ...item, id: item.id }, { merge: true });
                }
                await batch.commit();
              }
              showToast(`✈️ Aggiunti ${added148Models.length} kit Tamiya 1/48 Aircraft Series in Wishlist!`, 'cyan');
            } catch (e) {
              console.warn('Errore upload batch Tamiya 1/48:', e);
              isSyncing148Batch = false;
            }
          })();
        } else {
          isSyncing148Batch = false;
        }
      }
    }

    // Popolamento automatico Tamiya 1/12 Big Scale Auto (12001-12057) + Motorcycle Series (14001-14144)
    if (!isSyncing112Batch && typeof TAMIYA_1_12_MODELS !== 'undefined' && Array.isArray(TAMIYA_1_12_MODELS) && TAMIYA_1_12_MODELS.length > 0 && cloudModels.length > 0) {
      const existing112Nums = new Set();
      cloudModels.forEach(m => {
        const match = String(m.kitCode || '').match(/\b((?:12|14)\d{3})\b/);
        if (match) existing112Nums.add(match[1]);
      });
      if (existing112Nums.size < 50) {
        isSyncing112Batch = true;
        const nowIso = new Date().toISOString();
        let maxId = cloudModels.reduce((mx, m) => Math.max(mx, parseInt(m.id, 10) || 0), 0);
        const added112Models = [];
        for (const m of TAMIYA_1_12_MODELS) {
          const match = String(m.kitCode || '').match(/\b((?:12|14)\d{3})\b/);
          const num = match ? match[1] : null;
          if (num && existing112Nums.has(num)) continue;
          maxId++;
          const newItem = {
            ...m,
            id: maxId,
            status: 'WISHLIST',
            progress: 0,
            stage: 'Non Iniziato (Backlog)',
            location: '',
            purchasePrice: 0,
            estimatedValue: 0,
            aftermarket: '',
            photo: null,
            scale: '1:12',
            category: m.category || 'Moto',
            addedAt: nowIso
          };
          cloudModels.push(newItem);
          added112Models.push(newItem);
          if (num) existing112Nums.add(num);
        }
        if (added112Models.length > 0 && userCol) {
          (async () => {
            try {
              const BATCH_SIZE = 250;
              for (let i = 0; i < added112Models.length; i += BATCH_SIZE) {
                const chunk = added112Models.slice(i, i + BATCH_SIZE);
                const batch = firestoreDb.batch();
                for (const item of chunk) {
                  batch.set(userCol.doc(String(item.id)), { ...item, id: item.id }, { merge: true });
                }
                await batch.commit();
              }
              showToast(`🏎️🏍️ Aggiunti ${added112Models.length} kit Tamiya 1/12 (Auto & Moto) in Wishlist!`, 'cyan');
            } catch (e) {
              console.warn('Errore upload batch Tamiya 1/12:', e);
              isSyncing112Batch = false;
            }
          })();
        } else {
          isSyncing112Batch = false;
        }
      }
    }

    // Popolamento automatico 1/20 Fujimi, Ebbro, Revell & Monogram per account esistenti
    if (!isSyncingExtra120Batch && typeof EXTRA_1_20_MODELS !== 'undefined' && Array.isArray(EXTRA_1_20_MODELS) && EXTRA_1_20_MODELS.length > 0 && cloudModels.length > 0) {
      const existingExtra120Codes = new Set();
      cloudModels.forEach(m => {
        const kc = String(m.kitCode || '').trim().toLowerCase();
        if (kc.startsWith('fujimi ') || kc.startsWith('ebbro ') || kc.startsWith('revell ') || kc.startsWith('monogram ')) {
          existingExtra120Codes.add(kc);
        }
      });
      if (existingExtra120Codes.size < 50) {
        isSyncingExtra120Batch = true;
        const nowIso = new Date().toISOString();
        let maxId = cloudModels.reduce((mx, m) => Math.max(mx, parseInt(m.id, 10) || 0), 0);
        const addedExtraModels = [];
        for (const m of EXTRA_1_20_MODELS) {
          const kc = String(m.kitCode || '').trim().toLowerCase();
          if (kc && existingExtra120Codes.has(kc)) continue;
          maxId++;
          const newItem = {
            ...m,
            id: maxId,
            status: 'WISHLIST',
            progress: 0,
            stage: 'Non Iniziato (Backlog)',
            location: '',
            purchasePrice: 0,
            estimatedValue: 0,
            aftermarket: '',
            photo: null,
            scale: '1/20',
            category: m.category || 'Formula 1',
            addedAt: nowIso
          };
          cloudModels.push(newItem);
          addedExtraModels.push(newItem);
          if (kc) existingExtra120Codes.add(kc);
        }
        if (addedExtraModels.length > 0 && userCol) {
          (async () => {
            try {
              const BATCH_SIZE = 250;
              for (let i = 0; i < addedExtraModels.length; i += BATCH_SIZE) {
                const chunk = addedExtraModels.slice(i, i + BATCH_SIZE);
                const batch = firestoreDb.batch();
                for (const item of chunk) {
                  batch.set(userCol.doc(String(item.id)), { ...item, id: item.id }, { merge: true });
                }
                await batch.commit();
              }
              showToast(`🏎️ Aggiunti ${addedExtraModels.length} kit 1/20 (Fujimi, Ebbro, Revell, Monogram) in Wishlist!`, 'cyan');
            } catch (e) {
              console.warn('Errore upload batch Extra 1/20:', e);
              isSyncingExtra120Batch = false;
            }
          })();
        } else {
          isSyncingExtra120Batch = false;
        }
      }
    }

    // Popolamento automatico Aerei 1:48 multimarca (Eduard, Academy, Airfix, Hobby Boss, Hasegawa, Italeri, Revell, Kinetic, Meng)
    if (!isSyncingExtra148Batch && typeof EXTRA_1_48_MODELS !== 'undefined' && Array.isArray(EXTRA_1_48_MODELS) && EXTRA_1_48_MODELS.length > 0 && cloudModels.length > 0) {
      const existingExtra148Codes = new Set();
      cloudModels.forEach(m => {
        const kc = String(m.kitCode || '').trim().toLowerCase();
        if (
          m.scale === '1:48' && (
            kc.startsWith('eduard ') || kc.startsWith('academy ') || kc.startsWith('airfix ') ||
            kc.startsWith('hobby boss ') || kc.startsWith('hasegawa ') || kc.startsWith('italeri ') ||
            kc.startsWith('revell ') || kc.startsWith('kinetic ') || kc.startsWith('meng ')
          )
        ) {
          existingExtra148Codes.add(kc);
        }
      });
      if (existingExtra148Codes.size < 50) {
        isSyncingExtra148Batch = true;
        const nowIso = new Date().toISOString();
        let maxId = cloudModels.reduce((mx, m) => Math.max(mx, parseInt(m.id, 10) || 0), 0);
        const addedExtra148Models = [];
        for (const m of EXTRA_1_48_MODELS) {
          const kc = String(m.kitCode || '').trim().toLowerCase();
          if (kc && existingExtra148Codes.has(kc)) continue;
          maxId++;
          const newItem = {
            ...m,
            id: maxId,
            status: 'WISHLIST',
            progress: 0,
            stage: 'Non Iniziato (Backlog)',
            location: '',
            purchasePrice: 0,
            estimatedValue: 0,
            aftermarket: '',
            photo: null,
            scale: '1:48',
            category: 'Aerei / Velivoli',
            addedAt: nowIso
          };
          cloudModels.push(newItem);
          addedExtra148Models.push(newItem);
          if (kc) existingExtra148Codes.add(kc);
        }
        if (addedExtra148Models.length > 0 && userCol) {
          (async () => {
            try {
              const BATCH_SIZE = 250;
              for (let i = 0; i < addedExtra148Models.length; i += BATCH_SIZE) {
                const chunk = addedExtra148Models.slice(i, i + BATCH_SIZE);
                const batch = firestoreDb.batch();
                for (const item of chunk) {
                  batch.set(userCol.doc(String(item.id)), { ...item, id: item.id }, { merge: true });
                }
                await batch.commit();
              }
              showToast(`✈️ Aggiunti ${addedExtra148Models.length} kit aerei 1:48 multimarca in Wishlist!`, 'cyan');
            } catch (e) {
              console.warn('Errore upload batch Extra 1:48:', e);
              isSyncingExtra148Batch = false;
            }
          })();
        } else {
          isSyncingExtra148Batch = false;
        }
      }
    }

    // Popolamento automatico Auto 1:24 multimarca (Hasegawa, Italeri, Revell, Heller, Fujimi, Aoshima, Beemax / NuNu, Belkits)
    if (!isSyncingExtra124Batch && typeof EXTRA_1_24_MODELS !== 'undefined' && Array.isArray(EXTRA_1_24_MODELS) && EXTRA_1_24_MODELS.length > 0 && cloudModels.length > 0) {
      const existingExtra124Codes = new Set();
      cloudModels.forEach(m => {
        const kc = String(m.kitCode || '').trim().toLowerCase();
        if (
          m.scale === '1:24' && (
            kc.startsWith('hasegawa ') || kc.startsWith('italeri ') || kc.startsWith('revell ') ||
            kc.startsWith('heller ') || kc.startsWith('fujimi ') || kc.startsWith('aoshima ') ||
            kc.startsWith('beemax / nunu ') || kc.startsWith('belkits ')
          )
        ) {
          existingExtra124Codes.add(kc);
        }
      });
      if (existingExtra124Codes.size < 50) {
        isSyncingExtra124Batch = true;
        const nowIso = new Date().toISOString();
        let maxId = cloudModels.reduce((mx, m) => Math.max(mx, parseInt(m.id, 10) || 0), 0);
        const addedExtra124Models = [];
        for (const m of EXTRA_1_24_MODELS) {
          const kc = String(m.kitCode || '').trim().toLowerCase();
          if (kc && existingExtra124Codes.has(kc)) continue;
          maxId++;
          const newItem = {
            ...m,
            id: maxId,
            status: 'WISHLIST',
            progress: 0,
            stage: 'Non Iniziato (Backlog)',
            location: '',
            purchasePrice: 0,
            estimatedValue: 0,
            aftermarket: '',
            photo: null,
            scale: '1:24',
            category: m.category || 'Sport Car',
            addedAt: nowIso
          };
          cloudModels.push(newItem);
          addedExtra124Models.push(newItem);
          if (kc) existingExtra124Codes.add(kc);
        }
        if (addedExtra124Models.length > 0 && userCol) {
          (async () => {
            try {
              const BATCH_SIZE = 250;
              for (let i = 0; i < addedExtra124Models.length; i += BATCH_SIZE) {
                const chunk = addedExtra124Models.slice(i, i + BATCH_SIZE);
                const batch = firestoreDb.batch();
                for (const item of chunk) {
                  batch.set(userCol.doc(String(item.id)), { ...item, id: item.id }, { merge: true });
                }
                await batch.commit();
              }
              showToast(`🚗 Aggiunti ${addedExtra124Models.length} kit auto 1:24 multimarca in Wishlist!`, 'cyan');
            } catch (e) {
              console.warn('Errore upload batch Extra 1:24:', e);
              isSyncingExtra124Batch = false;
            }
          })();
        } else {
          isSyncingExtra124Batch = false;
        }
      }
    }

    // Rimozione una tantum del duplicato KIT_0047 (id 47 / Tamiya 20047)
    const remove47FlagKey = `modelkit_remove_kit_0047_v1_${activeUserId}`;
    if (!localStorage.getItem(remove47FlagKey)) {
      const idsToDelete = [];
      for (let i = cloudModels.length - 1; i >= 0; i--) {
        const m = cloudModels[i];
        const codeLower = (m.kitCode || '').trim().toLowerCase();
        if (Number(m.id) === 47 || codeLower === 'tamiya 20047') {
          idsToDelete.push(String(m.id));
          cloudModels.splice(i, 1);
        }
      }
      if (idsToDelete.length > 0 && userCol) {
        idsToDelete.forEach(docId => {
          userCol.doc(docId).delete().catch(e => console.warn('Errore eliminazione KIT_0047 su Firestore:', e));
        });
      }
      localStorage.setItem(remove47FlagKey, '1');
    }

    allModels = cloudModels;

    // Sicurezza: nessun reset automatico sui dati utente (preserva sempre "In Possesso", "Costruito", prezzi, note e collocazioni)

    for (const m of cloudModels) {
      if (normalizeModelTaxonomy(m, false)) {
        needCloudUpdate = true;
      }
    }

    if (needCloudUpdate && userCol) {
      setTimeout(async () => {
        try {
          const BATCH_SIZE = 400;
          for (let i = 0; i < cloudModels.length; i += BATCH_SIZE) {
            const chunk = cloudModels.slice(i, i + BATCH_SIZE);
            const batch = firestoreDb.batch();
            for (const m of chunk) {
              const docId = String(m.id);
              batch.set(userCol.doc(docId), { ...m, id: m.id }, { merge: true });
            }
            await batch.commit();
          }
          console.log('☁️ Tamiya 1/20 ripristinati in Wishlist e sincronizzati sul database personale!');
        } catch (e) {
          console.warn('Errore sync batch aggiornamento:', e);
        }
      }, 400);
    }

    // Aggiorna IndexedDB locale personale dell'utente in background (non bloccante)
    scheduleIndexedDbMirror(cloudModels);

    renderBrandFilterButtons();
    renderGrid();
    refreshStats();
    isApplyingCloudSnapshot = false;

    // Aggiorna contatore modellini nel profilo utente su Firestore (per pannello Admin)
    if (firestoreDb && activeUserId && cloudModels.length !== lastReportedModelsCount) {
      lastReportedModelsCount = cloudModels.length;
      firestoreDb.collection('users').doc(activeUserId).set({
        modelsCount: cloudModels.length,
        lastLoginAt: new Date().toISOString()
      }, { merge: true }).catch(() => {});
    }
  }, async (err) => {
    console.warn('Firestore snapshot error:', err);
    if (err && err.code === 'permission-denied') {
      isCloudSyncActive = false;
      updateAuthUI(currentCloudUser, 'Permessi Firestore mancanti per users/{uid}/models: aggiorna le Regole di Sicurezza in Firebase Console (modalità locale attiva).');
      showToast('⚠️ Regole Firestore da aggiornare — archivio locale caricato!', 'amber');
    }
    // Se il cloud non è raggiungibile o bloccato e l'archivio locale è vuoto, popola comunque il catalogo locale!
    if (allModels.length === 0 && activeUserId) {
      await seedNewUserPersonalArchive();
    }
  });
}

async function saveModel(model) {
  let id = model.id;
  if (db) {
    id = await new Promise((resolve, reject) => {
      const tx    = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req   = model.id ? store.put(model) : store.add(model);
      req.onsuccess = () => resolve(req.result);
      req.onerror   = () => reject(req.error);
    });
    model.id = id;
  }

  // Sincronizzazione automatica nel database personale dell'utente su Cloud Firestore
  const userCol = getUserModelsCollection();
  if (userCol && isCloudSyncActive && !isApplyingCloudSnapshot) {
    try {
      const docId = String(model.id || Date.now());
      await userCol.doc(docId).set({ ...model, id: model.id }, { merge: true });
    } catch (err) {
      console.error('Errore sincronizzazione Cloud saveModel:', err);
    }
  }

  return id;
}

async function deleteModelById(id) {
  if (db) {
    await new Promise((resolve, reject) => {
      const tx    = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req   = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror   = () => reject(req.error);
    });
  }

  // Eliminazione automatica nel database personale dell'utente su Cloud Firestore
  const userCol = getUserModelsCollection();
  if (userCol && isCloudSyncActive && !isApplyingCloudSnapshot) {
    try {
      await userCol.doc(String(id)).delete();
    } catch (err) {
      console.error('Errore eliminazione Cloud deleteModelById:', err);
    }
  }
}

// ─── FILTERS & SORTING ──────────────────────────────────────────────────────
function getFilteredSorted() {
  let list = [...allModels];

  if (filterStatus !== 'ALL') {
    list = list.filter(m => m.status === filterStatus);
  }
  if (filterScale !== 'ALL') {
    list = list.filter(m => {
      if (filterScale === '1/20') {
        return m.scale === '1/20' || m.scale === '1:20' || m.scale === '1/20 Grand Prix' || m.scale === 'Formula 1';
      }
      if (filterScale === '1:24') {
        return m.scale === '1:24' || m.scale === '1/24';
      }
      if (filterScale === '1:12') return m.scale === '1:12' || m.scale === '1/12';
      if (filterScale === '1:18') return m.scale === '1:18' || m.scale === '1/18';
      if (filterScale === '1:43') return m.scale === '1:43' || m.scale === '1/43';
      if (filterScale === '1:35') return m.scale === '1:35' || m.scale === '1/35';
      if (filterScale === '1:48') return m.scale === '1:48' || m.scale === '1/48';
      if (filterScale === 'OTHER') {
        const standardScales = ['1/20', '1:20', '1/20 Grand Prix', 'Formula 1', '1:24', '1/24', '1:12', '1/12', '1:18', '1/18', '1:43', '1/43', '1:35', '1/35', '1:48', '1/48'];
        return !standardScales.includes(m.scale);
      }
      return m.scale === filterScale;
    });
  }
  if (filterCategory !== 'ALL') {
    list = list.filter(m => {
      if (filterCategory === 'Sport Car') {
        return m.category === 'Sport Car' || m.category === '1/24 Sports Car Series';
      }
      if (filterCategory === 'Formula 1') {
        return m.category === 'Formula 1';
      }
      if (filterCategory === 'Rally') {
        return m.category === 'Rally' || isRallyModel(m);
      }
      return m.category === filterCategory;
    });
  }
  if (filterBrand && filterBrand !== 'ALL') {
    const targetBrand = filterBrand.trim().toLowerCase();
    if (targetBrand) {
      list = list.filter(m => {
        const mb = (m.brand || '').trim().toLowerCase();
        if (targetBrand === 'mfh') return mb.includes('model factory hiro') || mb.includes('mfh');
        return mb.includes(targetBrand);
      });
    }
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(m =>
      (m.name   || '').toLowerCase().includes(q) ||
      (m.brand  || '').toLowerCase().includes(q) ||
      (m.kitCode|| '').toLowerCase().includes(q) ||
      (m.notes  || '').toLowerCase().includes(q)
    );
  }

  list.sort((a, b) => {
    switch (sortKey) {
      case 'kitCode': {
        const codeA = a.kitCode || '';
        const codeB = b.kitCode || '';
        if (!codeA && !codeB) return (a.name || '').localeCompare(b.name || '');
        if (!codeA) return 1;
        if (!codeB) return -1;
        return codeA.localeCompare(codeB, undefined, { numeric: true, sensitivity: 'base' });
      }
      case 'progress': return (b.progress || 0) - (a.progress || 0);
      case 'brand':    return (a.brand || '').localeCompare(b.brand || '');
      case 'date':     return (b.id || 0) - (a.id || 0);
      case 'value':    return (b.estimatedValue || 0) - (a.estimatedValue || 0);
      default:         return (a.name || '').localeCompare(b.name || '');
    }
  });

  return list;
}

// ─── STATS & GAUGES ─────────────────────────────────────────────────────────
function refreshStats() {
  const total     = allModels.length;
  const completed = allModels.filter(m => m.status === 'COMPLETED').length;
  const wip       = allModels.filter(m => m.status === 'WIP').length;
  const backlog   = allModels.filter(m => m.status === 'BACKLOG').length;
  const wishlist  = allModels.filter(m => m.status === 'WISHLIST').length;

  const completionPct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const wipRatio      = total > 0 ? Math.round((wip / total) * 100) : 0;
  const totalPurchase = allModels.reduce((s, m) => s + (parseFloat(m.purchasePrice) || 0), 0);
  const totalEstimated= allModels.reduce((s, m) => s + (parseFloat(m.estimatedValue) || 0), 0);

  // Update DOM (con controlli null-safe per elementi rimossi dalla pagina principale)
  if ($('statCompletedCount')) $('statCompletedCount').textContent = completed;
  if ($('statWipCount'))       $('statWipCount').textContent       = wip;
  if ($('statBacklogCount'))   $('statBacklogCount').textContent   = backlog + wishlist;
  if ($('speedTotalVal'))      $('speedTotalVal').textContent      = total;
  if ($('tachoRateVal'))       $('tachoRateVal').textContent       = completionPct + '%';
  if ($('valPurchaseTotal'))   $('valPurchaseTotal').textContent   = totalPurchase.toFixed(2);
  if ($('valEstimatedTotal'))  $('valEstimatedTotal').textContent  = totalEstimated.toFixed(2);
  if ($('boostFillBar'))       $('boostFillBar').style.width       = wipRatio + '%';
  if ($('boostRatioText'))     $('boostRatioText').textContent     = (wipRatio / 10).toFixed(1) + ' BAR';
  if ($('tapeCounter'))        $('tapeCounter').textContent        = String(total).padStart(4, '0');

  // Animate tachometer (completion gauge)
  animateRadialGauge('tachoActiveArc', 'tachoNeedle', completionPct, 380, -225, 45);
  // Animate speedometer (total / max 50 units shown)
  const speedPct = total > 0 ? Math.min((total / 50) * 100, 100) : 0;
  animateRadialGauge('speedActiveArc', 'speedNeedle', speedPct, 380, -225, 45);

  // Scale distribution pills
  renderScalePills();

  // Tape reel animation
  const reelAnim = total > 0 && wip > 0;
  ['tapeReelLeft', 'tapeReelRight'].forEach(id => {
    const el = $(id);
    if (!el) return;
    if (reelAnim) el.classList.add('tape-reel-spinning');
    else          el.classList.remove('tape-reel-spinning');
  });
}

function animateRadialGauge(arcId, needleId, pct, totalDash, startAngle, endAngle) {
  const offset = totalDash - (totalDash * (pct / 100));
  const arc = $(arcId);
  if (arc) arc.style.strokeDashoffset = offset;

  const needle = $(needleId);
  if (needle) {
    const angle = startAngle + ((endAngle - startAngle) * (pct / 100));
    needle.style.transform = `rotate(${angle}deg)`;
  }
}

function generateGaugeTicks() {
  ['tachoTicksGroup', 'speedTicksGroup'].forEach(groupId => {
    const g = $(groupId);
    if (!g) return;
    g.innerHTML = '';
    const cx = 120, cy = 130, r = 82;
    const startDeg = -225, totalSweep = 270;
    const numTicks = 24;

    for (let i = 0; i <= numTicks; i++) {
      const angle = (startDeg + (totalSweep / numTicks) * i) * (Math.PI / 180);
      const innerR = i % 4 === 0 ? r - 14 : r - 8;
      const x1 = cx + r      * Math.cos(angle);
      const y1 = cy + r      * Math.sin(angle);
      const x2 = cx + innerR * Math.cos(angle);
      const y2 = cy + innerR * Math.sin(angle);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1); line.setAttribute('y1', y1);
      line.setAttribute('x2', x2); line.setAttribute('y2', y2);
      line.setAttribute('stroke', i % 4 === 0 ? '#526B60' : '#2C3D36');
      line.setAttribute('stroke-width', i % 4 === 0 ? '2' : '1');
      g.appendChild(line);
    }
  });
}

function renderScalePills() {
  const container = $('scaleDistributionPills');
  if (!container) return;
  const counts = {};
  allModels.forEach(m => {
    const s = m.scale || 'OTHER';
    counts[s] = (counts[s] || 0) + 1;
  });
  container.innerHTML = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([scale, count]) =>
      `<span class="scale-pill">${scale} (${count})</span>`
    ).join('');
}

let idbMirrorTimer = null;
function scheduleIndexedDbMirror(models) {
  if (!db) return;
  if (idbMirrorTimer) clearTimeout(idbMirrorTimer);
  const snapshotCopy = models.slice();
  idbMirrorTimer = setTimeout(() => {
    idbMirrorTimer = null;
    if (!db) return;
    try {
      const clearTx = db.transaction(STORE_NAME, 'readwrite');
      clearTx.objectStore(STORE_NAME).clear();
      clearTx.oncomplete = () => {
        const CHUNK = 200;
        let idx = 0;
        const writeChunk = () => {
          if (!db || idx >= snapshotCopy.length) return;
          try {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const end = Math.min(idx + CHUNK, snapshotCopy.length);
            for (let i = idx; i < end; i++) {
              store.put(snapshotCopy[i]);
            }
            idx = end;
            if (idx < snapshotCopy.length) {
              setTimeout(writeChunk, 25);
            }
          } catch (e) {
            console.warn('Errore scrittura chunk IndexedDB:', e);
          }
        };
        writeChunk();
      };
    } catch (e) {
      console.warn('Errore mirror IndexedDB:', e);
    }
  }, 800);
}

// ─── MODEL CARD RENDERER ────────────────────────────────────────────────────
const GRID_PAGE_SIZE = 48;
let lastFilteredModels = [];
let renderedGridCount = 0;
let gridScrollObserver = null;

window.handleBoxartError = function(img, modelId) {
  if (!img) return;
  if (img.dataset.altSrc && img.src.indexOf(img.dataset.altSrc) === -1) {
    const alt = img.dataset.altSrc;
    img.dataset.altSrc = '';
    img.src = alt;
    return;
  }
  img.onerror = null;
  const model = allModels.find(m => Number(m.id) === Number(modelId)) || { name: img.alt || 'MODEL KIT', scale: '1:24', kitCode: '' };
  img.src = generateBoxartSvg(model);
};

function getEffectivePhotoInfo(model, includeFallbackSvg = true) {
  const boxartPath = getBoxartPath(model);
  const altBoxartPath = boxartPath ? boxartPath.replace('boxart/BOX_', 'boxart/TAM') : '';
  const rawPhoto = (model.photo || '').trim();
  const isCustomPhoto = rawPhoto && !rawPhoto.startsWith('data:image/svg+xml') && !rawPhoto.startsWith('boxart/');
  const needSvgNow = includeFallbackSvg || (!isCustomPhoto && !boxartPath);
  const svgFallback = needSvgNow ? generateBoxartSvg(model) : '';
  const displayPhoto = isCustomPhoto ? rawPhoto : (boxartPath || svgFallback);
  const isBoxart = !isCustomPhoto;
  return { displayPhoto, boxartPath, altBoxartPath, svgFallback, isBoxart };
}

function renderModelCard(model) {
  const progress = model.progress || 0;
  const { displayPhoto, altBoxartPath, isBoxart } = getEffectivePhotoInfo(model, false);

  const photoHtml = `
    <div class="boxart-card-container">
      <img class="card-photo-img boxart-img" 
           src="${displayPhoto}" 
           alt="${escHtml(model.name)}" 
           loading="lazy"
           decoding="async"
           data-alt-src="${altBoxartPath}"
           onerror="window.handleBoxartError(this, ${Number(model.id) || 0})">
      ${isBoxart ? '<span class="boxart-stamp-pill">📦 SCATOLA KIT</span>' : ''}
    </div>`;

  const idxTag = `// KIT_${String(model.id || 0).padStart(4, '0')}`;
  const is120 = model.scale === '1/20' || model.scale === '1:20' || model.scale === '1/20 Grand Prix' || model.scale === 'Formula 1';
  const scaleTagClass = is120 ? 'scale-tamiya-gp' : '';
  const displayScale = is120 ? '1/20' : (model.scale || '');

  return `
    <article class="model-card" data-id="${model.id}" tabindex="0" role="button" aria-label="Apri dettaglio: ${model.name}">
      <div class="card-utility-strip">
        <span class="card-tag">${idxTag}</span>
        <span class="card-status-badge status-${model.status}">${STATUS_LABELS[model.status] || model.status}</span>
      </div>
      <div class="card-photo-area">${photoHtml}</div>
      <div class="card-body">
        <h3 class="card-model-name"><span class="card-model-title">${escHtml(model.name)}</span>${model.kitCode ? ` <span class="card-model-code">— ${escHtml(model.kitCode)}</span>` : ''}</h3>
        <div class="card-brand-scale">
          <span class="card-brand">${escHtml(model.brand)}</span>
          <span class="card-scale-tag ${scaleTagClass}">${escHtml(displayScale)}</span>
          ${model.year ? `<span class="card-scale-tag" style="background:#141C19;color:#9BAEA6;border-color:#2E3F38;">${escHtml(model.year)}</span>` : ''}
        </div>
        <div class="card-wip-section">
          <div class="card-wip-header">
            <span class="card-wip-label">PROGRESSO BUILD</span>
            <span class="card-wip-pct">${progress}%</span>
          </div>
          <div class="card-progress-track">
            <div class="card-progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
        <span class="card-stage-text">${escHtml(model.stage || 'N/A')}</span>
      </div>
      <div class="card-actions-row">
        <button class="card-btn" data-action="detail" data-id="${model.id}">DETTAGLI</button>
      </div>
    </article>`;
}

function ensureGridLoadMoreBar() {
  const grid = $('modelsGrid');
  if (!grid || !grid.parentNode) return null;
  let wrap = $('gridLoadMoreWrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'gridLoadMoreWrap';
    wrap.style.cssText = 'display:none; justify-content:center; align-items:center; padding:1.25rem 0 1.5rem; width:100%;';
    wrap.innerHTML = `<button type="button" id="btnGridLoadMore" class="arcade-action-btn" style="padding:10px 22px; font-family:var(--font-mono); font-size:11px; letter-spacing:0.08em;">▼ CARICA ALTRI MODELLI</button>`;
    grid.insertAdjacentElement('afterend', wrap);
    const btn = $('btnGridLoadMore');
    if (btn) btn.addEventListener('click', () => appendNextGridPage());
  }
  return wrap;
}

function updateGridLoadMoreBar() {
  const wrap = ensureGridLoadMoreBar();
  if (!wrap) return;
  const remaining = lastFilteredModels.length - renderedGridCount;
  if (remaining <= 0) {
    wrap.style.display = 'none';
    if (gridScrollObserver) gridScrollObserver.disconnect();
    return;
  }
  wrap.style.display = 'flex';
  const btn = $('btnGridLoadMore');
  if (btn) {
    const nextBatch = Math.min(GRID_PAGE_SIZE, remaining);
    btn.textContent = `▼ CARICA ALTRI ${nextBatch} (${renderedGridCount} / ${lastFilteredModels.length})`;
  }
  if ('IntersectionObserver' in window) {
    if (!gridScrollObserver) {
      gridScrollObserver = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting)) {
          appendNextGridPage();
        }
      }, { rootMargin: '400px 0px' });
    }
    gridScrollObserver.disconnect();
    gridScrollObserver.observe(wrap);
  }
}

function appendNextGridPage() {
  const grid = $('modelsGrid');
  if (!grid || renderedGridCount >= lastFilteredModels.length) return;
  const nextEnd = Math.min(renderedGridCount + GRID_PAGE_SIZE, lastFilteredModels.length);
  const slice = lastFilteredModels.slice(renderedGridCount, nextEnd);
  grid.insertAdjacentHTML('beforeend', slice.map(renderModelCard).join(''));
  renderedGridCount = nextEnd;
  updateGridLoadMoreBar();
}

function renderGrid() {
  const grid         = $('modelsGrid');
  const emptyState   = $('emptyStateContainer');
  const countTag     = $('activeFilterCountTag');
  const filtered     = getFilteredSorted();

  lastFilteredModels = filtered;
  renderedGridCount = 0;

  countTag.textContent = `${filtered.length} MODELL${filtered.length === 1 ? 'O' : 'I'} VISUALIZZAT${filtered.length === 1 ? 'O' : 'I'}`;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = '';
    updateGridLoadMoreBar();
  } else {
    emptyState.style.display = 'none';
    const initialEnd = Math.min(GRID_PAGE_SIZE, filtered.length);
    grid.innerHTML = filtered.slice(0, initialEnd).map(renderModelCard).join('');
    renderedGridCount = initialEnd;
    updateGridLoadMoreBar();
  }
}

function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── MODAL: ADD / EDIT (SOLO ADMIN) ──────────────────────────────────────────
function openNewModelModal() {
  if (!isAdminUser(currentCloudUser)) {
    showToast('🔒 Funzione riservata esclusivamente all\'Admin', 'error');
    return;
  }
  editingId           = null;
  currentPhotoDataUrl = null;
  $('modelForm').reset();
  $('formModelId').value        = '';
  $('formProgress').value       = 0;
  $('formProgressDisplay').textContent = '0%';
  if ($('formDecalsOriginal')) $('formDecalsOriginal').value = '';
  if ($('formDecalsAftermarket')) $('formDecalsAftermarket').value = '';
  if ($('btnRemovePhoto')) $('btnRemovePhoto').style.display = 'none';
  document.querySelectorAll('input[name="formStatus"]').forEach(r => {
    r.checked = (r.value === 'WISHLIST');
  });
  $('formPhotoPreview').style.display  = 'block';
  $('formPhotoPreview').src     = generateBoxartSvg({ name: 'NUOVO MODELLO', scale: '1:24', kitCode: 'TAMIYA KIT' });
  $('modalWindowTitle').textContent    = 'REGISTRAZIONE NUOVO MODELLINO';
  if ($('btnDeleteInEditModal')) $('btnDeleteInEditModal').style.setProperty('display', 'none', 'important');
  $('modelModalBackdrop').style.display = '';
  document.body.style.overflow  = 'hidden';
}

function openEditModelModal(model) {
  if (!isAdminUser(currentCloudUser)) {
    showToast('🔒 Solo l\'Admin può modificare le schede catalogo', 'error');
    return;
  }
  editingId           = model.id;
  currentPhotoDataUrl = model.photo || null;
  if ($('btnRemovePhoto')) $('btnRemovePhoto').style.display = currentPhotoDataUrl ? '' : 'none';
  $('formModelId').value        = model.id;
  $('formName').value           = model.name || '';
  $('formBrand').value          = model.brand || '';
  let formScaleVal = model.scale || '1:24';
  if (formScaleVal === '1:20' || formScaleVal === '1/20 Grand Prix' || formScaleVal === 'Formula 1') {
    formScaleVal = '1/20';
  }
  $('formScale').value          = formScaleVal;
  $('formKitCode').value        = model.kitCode || '';
  let formCatVal = model.category || 'Sport Car';
  if (formCatVal === '1/24 Sports Car Series') formCatVal = 'Sport Car';
  if (formCatVal === 'Auto Corsa / Rally') formCatVal = isRallyModel(model) ? 'Rally' : 'Formula 1';
  $('formCategory').value       = formCatVal;
  $('formLocation').value       = model.location || '';
  $('formYear').value           = model.year || '';
  $('formPurchasePrice').value  = model.purchasePrice || '';
  $('formEstimatedValue').value = model.estimatedValue || '';
  $('formPaints').value         = model.paints || '';
  $('formAftermarket').value    = model.aftermarket || '';
  if ($('formDecalsOriginal')) $('formDecalsOriginal').value = model.decalsOriginal || '';
  if ($('formDecalsAftermarket')) $('formDecalsAftermarket').value = model.decalsAftermarket || '';
  $('formNotes').value          = model.notes || '';
  $('formProgress').value       = model.progress || 0;
  $('formProgressDisplay').textContent = (model.progress || 0) + '%';
  $('formStage').value          = model.stage || 'Non Iniziato (Backlog)';

  // Status radio (default WISHLIST)
  const targetStatus = model.status || 'WISHLIST';
  document.querySelectorAll('input[name="formStatus"]').forEach(r => {
    r.checked = (r.value === targetStatus);
  });

  // Mostra la foto del modello presente sulla lista
  const { displayPhoto: editDisplayPhoto, altBoxartPath: editAltPath, svgFallback: editSvgFallback } = getEffectivePhotoInfo(model);
  $('formPhotoPreview').src = editDisplayPhoto;
  $('formPhotoPreview').onerror = function() {
    if (editAltPath && this.src.indexOf(editAltPath) === -1) {
      this.src = editAltPath;
    } else {
      this.onerror = null;
      this.src = editSvgFallback;
    }
  };
  $('formPhotoPreview').style.display = 'block';

  $('modalWindowTitle').textContent = 'MODIFICA MODELLINO // ' + (model.name || '').toUpperCase();
  if ($('btnDeleteInEditModal')) {
    if (isAdminUser(currentCloudUser)) {
      $('btnDeleteInEditModal').style.removeProperty('display');
    } else {
      $('btnDeleteInEditModal').style.setProperty('display', 'none', 'important');
    }
  }
  $('modelModalBackdrop').style.display = '';
  document.body.style.overflow  = 'hidden';
}

function closeModal(modalId) {
  $(modalId).style.display = 'none';
  document.body.style.overflow = '';
}

// ─── MODAL: DETAIL VIEW ──────────────────────────────────────────────────────
function openDetailModal(model) {
  $('detailHeaderTitle').textContent = `${model.name || 'SCHEDA DETTAGLIO'}${model.kitCode ? ` — ${model.kitCode}` : ''}`;
  const c = $('detailContentContainer');

  const { displayPhoto, altBoxartPath, svgFallback, isBoxart } = getEffectivePhotoInfo(model);

  const photoSection = `
    <div class="detail-photo-banner boxart-detail-banner">
      <img src="${displayPhoto}" alt="${escHtml(model.name)}" data-alt-src="${altBoxartPath}" onerror="if(this.dataset.altSrc && this.src.indexOf(this.dataset.altSrc)===-1){var a=this.dataset.altSrc;this.dataset.altSrc='';this.src=a;}else{this.onerror=null;this.src='${svgFallback}';}">
      ${isBoxart ? '<span class="boxart-stamp-pill detail-stamp">📦 CONFEZIONE ORIGINALE // KIT DA MONTARE</span>' : ''}
    </div>`;

  const valueDisplay = m => (m > 0 ? '€ ' + parseFloat(m).toFixed(2) : '—');

  const isAdmin = isAdminUser(currentCloudUser);

  const personalUpdatePanel = !isAdmin ? `
    <div style="background:#141C19; border:1px solid #2E3F38; border-left:3px solid #F59E0B; border-radius:6px; padding:12px 14px; display:flex; flex-direction:column; gap:10px;">
      <span style="font-family:var(--font-mono); font-size:10px; font-weight:800; color:#F59E0B; letter-spacing:0.08em;">// AGGIORNA IL TUO STATO PERSONALE</span>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <div class="control-pod">
          <label class="control-pod-label" for="userQuickStatus">STATO MODELLINO</label>
          <div class="telemetry-select-wrapper">
            <select id="userQuickStatus" class="telemetry-select">
              <option value="BACKLOG" ${model.status === 'BACKLOG' ? 'selected' : ''}>📦 IN POSSESSO</option>
              <option value="IN_TRANSIT" ${model.status === 'IN_TRANSIT' ? 'selected' : ''}>🚚 ACQUISTATO IN ARRIVO</option>
              <option value="WIP" ${model.status === 'WIP' ? 'selected' : ''}>🔧 IN COSTRUZIONE</option>
              <option value="COMPLETED" ${model.status === 'COMPLETED' ? 'selected' : ''}>🏆 COSTRUITO</option>
              <option value="WISHLIST" ${model.status === 'WISHLIST' ? 'selected' : ''}>🔍 MANCANTE</option>
              <option value="NOT_INTERESTED" ${model.status === 'NOT_INTERESTED' ? 'selected' : ''}>🚫 MANCANTE (NON INT.)</option>
              <option value="OTHER" ${model.status === 'OTHER' ? 'selected' : ''}>📌 ALTRO</option>
            </select>
            <span class="select-indicator">▼</span>
          </div>
        </div>
        <div class="control-pod">
          <label class="control-pod-label" for="userQuickProgress">AVANZAMENTO WIP: <strong id="userQuickProgressVal" style="color:#FCD34D;">${model.progress || 0}%</strong></label>
          <input type="range" id="userQuickProgress" min="0" max="100" step="5" value="${model.progress || 0}" style="width:100%; accent-color:#F59E0B; margin-top:8px;">
        </div>
      </div>
      <div class="control-pod">
        <label class="control-pod-label" for="userQuickNotes">NOTE PERSONALI</label>
        <textarea id="userQuickNotes" rows="2" class="cockpit-textarea" style="background:#111816; border:1px solid #2E3F38; border-radius:4px; padding:8px; color:#E8EFEA; font-family:var(--font-mono); font-size:11px;" placeholder="Aggiungi note personali sul tuo kit...">${escHtml(model.notes || '')}</textarea>
      </div>
      <button type="button" class="arcade-turbo-btn" id="btnUserQuickSave" style="justify-content:center;">💾 SALVA STATO PERSONALE</button>
    </div>` : '';

  const adminActionsHtml = isAdmin ? `
      <button class="arcade-action-btn" id="detailEditBtn">✏️ MODIFICA</button>` : '';

  c.innerHTML = `
    ${photoSection}
    ${personalUpdatePanel}
    <div class="detail-info-grid">
      <div class="detail-info-block" style="grid-column: 1 / -1;"><span class="detail-info-label">DESCRIZIONE E CODICE KIT</span><span class="detail-info-value" style="font-size:16px; color:#F3F7F5; font-weight:800;">${escHtml(model.name)}${model.kitCode ? ` — ${escHtml(model.kitCode)}` : ''}</span></div>
      <div class="detail-info-block"><span class="detail-info-label">MODELLO</span><span class="detail-info-value">${escHtml(model.name)}</span></div>
      <div class="detail-info-block"><span class="detail-info-label">MARCHIO</span><span class="detail-info-value">${escHtml(model.brand)}</span></div>
      <div class="detail-info-block"><span class="detail-info-label">SCALA</span><span class="detail-info-value">${escHtml(model.scale)}</span></div>
      <div class="detail-info-block"><span class="detail-info-label">CATEGORIA</span><span class="detail-info-value">${escHtml(model.category || '—')}</span></div>
      <div class="detail-info-block"><span class="detail-info-label">CODICE KIT</span><span class="detail-info-value">${escHtml(model.kitCode || '—')}</span></div>
      <div class="detail-info-block"><span class="detail-info-label">STATO</span><span class="detail-info-value">${STATUS_LABELS[model.status] || model.status}</span></div>
      <div class="detail-info-block"><span class="detail-info-label">AVANZAMENTO BUILD</span><span class="detail-info-value">${model.progress || 0}%</span></div>
      <div class="detail-info-block"><span class="detail-info-label">FASE CORRENTE</span><span class="detail-info-value">${escHtml(model.stage || '—')}</span></div>
      <div class="detail-info-block"><span class="detail-info-label">COLLOCAZIONE</span><span class="detail-info-value">${escHtml(model.location || '—')}</span></div>
      <div class="detail-info-block"><span class="detail-info-label">ANNO ACQUISTO</span><span class="detail-info-value">${escHtml(model.year || '—')}</span></div>
      <div class="detail-info-block"><span class="detail-info-label">PREZZO ACQUISTO</span><span class="detail-info-value">${valueDisplay(model.purchasePrice)}</span></div>
      <div class="detail-info-block"><span class="detail-info-label">VALORE STIMATO</span><span class="detail-info-value">${valueDisplay(model.estimatedValue)}</span></div>
      <div class="detail-info-block"><span class="detail-info-label">DECALS (ORIGINALI / STATO)</span><span class="detail-info-value">${escHtml(model.decalsOriginal || '—')}</span></div>
      <div class="detail-info-block"><span class="detail-info-label">DECALS (AFTERMARKET / MARCA)</span><span class="detail-info-value">${escHtml(model.decalsAftermarket || '—')}</span></div>
    </div>
    ${model.paints ? `
    <div>
      <p class="detail-info-label" style="margin-bottom:6px">VERNICI &amp; COLORI</p>
      <div class="detail-notes-block">${escHtml(model.paints)}</div>
    </div>` : ''}
    ${model.aftermarket ? `
    <div>
      <p class="detail-info-label" style="margin-bottom:6px">PARTI AFTERMARKET</p>
      <div class="detail-notes-block">${escHtml(model.aftermarket)}</div>
    </div>` : ''}
    ${model.notes ? `
    <div>
      <p class="detail-info-label" style="margin-bottom:6px">NOTE VARIE</p>
      <div class="detail-notes-block">${escHtml(model.notes)}</div>
    </div>` : ''}
    <div class="detail-actions-row">
      ${adminActionsHtml}
      <button class="arcade-turbo-btn" onclick="document.getElementById('detailModalBackdrop').style.display='none';document.body.style.overflow='';">✓ CHIUDI</button>
    </div>`;

  $('detailModalBackdrop').style.display = '';
  document.body.style.overflow = 'hidden';

  if (isAdmin) {
    $('detailEditBtn')?.addEventListener('click', () => {
      closeModal('detailModalBackdrop');
      openEditModelModal(model);
    });
  } else {
    $('userQuickProgress')?.addEventListener('input', e => {
      if ($('userQuickProgressVal')) $('userQuickProgressVal').textContent = e.target.value + '%';
    });
    $('btnUserQuickSave')?.addEventListener('click', async () => {
      const newStatus   = $('userQuickStatus') ? $('userQuickStatus').value : model.status;
      let   newProgress = $('userQuickProgress') ? (parseInt($('userQuickProgress').value, 10) || 0) : (model.progress || 0);
      const newNotes    = $('userQuickNotes') ? $('userQuickNotes').value.trim() : (model.notes || '');
      if (newStatus === 'COMPLETED') newProgress = 100;
      const updated = {
        ...model,
        status: newStatus,
        progress: newProgress,
        notes: newNotes,
        updatedAt: new Date().toISOString()
      };
      try {
        await saveModel(updated);
        allModels = await getAllModels();
        renderGrid();
        refreshStats();
        closeModal('detailModalBackdrop');
        showToast('✓ Stato personale salvato!', 'cyan');
      } catch (err) {
        console.error('Errore salvataggio stato personale:', err);
        showToast('Errore nel salvataggio!', 'error');
      }
    });
  }
}

// ─── FORM SUBMIT (SOLO ADMIN) ────────────────────────────────────────────────
async function handleFormSubmit(e) {
  e.preventDefault();
  if (!isAdminUser(currentCloudUser)) {
    showToast('🔒 Solo l\'Admin può salvare o creare schede catalogo', 'error');
    return;
  }

  const statusRadio = document.querySelector('input[name="formStatus"]:checked');
  const model = {
    name:           $('formName').value.trim(),
    brand:          $('formBrand').value.trim(),
    scale:          $('formScale').value,
    kitCode:        $('formKitCode').value.trim(),
    category:       $('formCategory').value,
    status:         statusRadio ? statusRadio.value : 'WISHLIST',
    progress:       parseInt($('formProgress').value, 10) || 0,
    stage:          $('formStage').value,
    location:       $('formLocation').value.trim(),
    year:           $('formYear').value.trim(),
    purchasePrice:  parseFloat($('formPurchasePrice').value) || 0,
    estimatedValue: parseFloat($('formEstimatedValue').value) || 0,
    paints:         $('formPaints').value.trim(),
    aftermarket:       $('formAftermarket').value.trim(),
    decalsOriginal:    $('formDecalsOriginal') ? $('formDecalsOriginal').value.trim() : '',
    decalsAftermarket: $('formDecalsAftermarket') ? $('formDecalsAftermarket').value.trim() : '',
    notes:          $('formNotes').value.trim(),
    photo:          currentPhotoDataUrl || null,
    updatedAt:      new Date().toISOString()
  };

  // Auto-set progress for certain statuses
  if (model.status === 'COMPLETED') model.progress = 100;
  if (model.status === 'BACKLOG' || model.status === 'IN_TRANSIT' || model.status === 'WISHLIST' || model.status === 'NOT_INTERESTED' || model.status === 'OTHER') {
    if (model.progress === 0) model.stage = 'Non Iniziato (Backlog)';
  }

  if (editingId) model.id = editingId;

  try {
    await saveModel(model);
    allModels = await getAllModels();
    renderBrandFilterButtons();
    renderGrid();
    refreshStats();
    closeModal('modelModalBackdrop');
    showToast(editingId ? 'Modellino aggiornato ✓' : 'Modellino registrato ✓', 'cyan');
  } catch (err) {
    console.error('Errore salvataggio:', err);
    showToast('Errore nel salvataggio!', 'error');
  }
}

// ─── DELETE (SOLO ADMIN) ─────────────────────────────────────────────────────
async function deleteModel(id) {
  if (!isAdminUser(currentCloudUser)) {
    showToast('🔒 Solo l\'Admin può eliminare modellini', 'error');
    return;
  }
  const model = allModels.find(m => m.id === id);
  if (!model) return;
  if (!confirm(`Eliminare "${model.name}" dall'inventario? Questa operazione non è reversibile.`)) return;

  try {
    await deleteModelById(id);
    allModels = await getAllModels();
    renderGrid();
    refreshStats();
    showToast('Modellino eliminato dalla flotta', 'amber');
  } catch (err) {
    console.error('Errore eliminazione:', err);
    showToast('Errore eliminazione!', 'error');
  }
}

// ─── COMPRESSIONE & PHOTO HANDLING (SOLO ADMIN, MAX 1000PX WEBP/JPEG) ───────
function compressImageFile(file, maxDim = 1000, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Errore lettura file immagine'));
    reader.onload = ev => {
      const img = new Image();
      img.onerror = () => reject(new Error('Immagine non valida'));
      img.onload = () => {
        let w = img.naturalWidth || img.width;
        let h = img.naturalHeight || img.height;
        if (w > maxDim || h > maxDim) {
          if (w >= h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl || !dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        resolve(dataUrl);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}

async function handlePhotoFile(file) {
  if (!isAdminUser(currentCloudUser)) {
    showToast('🔒 Solo l\'Admin può caricare o scattare foto', 'error');
    return;
  }
  if (!file || !file.type.startsWith('image/')) return;
  try {
    currentPhotoDataUrl = await compressImageFile(file, 1000, 0.82);
    if ($('formPhotoPreview')) {
      $('formPhotoPreview').src = currentPhotoDataUrl;
      $('formPhotoPreview').style.display = 'block';
    }
    if ($('photoPlaceholder')) $('photoPlaceholder').style.display = 'none';
    if ($('btnRemovePhoto'))   $('btnRemovePhoto').style.display   = '';
    showToast('📷 Foto ottimizzata (max 1000px) pronta!', 'cyan');
  } catch (err) {
    console.error('Errore compressione foto:', err);
    showToast('Errore elaborazione immagine', 'error');
  }
}

// ─── EXPORT / IMPORT JSON ────────────────────────────────────────────────────
function exportJSON() {
  const data = JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), models: allModels }, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `static_model_kit_inventory_backup_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Backup JSON esportato ✓', 'cyan');
}

async function importJSON(file) {
  if (!file) return;
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    const models = Array.isArray(data) ? data : (data.models || []);
    if (!models.length) { showToast('File JSON vuoto o non valido', 'error'); return; }

    let imported = 0;
    for (const m of models) {
      delete m.id; // Force new IDs
      await saveModel(m);
      imported++;
    }
    allModels = await getAllModels();
    renderGrid();
    refreshStats();
    showToast(`${imported} modelli importati ✓`, 'cyan');
  } catch (err) {
    console.error('Import error:', err);
    showToast('Errore lettura file JSON', 'error');
  }
}

// ─── BOXART HELPER ───────────────────────────────────────────────────────────
// ─── BOXART HELPER & SCATOLE ORIGINALI ─────────────────────────────────────
// Mappa codice kit -> file foto della scatola originale certificata (cartella ./boxart/)
// Contiene SOLO scatole con logo Tamiya e grafica autentica di confezione integra da montare
const BOXART_LOCAL = {
  'Tamiya 20001': 'boxart/BOX_20001.jpg',
  'Tamiya 20002': 'boxart/BOX_20002.jpg',
  'Tamiya 20003': 'boxart/BOX_20003.jpg',
  'Tamiya 20004': 'boxart/BOX_20004.jpg',
  'Tamiya 20005': 'boxart/BOX_20005.jpg',
  'Tamiya 20006': 'boxart/BOX_20006.jpg',
  'Tamiya 20007': 'boxart/BOX_20007.jpg',
  'Tamiya 20008': 'boxart/BOX_20008.jpg',
  'Tamiya 20009': 'boxart/BOX_20009.jpg',
  'Tamiya 20010': 'boxart/BOX_20010.jpg',
  'Tamiya 20011': 'boxart/BOX_20011.jpg',
  'Tamiya 20012': 'boxart/BOX_20012.jpg',
  'Tamiya 20013': 'boxart/BOX_20013.jpg',
  'Tamiya 20014': 'boxart/BOX_20014.jpg',
  'Tamiya 20015': 'boxart/BOX_20015.jpg',
  'Tamiya 20016': 'boxart/BOX_20016.jpg',
  'Tamiya 20017': 'boxart/BOX_20017.jpg',
  'Tamiya 20018': 'boxart/BOX_20018.jpg',
  'Tamiya 20019': 'boxart/BOX_20019.jpg',
  'Tamiya 20020': 'boxart/BOX_20020.jpg',
  'Tamiya 20021': 'boxart/BOX_20021.jpg',
  'Tamiya 20022': 'boxart/BOX_20022.jpg',
  'Tamiya 20023': 'boxart/BOX_20023.jpg',
  'Tamiya 20024': 'boxart/BOX_20024.jpg',
  'Tamiya 20025': 'boxart/BOX_20025.jpg',
  'Tamiya 20026': 'boxart/BOX_20026.jpg',
  'Tamiya 20027': 'boxart/BOX_20027.jpg',
  'Tamiya 20028': 'boxart/BOX_20028.jpg',
  'Tamiya 20029': 'boxart/BOX_20029.jpg',
  'Tamiya 20030': 'boxart/BOX_20030.jpg',
  'Tamiya 20031': 'boxart/BOX_20031.jpg',
  'Tamiya 20032': 'boxart/BOX_20032.jpg',
  'Tamiya 20033': 'boxart/BOX_20033.jpg',
  'Tamiya 20034': 'boxart/BOX_20034.jpg',
  'Tamiya 20035': 'boxart/BOX_20035.jpg',
  'Tamiya 20036': 'boxart/BOX_20036.jpg',
  'Tamiya 20037': 'boxart/BOX_20037.jpg',
  'Tamiya 20038': 'boxart/BOX_20038.jpg',
  'Tamiya 20039': 'boxart/BOX_20039.jpg',
  'Tamiya 20040': 'boxart/BOX_20040.jpg',
  'Tamiya 20041': 'boxart/BOX_20041.jpg',
  'Tamiya 20042': 'boxart/BOX_20042.jpg',
  'Tamiya 20043': 'boxart/BOX_20043.jpg',
  'Tamiya 20044': 'boxart/BOX_20044.jpg',
  'Tamiya 20045': 'boxart/BOX_20045.jpg',
  'Tamiya 20046': 'boxart/BOX_20046.jpg',
  'Tamiya 20047': 'boxart/BOX_20047.jpg',
  'Tamiya 20048': 'boxart/BOX_20048.jpg',
  'Tamiya 20049': 'boxart/BOX_20049.jpg',
  'Tamiya 20050': 'boxart/BOX_20050.jpg',
  'Tamiya 20051': 'boxart/BOX_20051.jpg',
  'Tamiya 20052': 'boxart/BOX_20052.jpg',
  'Tamiya 20053': 'boxart/BOX_20053.jpg',
  'Tamiya 20054': 'boxart/BOX_20054.jpg',
  'Tamiya 20055': 'boxart/BOX_20055.jpg',
  'Tamiya 20056': 'boxart/BOX_20056.jpg',
  'Tamiya 20057': 'boxart/BOX_20057.jpg',
  'Tamiya 20058': 'boxart/BOX_20058.jpg',
  'Tamiya 20059': 'boxart/BOX_20059.jpg',
  'Tamiya 20060': 'boxart/BOX_20060.jpg',
  'Tamiya 20061': 'boxart/BOX_20061.jpg',
  'Tamiya 20062': 'boxart/BOX_20062.jpg',
  'Tamiya 20063': 'boxart/BOX_20063.jpg',
  'Tamiya 20064': 'boxart/BOX_20064.jpg',
  'Tamiya 20065': 'boxart/BOX_20065.jpg',
  'Tamiya 20066': 'boxart/BOX_20066.jpg',
  'Tamiya 20067': 'boxart/BOX_20067.jpg',
  'Tamiya 20068': 'boxart/BOX_20068.jpg',
  'Tamiya 20069': 'boxart/BOX_20069.jpg',
  'Tamiya 20070': 'boxart/BOX_20070.jpg',
  'Tamiya 20071': 'boxart/BOX_20071.jpg',
  'Tamiya 20072': 'boxart/BOX_20072.jpg',
  // Scala 1:24 verificate
  'Tamiya 24088': 'boxart/BOX_24088.jpg',
  'Tamiya 24196': 'boxart/BOX_24196.jpg',
  'Tamiya 24266': 'boxart/BOX_24266.jpg',
  'Tamiya 24299': 'boxart/BOX_24299.jpg',
  // Altri marchi / kit base
  'HAS JT102': 'boxart/BOX_HAS_JT102.jpg',
  'FUJ 03658': 'boxart/BOX_FUJ_03658.jpg',
  'REV 07031': 'boxart/BOX_REV_07031.jpg',
  'TAM 35138': 'boxart/BOX_TAM_35138.jpg',
  'BAN 0145':  'boxart/BOX_BAN_0145.jpg'
};

// Generatore Box Art Ufficiale Tamiya SVG in alta definizione
function generateBoxartSvg(model) {
  const kitCode = escHtml(model.kitCode || 'TAMIYA KIT');
  const name = escHtml((model.name || 'RACING CAR').toUpperCase());
  const scale = escHtml(model.scale || '1:24');
  const year = escHtml(model.year || '');
  const is124 = model.category === '1/24 Sports Car Series' || model.scale === '1:24' || model.scale === '1/24' || (model.kitCode && model.kitCode.includes('24'));
  const seriesHeading = is124 ? '1/24 SPORTS CAR SERIES' : '1/20 GRAND PRIX COLLECTION';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 280" width="100%" height="100%">
    <!-- Sfondo Confezione Rigida Bianca -->
    <rect width="440" height="280" fill="#ffffff" stroke="#c0d0e4" stroke-width="2"/>
    <rect x="6" y="6" width="428" height="268" fill="none" stroke="#e8f0fa" stroke-width="1"/>
    
    <!-- Doppia Striscia Rosso/Blu Racing Tamiya -->
    <rect x="0" y="0" width="440" height="10" fill="#e60012"/>
    <rect x="0" y="10" width="440" height="10" fill="#004098"/>
    
    <!-- Logo Twin Star Tamiya in alto a destra -->
    <g transform="translate(365, 26)">
      <rect x="0" y="0" width="30" height="26" fill="#e60012" rx="2"/>
      <polygon points="15,4 17.5,12 25,12 19,16.5 21,24 15,19 9,24 11,16.5 5,12 12.5,12" fill="#ffffff"/>
      <rect x="32" y="0" width="30" height="26" fill="#004098" rx="2"/>
      <polygon points="47,4 49.5,12 57,12 51,16.5 53,24 47,19 41,24 43,16.5 37,12 44.5,12" fill="#ffffff"/>
      <text x="31" y="34" font-family="'Space Mono', monospace, sans-serif" font-size="7" font-weight="900" fill="#0a1f44" text-anchor="middle" letter-spacing="1">TAMIYA</text>
    </g>
    
    <!-- Serie & Codice Kit -->
    <text x="24" y="36" font-family="'Space Mono', monospace, sans-serif" font-size="10" font-weight="800" fill="#004098" letter-spacing="2">${seriesHeading}</text>
    <text x="24" y="48" font-family="'Space Mono', monospace, sans-serif" font-size="8" font-weight="600" fill="#607898" letter-spacing="1">${kitCode} // PLASTIC ASSEMBLY KIT</text>
    
    <!-- Nome Vettura in grande stile packaging Tamiya -->
    <text x="24" y="82" font-family="'Space Mono', sans-serif" font-size="16" font-weight="900" fill="#0a1f44" letter-spacing="0.5">${name.length > 28 ? name.slice(0, 26) + '...' : name}</text>
    ${year ? `<text x="24" y="98" font-family="'Space Mono', monospace" font-size="9" font-weight="700" fill="#e60012">EDIZIONE ORIGINALE // ANNO ${year}</text>` : ''}

    <!-- Silhouette Grafica Vettura da Corsa da Montare -->
    <g transform="translate(40, 110)">
      <ellipse cx="180" cy="118" rx="170" ry="8" fill="#e2ebf6"/>
      <path d="M 30,95 Q 60,90 90,88 L 140,82 Q 180,60 230,68 L 290,75 Q 320,85 340,95 L 340,105 L 20,105 Z" fill="#004098" opacity="0.12"/>
      <rect x="25" y="55" width="28" height="42" fill="#004098" rx="2"/>
      <line x1="20" y1="55" x2="60" y2="55" stroke="#e60012" stroke-width="4"/>
      <path d="M 305,95 L 355,102 L 355,108 L 300,108 Z" fill="#004098"/>
      <rect x="335" y="98" width="22" height="12" fill="#e60012" rx="1"/>
      <circle cx="185" cy="68" r="8" fill="#e60012"/>
      <path d="M 160,78 Q 185,55 210,78 Z" fill="#ffffff" stroke="#0a1f44" stroke-width="2"/>
      <circle cx="85" cy="100" r="18" fill="#1b2838" stroke="#ffffff" stroke-width="3"/>
      <circle cx="85" cy="100" r="7" fill="#c0d0e4"/>
      <circle cx="285" cy="100" r="16" fill="#1b2838" stroke="#ffffff" stroke-width="3"/>
      <circle cx="285" cy="100" r="6" fill="#c0d0e4"/>
    </g>

    <!-- Barra Certificazione Box Art / Confezione da Costruire -->
    <rect x="20" y="248" width="400" height="20" fill="#f4f7fb" rx="2" stroke="#d8e4f2" stroke-width="1"/>
    <text x="32" y="262" font-family="'Space Mono', monospace" font-size="9" font-weight="700" fill="#004098">${scale} SCATOLA KIT ORIGINALE</text>
    <text x="408" y="262" font-family="'Space Mono', monospace" font-size="8" font-weight="800" fill="#e60012" text-anchor="end">MODELLISMO STATICO // INTERAMENTE DA MONTARE</text>
  </svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Restituisce la foto originale certificata della scatola del kit (se presente)
function getBoxartPath(model) {
  if (!model) return null;
  const kitCode = (model.kitCode || '').trim();
  if (kitCode && typeof EXTRA_1_20_BOXARTS !== 'undefined' && EXTRA_1_20_BOXARTS[kitCode]) {
    return EXTRA_1_20_BOXARTS[kitCode];
  }
  if (kitCode && typeof EXTRA_1_48_BOXARTS !== 'undefined' && EXTRA_1_48_BOXARTS[kitCode]) {
    return EXTRA_1_48_BOXARTS[kitCode];
  }
  if (kitCode && typeof EXTRA_1_24_BOXARTS !== 'undefined' && EXTRA_1_24_BOXARTS[kitCode]) {
    return EXTRA_1_24_BOXARTS[kitCode];
  }
  if (kitCode && BOXART_LOCAL[kitCode]) return BOXART_LOCAL[kitCode];

  const brandLower = (model.brand || '').trim().toLowerCase();
  const isTamiya = !brandLower || brandLower.includes('tamiya');
  const fullText = (kitCode + ' ' + (model.name || '')).toUpperCase();
  if (isTamiya) {
    const matchNum = fullText.match(/\b(200\d{2}|24\d{3}|61\d{3}|12\d{3}|14\d{3})\b/);
    if (matchNum) {
      const key = 'Tamiya ' + matchNum[1];
      if (BOXART_LOCAL[key]) return BOXART_LOCAL[key];
      const num = parseInt(matchNum[1], 10);
      if (num >= 24001 && num <= 24370) return `boxart/BOX_${matchNum[1]}.jpg`;
      if (num >= 61012 && num <= 61129) return `boxart/BOX_${matchNum[1]}.jpg`;
      if (num >= 12001 && num <= 12057) return `boxart/BOX_${matchNum[1]}.jpg`;
      if (num >= 14001 && num <= 14144) return `boxart/BOX_${matchNum[1]}.jpg`;
    }
  }

  // Corrispondenze accurate per modello per le sole scatole verificate (senza confondere ristampe/versioni diverse)
  const lower = fullText.toLowerCase();
  if (lower.includes('b192') && !lower.includes('clear')) return 'boxart/BOX_20036.jpg';
  if (lower.includes('b188')) return 'boxart/BOX_20021.jpg';
  if (lower.includes('mp4/4') || lower.includes('mp4-4')) return 'boxart/BOX_20022.jpg';
  if ((lower.includes('mp4/5b') || lower.includes('mp4-5b')) && !lower.includes('clear')) return 'boxart/BOX_20026.jpg';
  if (lower.includes('mp4/7')) return 'boxart/BOX_20035.jpg';
  if (lower.includes('mp4/8')) return 'boxart/BOX_20039.jpg';
  if (lower.includes('mp4/13') && !lower.includes('japan')) return 'boxart/BOX_20046.jpg';
  if (lower.includes('fw13b')) return 'boxart/BOX_20025.jpg';
  if ((lower.includes('fw-11') || lower.includes('fw11')) && !lower.includes('11b')) return 'boxart/BOX_20019.jpg';
  if (lower.includes('fw07') || lower.includes('fw-07')) return 'boxart/BOX_20014.jpg';
  if (lower.includes('312t3') && !lower.includes('clear')) return 'boxart/BOX_20010.jpg';
  if ((lower.includes('f189') || lower.includes('640')) && !lower.includes('portuguese')) return 'boxart/BOX_20023.jpg';
  if (lower.includes('f310b')) return 'boxart/BOX_20045.jpg';
  if (lower.includes('f1-2000') || lower.includes('f1 2000')) return 'boxart/BOX_20048.jpg';
  if (lower.includes('f2001') && !lower.includes('full view')) return 'boxart/BOX_20052.jpg';
  if (lower.includes('jordan 191')) return 'boxart/BOX_20032.jpg';
  if (lower.includes('bt46') && !lower.includes('clear')) return 'boxart/BOX_20007.jpg';
  if (lower.includes('js11')) return 'boxart/BOX_20012.jpg';
  if (lower.includes('tyrrell') && lower.includes('020')) return 'boxart/BOX_20029.jpg';
  if (lower.includes('102b')) return 'boxart/BOX_20030.jpg';
  if (lower.includes('102d') && lower.includes('herbert')) return 'boxart/BOX_20033.jpg';
  if (lower.includes('ra272')) return 'boxart/BOX_20043.jpg';
  if (lower.includes('lotus 78') && !lower.includes('photo-etched')) return 'boxart/BOX_20004.jpg';
  if (lower.includes('lotus 99t') && !lower.includes('clear')) return 'boxart/BOX_20020.jpg';
  if (lower.includes('lotus 107b')) return 'boxart/BOX_20038.jpg';
  if (lower.includes('leyton house') || lower.includes('cg901b')) return 'boxart/BOX_20028.jpg';
  if (lower.includes('lotus 25')) return 'boxart/BOX_20044.jpg';
  if (lower.includes('m23') && !lower.includes('photo-etched')) return 'boxart/BOX_20002.jpg';
  if (lower.includes('p34') && !lower.includes('monaco') && !lower.includes('japan')) return 'boxart/BOX_20001.jpg';
  if (lower.includes('spitfire') && lower.includes('ixc')) return 'boxart/BOX_HAS_JT102.jpg';
  if (lower.includes('lotus elan')) return 'boxart/BOX_FUJ_03658.jpg';
  if (lower.includes('911 rsr') || lower.includes('934 rsr')) return 'boxart/BOX_REV_07031.jpg';
  if (lower.includes('t-34/85') || lower.includes('35138')) return 'boxart/BOX_TAM_35138.jpg';
  if (lower.includes('rx-78-2') && lower.includes('gundam')) return 'boxart/BOX_BAN_0145.jpg';

  return null;
}

// ─── BOXART IMPORT STUDIO ──────────────────────────────────────────────────
let activeBoxartModel = null;

function openBoxartModal(modelId) {
  if (!isAdminUser(currentCloudUser)) {
    showToast('🔒 Solo l\'Admin può gestire le foto e le scatole', 'error');
    return;
  }
  const model = allModels.find(m => m.id === modelId);
  if (!model) return;
  activeBoxartModel = model;

  const kitCodeClean = (model.kitCode || '').replace(/^Tamiya\s*/i, '').trim();
  const searchName = model.name || '';

  // Setup Title & Info
  $('boxartModalTitle').textContent = `IMPORTA SCATOLA ORIGINALE — ${model.name}${model.kitCode ? ` — ${model.kitCode}` : ''}`;
  $('boxartPreviewKitCode').textContent = model.kitCode ? `${model.kitCode} // ${model.scale || '1:20'}` : (model.scale || '1:20');
  $('boxartPreviewName').textContent = model.name;

  // Resolve Preview Image
  const boxartPath = getBoxartPath(model);
  const svgFallback = generateBoxartSvg(model);
  const displayPhoto = model.photo || boxartPath || svgFallback;
  $('boxartPreviewImg').src = displayPhoto;
  $('boxartPreviewImg').onerror = function() {
    this.onerror = null;
    this.src = svgFallback;
  };

  // Badge Status
  if (model.photo) {
    $('boxartPreviewBadge').textContent = '🔗 SCATOLA PERSONALIZZATA';
    $('boxartPreviewBadge').style.background = '#0055ff';
  } else if (boxartPath) {
    $('boxartPreviewBadge').textContent = '📦 FOTO CONFEZIONE ORIGINALE VINTAGE';
    $('boxartPreviewBadge').style.background = '#0a1f44';
  } else {
    $('boxartPreviewBadge').textContent = '🎨 GRAFICA UFFICIALE TAMIYA (SVG)';
    $('boxartPreviewBadge').style.background = '#0a225c';
  }

  // Clear URL input
  $('boxartUrlInput').value = model.photo && !model.photo.startsWith('data:') ? model.photo : '';

  // 1-Click Search Links Setup per siti noti
  const qCode = encodeURIComponent((model.brand || 'Tamiya') + ' ' + (kitCodeClean || searchName));
  const qScalemates = encodeURIComponent((model.brand || 'Tamiya') + ' ' + (kitCodeClean || searchName));
  const qPlaza = encodeURIComponent((model.brand || 'Tamiya') + ' ' + (kitCodeClean || searchName));
  const qEbay = encodeURIComponent(`${model.brand || 'Tamiya'} ${model.kitCode || ''} ${searchName} box art packaging`);
  const qVinted = encodeURIComponent(`${model.brand || 'Tamiya'} ${model.kitCode || ''} scatola`);
  const qGoogle = encodeURIComponent(`${model.brand || 'Tamiya'} ${model.kitCode || ''} ${searchName} box art packaging`);

  const qGunpla = encodeURIComponent(`${searchName} ${kitCodeClean}`.trim() || (model.brand || 'Bandai'));

  $('boxartLinkKingkit').href = `https://www.kingkit.co.uk/search?q=${qCode}`;
  $('boxartLinkScalemates').href = `https://www.scalemates.com/search.php?q=${qScalemates}`;
  $('boxartLinkPlazajapan').href = `https://www.plazajapan.com/search.php?search_query=${qPlaza}`;
  if ($('boxartLinkBandai')) $('boxartLinkBandai').href = `https://bandai-hobby.net/search/?keyword=${qGunpla}`;
  if ($('boxartLinkHlj'))    $('boxartLinkHlj').href    = `https://www.hlj.com/search/?q=${qGunpla}`;
  $('boxartLinkEbay').href = `https://www.ebay.com/sch/i.html?_nkw=${qEbay}`;
  $('boxartLinkVinted').href = `https://www.vinted.it/vetrine?search_text=${qVinted}`;
  $('boxartLinkGoogle').href = `https://www.google.com/search?tbm=isch&q=${qGoogle}`;

  // Open modal
  $('boxartModalBackdrop').style.display = '';
  document.body.style.overflow = 'hidden';
}

function closeBoxartModal() {
  $('boxartModalBackdrop').style.display = 'none';
  document.body.style.overflow = '';
}


// 
const TAKARA_MODELS = [
  {
    name: "McLaren MP4/5B Honda", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20026",
    status: "WISHLIST", progress: 0, stage: "Non Iniziato (Backlog)",
    location: "", year: "", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "1/20 F1 Grand Prix — McLaren MP4/5B Honda, campione del mondo 1990 (Ayrton Senna). Sourced da Takara Scale Agency (Giappone). Kit sigillato, non costruito.", photo: null
  },
  {
    name: "Red Bull Racing Renault RB6", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20067",
    status: "WISHLIST", progress: 0, stage: "Non Iniziato (Backlog)",
    location: "", year: "", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "1/20 F1 Grand Prix — Red Bull Racing Renault RB6, Sebastian Vettel campione del mondo 2010. Sourced da Takara Scale Agency.", photo: null
  },
  {
    name: "Williams FW13B Renault", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20025",
    status: "WISHLIST", progress: 0, stage: "Non Iniziato (Backlog)",
    location: "", year: "", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "1/20 F1 Grand Prix — Williams FW13B Renault 1990. Kit raro, fuori produzione. Sourced da Takara Scale Agency.", photo: null
  },
  {
    name: "Ferrari F310B", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20045",
    status: "WISHLIST", progress: 0, stage: "Non Iniziato (Backlog)",
    location: "", year: "", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "1/20 F1 Grand Prix — Ferrari F310B, Michael Schumacher 1997. Sourced da Takara Scale Agency.", photo: null
  },
  {
    name: "Brabham BT46 Alfa Romeo (Clear Cowl Edition)", brand: "Tamiya", scale: "1/20",
    category: "Formula 1", kitCode: "Tamiya 20050",
    status: "WISHLIST", progress: 0, stage: "Non Iniziato (Backlog)",
    location: "", year: "", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "1/20 F1 Grand Prix No.50 — Brabham BT46 Alfa Romeo 'fan-car era', edizione Clear Cowl. Cowl semi-trasparente che mostra il motore flat-12. Include sticker monococque alluminio e figura pilota. Sourced da Takara Scale Agency.", photo: null
  },
  {
    name: "Ferrari F2007 — Brazil GP", brand: "Fujimi", scale: "1/20",
    category: "Formula 1", kitCode: "Fujimi GP-24",
    status: "WISHLIST", progress: 0, stage: "Non Iniziato (Backlog)",
    location: "", year: "", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "1/20 F1 — Ferrari F2007, versione GP del Brasile (Kimi Räikkönen campione 2007). Fujimi Grand Prix Series. Sourced da Takara Scale Agency.", photo: null
  },
  {
    name: "Ferrari F10 — Japan GP", brand: "Fujimi", scale: "1/20",
    category: "Formula 1", kitCode: "Fujimi GP-32",
    status: "WISHLIST", progress: 0, stage: "Non Iniziato (Backlog)",
    location: "", year: "", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "1/20 F1 — Ferrari F10, versione GP del Giappone 2010 (Fernando Alonso). Fujimi Grand Prix Series. Sourced da Takara Scale Agency.", photo: null
  },
  {
    name: "Sauber C30 — Monaco GP", brand: "Fujimi", scale: "1/20",
    category: "Formula 1", kitCode: "Fujimi GP-37",
    status: "WISHLIST", progress: 0, stage: "Non Iniziato (Backlog)",
    location: "", year: "", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "1/20 F1 — Sauber C30, versione GP di Monaco 2011. Fujimi Grand Prix Series. Sourced da Takara Scale Agency.", photo: null
  },
  {
    name: "Sauber C30 — Japan GP", brand: "Fujimi", scale: "1/20",
    category: "Formula 1", kitCode: "Fujimi GP-38",
    status: "WISHLIST", progress: 0, stage: "Non Iniziato (Backlog)",
    location: "", year: "", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "1/20 F1 — Sauber C30, versione GP del Giappone 2011. Fujimi Grand Prix Series. Sourced da Takara Scale Agency.", photo: null
  },
  {
    name: "Sauber C31", brand: "Fujimi", scale: "1/20",
    category: "Formula 1", kitCode: "Fujimi GP-42",
    status: "WISHLIST", progress: 0, stage: "Non Iniziato (Backlog)",
    location: "", year: "", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "1/20 F1 — Sauber C31 2012 (Kobayashi / Pérez). Fujimi Grand Prix Series. Sourced da Takara Scale Agency.", photo: null
  },
  {
    name: "McLaren F1 GTR Long Tail", brand: "Fujimi", scale: "1:24",
    category: "Sport Car", kitCode: "Fujimi RS-93",
    status: "WISHLIST", progress: 0, stage: "Non Iniziato (Backlog)",
    location: "", year: "", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "1/24 — McLaren F1 GTR Long Tail, versione Le Mans Racing (vincitore Le Mans 1995). Fujimi Real Sports Car Series. Sourced da Takara Scale Agency.", photo: null
  },
  {
    name: "Porsche 911 GT3 R", brand: "Fujimi", scale: "1:24",
    category: "Sport Car", kitCode: "Fujimi RS-95",
    status: "WISHLIST", progress: 0, stage: "Non Iniziato (Backlog)",
    location: "", year: "", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "1/24 — Porsche 911 GT3 R, versione racing endurance. Fujimi Real Sports Car Series. Sourced da Takara Scale Agency.", photo: null
  },
  {
    name: "Evangelion RT Unit-01 McLaren MP4-12C", brand: "Fujimi", scale: "1:24",
    category: "Auto Stradali", kitCode: "Fujimi EVA-03",
    status: "WISHLIST", progress: 0, stage: "Non Iniziato (Backlog)",
    location: "", year: "", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "1/24 — Edizione speciale collaborazione Evangelion RT × McLaren MP4-12C, livrea Unit-01 (viola/verde). Kit da collezione molto raro. Sourced da Takara Scale Agency.", photo: null
  },
  {
    name: "Alfa Romeo Giulia Sprint GTA", brand: "Tamiya", scale: "1:24",
    category: "Sport Car", kitCode: "Tamiya 24266",
    status: "WISHLIST", progress: 0, stage: "Non Iniziato (Backlog)",
    location: "", year: "", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "1/24 Sports Car Series — Alfa Romeo Giulia Sprint GTA. Dettaglio completo vano motore, emblemi metal-transfer, pneumatici in gomma solida. Ristampa 2025. Sourced da Takara Scale Agency.", photo: null
  },
  {
    name: "Porsche Boxster (986)", brand: "Tamiya", scale: "1:24",
    category: "Auto Stradali", kitCode: "Tamiya 24196",
    status: "WISHLIST", progress: 0, stage: "Non Iniziato (Backlog)",
    location: "", year: "", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "1/24 Sports Car Series — Porsche Boxster 986, roadster tedesco. Sourced da Takara Scale Agency.", photo: null
  }
];

async function importTakaraData() {
  const existing = allModels.map(m => m.kitCode).filter(Boolean);
  const toImport = TAKARA_MODELS.filter(m => !existing.includes(m.kitCode));

  if (toImport.length === 0) {
    showToast('Tutti i modelli Takara Scale sono già presenti!', 'amber');
    return;
  }

  const msg = `Importare ${toImport.length} modellini da Takara Scale Agency (1/20 & 1/24)?\n\n` +
    toImport.map(m => `• ${m.brand} ${m.name} [${m.scale}]`).join('\n');

  if (!confirm(msg)) return;

  for (const m of toImport) {
    await saveModel({ ...m, addedAt: new Date().toISOString() });
  }
  allModels = await getAllModels();
  renderGrid();
  refreshStats();
  showToast(`✓ ${toImport.length} modelli Takara Scale importati!`, 'cyan');
}

// ─── SEED SAMPLE DATA ────────────────────────────────────────────────────────
async function seedSampleData() {
  if (allModels.length > 0) {
    if (!confirm('Aggiungere i modelli di esempio alla collezione esistente?')) return;
  }
  for (const m of SAMPLE_MODELS) {
    await saveModel({ ...m });
  }
  allModels = await getAllModels();
  renderGrid();
  refreshStats();
  showToast(`${SAMPLE_MODELS.length} modelli di esempio caricati ✓`, 'cyan');
}

// ─── TOAST NOTIFICATION ──────────────────────────────────────────────────────
function showToast(message, type = 'cyan') {
  const existing = document.querySelector('.outrun-toast');
  if (existing) existing.remove();

  const colorMap = { cyan: '#00f3ff', amber: '#ff9900', error: '#ff4444', pink: '#ff007f' };
  const color    = colorMap[type] || colorMap.cyan;

  const toast    = document.createElement('div');
  toast.className = 'outrun-toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position:       'fixed',
    bottom:         '24px',
    right:          '24px',
    background:     '#1e1133',
    border:         `1px solid ${color}`,
    borderRadius:   '4px',
    color:          color,
    fontFamily:     "'Space Mono', monospace",
    fontSize:       '11px',
    letterSpacing:  '0.1em',
    textTransform:  'uppercase',
    padding:        '10px 20px',
    zIndex:         '99999',
    boxShadow:      `0 0 12px ${color}40, 0 4px 24px rgba(0,0,0,0.8)`,
    animation:      'toastSlide 0.3s cubic-bezier(0.34,1.56,0.64,1)',
    pointerEvents:  'none'
  });

  if (!document.getElementById('toastKeyframes')) {
    const style = document.createElement('style');
    style.id = 'toastKeyframes';
    style.textContent = `
      @keyframes toastSlide { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ─── CLOCK TELEMETRY ─────────────────────────────────────────────────────────
function updateClock() {
  const clockEl = $('clockTelemetry');
  if (!clockEl) return;
  const now = new Date();
  const h   = String(now.getHours()).padStart(2,'0');
  const m   = String(now.getMinutes()).padStart(2,'0');
  const s   = String(now.getSeconds()).padStart(2,'0');
  clockEl.textContent = `TIME: ${h}:${m}:${s}`;
}

// ─── EVENT DELEGATION ────────────────────────────────────────────────────────
function setupEventListeners() {
  // Transport & Header Buttons
  $('btnOpenNewModal')?.addEventListener('click', openNewModelModal);
  $('btnHeaderNewModel')?.addEventListener('click', openNewModelModal);
  $('btnEmptyAddNew')?.addEventListener('click', openNewModelModal);
  $('btnEmptyLoadSeeds')?.addEventListener('click', seedSampleData);
  $('btnImportTamiya120')?.addEventListener('click', importTamiya120Data);
  $('btnImportTamiya124')?.addEventListener('click', () => importTamiya124Data(true));
  $('btnResetTamiya120')?.addEventListener('click', resetAndLoadOfficialCollection);
  $('btnImportTakara')?.addEventListener('click', importTakaraData);
  $('btnSeedSampleData')?.addEventListener('click', seedSampleData);
  $('btnExportJson')?.addEventListener('click', exportJSON);
  $('btnTransportEject')?.addEventListener('click', exportJSON);
  $('btnTransportPlay')?.addEventListener('click', () => {
    filterStatus = 'ALL';
    updateFilterUI();
    renderGrid();
  });
  $('btnTransportWip')?.addEventListener('click', () => {
    filterStatus = 'WIP';
    updateFilterUI();
    renderGrid();
  });
  $('btnTransportReset')?.addEventListener('click', () => {
    filterStatus   = 'ALL';
    filterScale    = 'ALL';
    filterCategory = 'ALL';
    filterBrand    = 'ALL';
    searchQuery    = '';
    if ($('scaleFilterSelect')) $('scaleFilterSelect').value = 'ALL';
    if ($('categoryFilterSelect')) $('categoryFilterSelect').value = 'ALL';
    if ($('searchInput')) $('searchInput').value          = '';
    sortKey = 'kitCode';
    document.querySelectorAll('.sort-tag-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.sort-tag-btn[data-sort="kitCode"]')?.classList.add('active');
    updateFilterUI();
    renderGrid();
  });

  // Modal Close buttons
  $('btnModalClose')?.addEventListener('click',  () => closeModal('modelModalBackdrop'));
  $('btnCancelModal')?.addEventListener('click', () => closeModal('modelModalBackdrop'));
  $('btnDetailClose')?.addEventListener('click', () => closeModal('detailModalBackdrop'));

  // Click outside modal to close
  $('modelModalBackdrop')?.addEventListener('click', e => {
    if (e.target === $('modelModalBackdrop')) closeModal('modelModalBackdrop');
  });
  $('detailModalBackdrop')?.addEventListener('click', e => {
    if (e.target === $('detailModalBackdrop')) closeModal('detailModalBackdrop');
  });

  // Form submit
  $('modelForm')?.addEventListener('submit', handleFormSubmit);

  // Progress slider
  $('formProgress')?.addEventListener('input', e => {
    $('formProgressDisplay').textContent = e.target.value + '%';
  });

  // Status filter (select & legacy matrix fallback)
  $('statusFilterSelect')?.addEventListener('change', e => {
    filterStatus = e.target.value;
    updateFilterUI();
    renderGrid();
  });
  $('statusFilterMatrix')?.addEventListener('click', e => {
    const btn = e.target.closest('.rocker-btn');
    if (!btn) return;
    filterStatus = btn.dataset.status;
    updateFilterUI();
    renderGrid();
  });

  // Scale filter (select & legacy matrix fallback)
  $('scaleFilterSelect')?.addEventListener('change', e => {
    filterScale = e.target.value;
    updateFilterUI();
    renderGrid();
  });
  $('scaleFilterMatrix')?.addEventListener('click', e => {
    const btn = e.target.closest('.rocker-btn');
    if (!btn) return;
    filterScale = btn.dataset.scale;
    updateFilterUI();
    renderGrid();
  });

  // Category filter (select & legacy matrix fallback)
  $('categoryFilterSelect')?.addEventListener('change', e => {
    filterCategory = e.target.value;
    updateFilterUI();
    renderGrid();
  });
  $('categoryFilterMatrix')?.addEventListener('click', e => {
    const btn = e.target.closest('.rocker-btn');
    if (!btn) return;
    filterCategory = btn.dataset.category;
    updateFilterUI();
    renderGrid();
  });

  // Sort filter (select & legacy buttons fallback)
  $('sortFilterSelect')?.addEventListener('change', e => {
    sortKey = e.target.value;
    updateFilterUI();
    renderGrid();
  });

  // Pulsante Reset Rapido Filtri (azzera campi e lancia manualmente change/input)
  $('btnResetFilters')?.addEventListener('click', () => {
    const selectDefaults = [
      ['statusFilterSelect',   'ALL'],
      ['scaleFilterSelect',    'ALL'],
      ['categoryFilterSelect', 'ALL'],
      ['sortFilterSelect',     'kitCode']
    ];
    selectDefaults.forEach(([id, defVal]) => {
      const el = $(id);
      if (el) {
        el.value = defVal;
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    ['searchInput', 'brandFilterInput'].forEach(id => {
      const el = $(id);
      if (el) {
        el.value = '';
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });

    showToast('✓ Filtri e ricerca azzerati', 'cyan');
  });

  // Brand filter: campo di digitazione libera (filtra mentre scrivi con debounce 160ms o subito con Invio)
  let brandInputTimer = null;
  const applyBrandFilter = (scrollToResults = false) => {
    const val = ($('brandFilterInput') ? $('brandFilterInput').value.trim() : '');
    filterBrand = val ? val : 'ALL';
    if ($('btnClearBrandFilter')) {
      $('btnClearBrandFilter').style.display = val ? '' : 'none';
    }
    renderGrid();
    if (scrollToResults && $('modelsGrid')) {
      $('modelsGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  $('brandFilterInput')?.addEventListener('input', () => {
    if (brandInputTimer) clearTimeout(brandInputTimer);
    brandInputTimer = setTimeout(() => applyBrandFilter(false), 160);
  });
  $('brandFilterInput')?.addEventListener('change', () => {
    if (brandInputTimer) clearTimeout(brandInputTimer);
    applyBrandFilter(false);
  });
  $('brandFilterInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (brandInputTimer) clearTimeout(brandInputTimer);
      applyBrandFilter(true);
      e.target.blur();
    }
  });
  $('btnClearBrandFilter')?.addEventListener('click', () => {
    if (brandInputTimer) clearTimeout(brandInputTimer);
    filterBrand = 'ALL';
    if ($('brandFilterInput')) $('brandFilterInput').value = '';
    if ($('btnClearBrandFilter')) $('btnClearBrandFilter').style.display = 'none';
    renderGrid();
  });

  // Search (debounce 160ms per digitazione fluida su >1300 modelli)
  let searchInputTimer = null;
  $('searchInput')?.addEventListener('input', e => {
    const q = e.target.value.trim();
    if (searchInputTimer) clearTimeout(searchInputTimer);
    searchInputTimer = setTimeout(() => {
      searchQuery = q;
      renderGrid();
    }, 160);
  });

  // Sort tag buttons
  document.querySelectorAll('.sort-tag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sortKey = btn.dataset.sort;
      document.querySelectorAll('.sort-tag-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGrid();
    });
  });

  // Models grid event delegation (detail, edit, delete)
  $('modelsGrid')?.addEventListener('click', e => {
    const actionBtn = e.target.closest('[data-action]');
    if (actionBtn) {
      e.stopPropagation();
      const id    = parseInt(actionBtn.dataset.id, 10);
      const model = allModels.find(m => m.id === id);
      if (!model) return;
      if (actionBtn.dataset.action === 'detail') openDetailModal(model);
      if (actionBtn.dataset.action === 'boxart') openBoxartModal(model.id);
      if (actionBtn.dataset.action === 'edit')   openEditModelModal(model);
      if (actionBtn.dataset.action === 'delete') deleteModel(id);
      return;
    }
    const card = e.target.closest('.model-card');
    if (card) {
      const id    = parseInt(card.dataset.id, 10);
      const model = allModels.find(m => m.id === id);
      if (model) openDetailModal(model);
    }
  });

  // Card keyboard navigation
  $('modelsGrid')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.model-card');
      if (card) {
        const id    = parseInt(card.dataset.id, 10);
        const model = allModels.find(m => m.id === id);
        if (model) openDetailModal(model);
      }
    }
  });

  // Photo file & camera inputs (Solo Admin)
  $('btnDeleteInEditModal')?.addEventListener('click', async () => {
    if (!isAdminUser(currentCloudUser) || !editingId) {
      showToast('🔒 Solo l\'Admin può eliminare modellini', 'error');
      return;
    }
    const idToDelete = editingId;
    await deleteModel(idToDelete);
    if (!allModels.some(m => m.id === idToDelete)) {
      closeModal('modelModalBackdrop');
    }
  });
  $('formPhotoFile')?.addEventListener('change', e => handlePhotoFile(e.target.files[0]));
  $('formPhotoCamera')?.addEventListener('change', e => handlePhotoFile(e.target.files[0]));
  $('btnChoosePhoto')?.addEventListener('click', () => { if (isAdminUser(currentCloudUser)) $('formPhotoFile')?.click(); });
  $('btnCameraPhoto')?.addEventListener('click', () => { if (isAdminUser(currentCloudUser)) $('formPhotoCamera')?.click(); });
  $('btnRemovePhoto')?.addEventListener('click', () => {
    if (!isAdminUser(currentCloudUser)) return;
    currentPhotoDataUrl = null;
    if ($('formPhotoFile')) $('formPhotoFile').value = '';
    if ($('formPhotoCamera')) $('formPhotoCamera').value = '';
    if ($('formPhotoPreview')) $('formPhotoPreview').src = generateBoxartSvg({ name: $('formName')?.value || 'MODELLO', scale: $('formScale')?.value || '1:24', kitCode: $('formKitCode')?.value || '' });
    if ($('btnRemovePhoto')) $('btnRemovePhoto').style.display = 'none';
  });
  $('photoDropArea')?.addEventListener('click', e => {
    if (e.target === $('photoPlaceholder') || $('photoPlaceholder').contains(e.target)) {
      $('formPhotoFile').click();
    }
  });

  // Drag & drop photo
  const dropArea = $('photoDropArea');
  if (dropArea) {
    ['dragenter','dragover'].forEach(ev => dropArea.addEventListener(ev, e => {
      e.preventDefault(); dropArea.classList.add('drag-over');
    }));
    ['dragleave','drop'].forEach(ev => dropArea.addEventListener(ev, e => {
      e.preventDefault(); dropArea.classList.remove('drag-over');
    }));
    dropArea.addEventListener('drop', e => {
      handlePhotoFile(e.dataTransfer.files[0]);
    });
  }

  // Import JSON
  $('importJsonInput')?.addEventListener('change', e => importJSON(e.target.files[0]));

  // Boxart Modal handlers
  $('btnBoxartClose')?.addEventListener('click', closeBoxartModal);
  $('btnBoxartDone')?.addEventListener('click', closeBoxartModal);
  $('boxartModalBackdrop')?.addEventListener('click', e => {
    if (e.target === $('boxartModalBackdrop')) closeBoxartModal();
  });

  // Apply URL input
  $('btnBoxartApplyUrl')?.addEventListener('click', async () => {
    if (!activeBoxartModel) return;
    const url = $('boxartUrlInput').value.trim();
    if (!url) {
      showToast('Inserisci un URL valido per la scatola', 'warn');
      return;
    }
    activeBoxartModel.photo = url;
    await saveModel(activeBoxartModel);
    $('boxartPreviewImg').src = url;
    $('boxartPreviewBadge').textContent = '🔗 SCATOLA PERSONALIZZATA';
    $('boxartPreviewBadge').style.background = '#0055ff';
    renderGrid();
    if ($('detailModalBackdrop').style.display !== 'none') {
      openDetailModal(activeBoxartModel);
    }
    showToast('✓ Scatola originale salvata per ' + activeBoxartModel.name + '!', 'cyan');
  });

  // File upload & camera capture for boxart (Solo Admin, compressa max 1000px)
  const handleBoxartImageInput = async e => {
    if (!isAdminUser(currentCloudUser)) return;
    const file = e.target.files[0];
    if (!file || !activeBoxartModel) return;
    try {
      const dataUrl = await compressImageFile(file, 1000, 0.82);
      activeBoxartModel.photo = dataUrl;
      await saveModel(activeBoxartModel);
      $('boxartPreviewImg').src = dataUrl;
      $('boxartPreviewBadge').textContent = '📷 FOTO OTTIMIZZATA';
      $('boxartPreviewBadge').style.background = '#0055ff';
      renderGrid();
      if ($('detailModalBackdrop').style.display !== 'none') {
        openDetailModal(activeBoxartModel);
      }
      showToast('✓ Foto ottimizzata (max 1000px) salvata con successo!', 'cyan');
    } catch (err) {
      console.error('Errore compressione foto boxart:', err);
      showToast('Errore elaborazione immagine', 'error');
    }
    e.target.value = '';
  };
  $('boxartFileInput')?.addEventListener('change', handleBoxartImageInput);
  $('boxartCameraInput')?.addEventListener('change', handleBoxartImageInput);

  // Restore SVG packaging
  $('btnBoxartRestoreSvg')?.addEventListener('click', async () => {
    if (!activeBoxartModel) return;
    const svg = generateBoxartSvg(activeBoxartModel);
    activeBoxartModel.photo = svg;
    await saveModel(activeBoxartModel);
    $('boxartPreviewImg').src = svg;
    $('boxartPreviewBadge').textContent = '🎨 GRAFICA UFFICIALE TAMIYA (SVG)';
    $('boxartPreviewBadge').style.background = '#0a225c';
    renderGrid();
    if ($('detailModalBackdrop').style.display !== 'none') {
      openDetailModal(activeBoxartModel);
    }
    showToast('✓ Ripristinata grafica ufficiale Tamiya con logo!', 'cyan');
  });

  // Reset to default catalog
  $('btnBoxartResetDefault')?.addEventListener('click', async () => {
    if (!activeBoxartModel) return;
    activeBoxartModel.photo = null;
    await saveModel(activeBoxartModel);
    const boxartPath = getBoxartPath(activeBoxartModel);
    const svgFallback = generateBoxartSvg(activeBoxartModel);
    const displayPhoto = boxartPath || svgFallback;
    $('boxartPreviewImg').src = displayPhoto;
    $('boxartPreviewBadge').textContent = boxartPath ? '📦 FOTO CONFEZIONE ORIGINALE VINTAGE' : '🎨 GRAFICA UFFICIALE TAMIYA (SVG)';
    $('boxartPreviewBadge').style.background = '#0a1f44';
    $('boxartUrlInput').value = '';
    renderGrid();
    if ($('detailModalBackdrop').style.display !== 'none') {
      openDetailModal(activeBoxartModel);
    }
    showToast('✓ Ripristinata scatola predefinita di catalogo', 'cyan');
  });

  // Search boxart from Edit Model Modal
  $('btnFormSearchBoxart')?.addEventListener('click', () => {
    if (editingId) {
      openBoxartModal(editingId);
    } else {
      showToast('Salva prima la scheda del modellino per associare la scatola', 'info');
    }
  });

  // Footer scroll top
  $('btnScrollTop')?.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Cloud Auth Modal & Status Badge
  $('dbStatusBadge')?.addEventListener('click', () => openAuthModal(false));
  $('btnHeaderUsers')?.addEventListener('click', () => openAuthModal(false));
  $('btnAuthModalClose')?.addEventListener('click', closeAuthModal);
  $('btnAuthCloseFooter')?.addEventListener('click', closeAuthModal);
  $('authModalBackdrop')?.addEventListener('click', e => {
    if (e.target === $('authModalBackdrop') && isAuthenticatedUser(currentCloudUser)) {
      closeAuthModal();
    }
  });

  // Traduzione errori Firebase Auth in italiano
  function formatAuthError(err) {
    const code = err && err.code ? err.code : '';
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Questa email è già registrata. Clicca su "🔑 ACCEDI" per entrare nel tuo archivio.';
      case 'auth/invalid-email':
        return 'Indirizzo email non valido.';
      case 'auth/weak-password':
        return 'La password è troppo corta: inserisci almeno 6 caratteri.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Email o password errati. Se è il tuo primo accesso, clicca su "➕ REGISTRA NUOVO ACCOUNT".';
      case 'auth/too-many-requests':
        return 'Troppi tentativi falliti. Attendi qualche minuto e riprova.';
      case 'auth/operation-not-allowed':
        return 'Metodo di accesso non ancora attivo su Firebase Console (Authentication → Sign-in method).';
      case 'auth/popup-blocked':
        return 'Popup bloccato dal browser: avvio accesso alternativo con reindirizzamento...';
      case 'auth/popup-closed-by-user':
        return 'Finestra di accesso Google chiusa prima di completare il login.';
      case 'auth/unauthorized-domain':
        return 'Dominio non autorizzato su Firebase Console (Authentication → Settings → Authorized domains).';
      case 'auth/account-exists-with-different-credential':
        return 'Esiste già un account con questa email usando un altro metodo di accesso.';
      default:
        return err && err.message ? err.message : 'Errore di autenticazione. Riprova.';
    }
  }

  // Login con Google (con controllo slot 20 tester e fallback redirect per Android/mobile)
  $('btnAuthGoogle')?.addEventListener('click', async () => {
    if (!firebaseAuth) return;
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    updateAuthUI(null, 'Connessione con Google in corso...', true);
    try {
      await firebaseAuth.signInWithPopup(provider);
      // Il controllo limite 20 tester e il salvataggio profilo avvengono in activateUserSession()
    } catch (err) {
      const code = err && err.code ? err.code : '';
      if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
        updateAuthUI(null, 'Popup bloccato su questo dispositivo: reindirizzamento a Google in corso...', true);
        try {
          await firebaseAuth.signInWithRedirect(provider);
          return;
        } catch (redirErr) {
          console.error('Errore fallback redirect Google:', redirErr);
          updateAuthUI(null, `Errore accesso Google: ${formatAuthError(redirErr)}`);
          return;
        }
      }
      console.error('Errore login Google:', err);
      updateAuthUI(null, `Errore accesso Google: ${formatAuthError(err)}`);
    }
  });

  // Registrazione nuovo account con Email e Password (database personale)
  async function handleRegisterUser() {
    if (!firebaseAuth) {
      updateAuthUI(null, 'Servizio Firebase Authentication non disponibile.');
      return;
    }
    const name  = ($('authNameInput') ? $('authNameInput').value.trim() : '');
    const email = ($('authEmailInput') ? $('authEmailInput').value.trim().toLowerCase() : '');
    const pass  = ($('authPasswordInput') ? $('authPasswordInput').value : '');

    if (!email || !email.includes('@')) {
      updateAuthUI(null, 'Inserisci un indirizzo email valido.');
      return;
    }
    if (!pass || pass.length < 6) {
      updateAuthUI(null, 'La password deve contenere almeno 6 caratteri.');
      return;
    }

    // Controllo limite massimo di 20 tester prima della registrazione
    const slotCount = await fetchBetaSlotCount();
    if (email !== ADMIN_EMAIL && typeof slotCount === 'number' && slotCount >= MAX_BETA_USERS) {
      updateAuthUI(null, `Limite massimo di ${MAX_BETA_USERS} tester raggiunto.`);
      showToast(`🚫 Limite massimo di ${MAX_BETA_USERS} tester raggiunto`, 'error');
      return;
    }

    updateAuthUI(null, 'Creazione account e archivio personale in corso...', true);

    try {
      const cred = await firebaseAuth.createUserWithEmailAndPassword(email, pass);
      if (cred && cred.user && name) {
        try {
          await cred.user.updateProfile({ displayName: name });
        } catch {}
      }
      if ($('authNameInput')) $('authNameInput').value = '';
      if ($('authEmailInput')) $('authEmailInput').value = '';
      if ($('authPasswordInput')) $('authPasswordInput').value = '';
      showToast(`✓ Account creato! Benvenuto ${name || email.split('@')[0]}!`, 'cyan');
    } catch (err) {
      console.error('Errore registrazione:', err);
      updateAuthUI(null, formatAuthError(err));
    }
  }

  // Accesso con Email e Password
  async function handleLoginUser() {
    if (!firebaseAuth) {
      updateAuthUI(null, 'Servizio Firebase Authentication non disponibile.');
      return;
    }
    const email = ($('authEmailInput') ? $('authEmailInput').value.trim().toLowerCase() : '');
    const pass  = ($('authPasswordInput') ? $('authPasswordInput').value : '');

    if (!email || !pass) {
      updateAuthUI(null, 'Inserisci Email e Password per accedere al tuo archivio.');
      return;
    }

    updateAuthUI(null, 'Verifica credenziali in corso...', true);

    try {
      await firebaseAuth.signInWithEmailAndPassword(email, pass);
      if ($('authPasswordInput')) $('authPasswordInput').value = '';
      showToast('✓ Accesso effettuato! Caricamento archivio personale...', 'cyan');
    } catch (err) {
      console.error('Errore login:', err);
      updateAuthUI(null, formatAuthError(err));
    }
  }

  $('btnAuthRegisterSubmit')?.addEventListener('click', handleRegisterUser);
  $('btnAuthLoginSubmit')?.addEventListener('click', handleLoginUser);
  $('btnAdminRefreshUsers')?.addEventListener('click', loadAdminUsersPanel);
  $('authEmailForm')?.addEventListener('submit', e => {
    e.preventDefault();
    handleLoginUser();
  });

  // Cambio Password nel menu Utente (solo account Email/Password)
  function showChangePasswordFeedback(msg, isSuccess = false) {
    const fb = $('changePasswordFeedback');
    if (!fb) return;
    fb.style.display = 'block';
    fb.style.background = isSuccess ? 'rgba(227, 178, 60, 0.16)' : 'rgba(214, 40, 40, 0.22)';
    fb.style.border = isSuccess ? '1.5px solid #E3B23C' : '1.5px solid #D62828';
    fb.style.color = '#F4F0E4';
    fb.textContent = `${isSuccess ? '✓ ' : '⚠️ '}${msg}`;
  }

  $('btnToggleChangePassword')?.addEventListener('click', () => {
    const form = $('authChangePasswordForm');
    if (!form) return;
    const isHidden = form.style.display === 'none' || !form.style.display;
    form.style.display = isHidden ? 'flex' : 'none';
    if (!isHidden) {
      form.reset();
      if ($('changePasswordFeedback')) $('changePasswordFeedback').style.display = 'none';
    } else {
      $('authCurrentPassword')?.focus();
    }
  });

  $('authChangePasswordForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    if (!firebaseAuth || !currentCloudUser || !currentCloudUser.email) {
      showChangePasswordFeedback('Devi essere connesso per cambiare la password.');
      return;
    }
    const currentPwd = $('authCurrentPassword') ? $('authCurrentPassword').value : '';
    const newPwd     = $('authNewPassword') ? $('authNewPassword').value : '';
    const confirmPwd = $('authConfirmPassword') ? $('authConfirmPassword').value : '';

    if (!currentPwd) {
      showChangePasswordFeedback('Inserisci la password attuale.');
      return;
    }
    if (newPwd.length < 6) {
      showChangePasswordFeedback('La nuova password deve contenere almeno 6 caratteri.');
      return;
    }
    if (newPwd !== confirmPwd) {
      showChangePasswordFeedback('Le due nuove password non coincidono.');
      return;
    }
    if (newPwd === currentPwd) {
      showChangePasswordFeedback('La nuova password deve essere diversa da quella attuale.');
      return;
    }

    const submitBtn = $('btnSaveNewPassword');
    if (submitBtn) submitBtn.disabled = true;
    showChangePasswordFeedback('Verifica e aggiornamento password in corso...', true);

    try {
      const cred = firebase.auth.EmailAuthProvider.credential(currentCloudUser.email, currentPwd);
      await currentCloudUser.reauthenticateWithCredential(cred);
      await currentCloudUser.updatePassword(newPwd);
      $('authChangePasswordForm')?.reset();
      showChangePasswordFeedback('Password aggiornata con successo!', true);
      showToast('✓ Password aggiornata con successo!', 'cyan');
    } catch (err) {
      console.error('Errore cambio password:', err);
      const code = err && err.code ? err.code : '';
      let msg = 'Impossibile aggiornare la password. Riprova.';
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        msg = 'Password attuale errata. Riprova oppure usa "Reset via email".';
      } else if (code === 'auth/weak-password') {
        msg = 'La nuova password è troppo debole (usa almeno 6 caratteri).';
      } else if (code === 'auth/too-many-requests') {
        msg = 'Troppi tentativi falliti. Attendi qualche minuto e riprova.';
      } else if (code === 'auth/requires-recent-login') {
        msg = 'Sessione scaduta: disconnettiti e riaccedi prima di cambiare password.';
      }
      showChangePasswordFeedback(msg, false);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });

  $('btnSendResetEmail')?.addEventListener('click', async () => {
    if (!firebaseAuth || !currentCloudUser || !currentCloudUser.email) return;
    try {
      await firebaseAuth.sendPasswordResetEmail(currentCloudUser.email);
      showChangePasswordFeedback(`Email di ripristino inviata a ${currentCloudUser.email}. Controlla anche lo spam.`, true);
      showToast('📧 Email di reset password inviata!', 'cyan');
    } catch (err) {
      console.error('Errore invio email reset:', err);
      showChangePasswordFeedback('Errore nell\'invio dell\'email di reset. Riprova tra poco.', false);
    }
  });

  // Logout Utente
  $('btnAuthLogout')?.addEventListener('click', async () => {
    if (firebaseAuth) {
      try {
        await firebaseAuth.signOut();
      } catch (err) {
        console.warn('Errore logout:', err);
      }
    }
    deactivateUserSession('Disconnesso. Accedi con Email e Password per riaprire il tuo archivio.');
    showToast('Account disconnesso', 'amber');
  });

  // Escape key to close modals (tranne authModal se non autenticato)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if ($('modelModalBackdrop').style.display !== 'none') closeModal('modelModalBackdrop');
      else if ($('boxartModalBackdrop').style.display !== 'none') closeBoxartModal();
      else if ($('detailModalBackdrop').style.display !== 'none') closeModal('detailModalBackdrop');
      else if ($('authModalBackdrop') && $('authModalBackdrop').style.display !== 'none' && isAuthenticatedUser(currentCloudUser)) closeAuthModal();
    }
  });
}

function updateFilterUI() {
  const statusSel = $('statusFilterSelect');
  if (statusSel) {
    statusSel.value = filterStatus;
    statusSel.classList.toggle('filter-active', filterStatus !== 'ALL');
  }
  const scaleSel = $('scaleFilterSelect');
  if (scaleSel) {
    scaleSel.value = filterScale;
    scaleSel.classList.toggle('filter-active', filterScale !== 'ALL');
  }
  const catSel = $('categoryFilterSelect');
  if (catSel) {
    catSel.value = filterCategory;
    catSel.classList.toggle('filter-active', filterCategory !== 'ALL');
  }
  const sortSel = $('sortFilterSelect');
  if (sortSel) {
    sortSel.value = sortKey;
    sortSel.classList.toggle('filter-active', sortKey !== 'kitCode');
  }

  document.querySelectorAll('#statusFilterMatrix .rocker-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.status === filterStatus);
  });
  document.querySelectorAll('#scaleFilterMatrix .rocker-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.scale === filterScale);
  });
  document.querySelectorAll('#categoryFilterMatrix .rocker-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === filterCategory);
  });
  const brandInput = $('brandFilterInput');
  const clearBtn = $('btnClearBrandFilter');
  if (brandInput) {
    brandInput.value = filterBrand === 'ALL' ? '' : filterBrand;
  }
  if (clearBtn) {
    clearBtn.style.display = (filterBrand && filterBrand !== 'ALL') ? '' : 'none';
  }
}

function ensureStatusButtonsPresent() {
  const statusMatrix = $('statusFilterMatrix');
  if (statusMatrix && !statusMatrix.querySelector('[data-status="IN_TRANSIT"]')) {
    const backlogBtn = statusMatrix.querySelector('[data-status="BACKLOG"]');
    const btn = document.createElement('button');
    btn.className = 'rocker-btn';
    btn.dataset.status = 'IN_TRANSIT';
    btn.innerHTML = '<span class="led-jewel cyan-led"></span><span class="rocker-text">🚚 ACQUISTATO IN ARRIVO</span>';
    if (backlogBtn && backlogBtn.nextSibling) {
      statusMatrix.insertBefore(btn, backlogBtn.nextSibling);
    } else {
      statusMatrix.appendChild(btn);
    }
  }

  const formStatusDeck = $('formStatusDeck');
  if (formStatusDeck && !formStatusDeck.querySelector('input[value="IN_TRANSIT"]')) {
    const backlogInput = formStatusDeck.querySelector('input[value="BACKLOG"]');
    const backlogLabel = backlogInput ? backlogInput.closest('label') : null;
    const label = document.createElement('label');
    label.className = 'status-radio-pill';
    label.innerHTML = '<input type="radio" name="formStatus" value="IN_TRANSIT"><span class="pill-body">🚚 ACQUISTATO IN ARRIVO</span>';
    if (backlogLabel && backlogLabel.nextSibling) {
      formStatusDeck.insertBefore(label, backlogLabel.nextSibling);
    } else {
      formStatusDeck.appendChild(label);
    }
  }
}

// ─── BOOT SEQUENCE ────────────────────────────────────────────────────────────
async function bootSystem() {
  ensureStatusButtonsPresent();
  // Boot clock
  setInterval(updateClock, 1000);
  updateClock();

  // Generate SVG gauge ticks
  generateGaugeTicks();

  // Configura subito listener UI e blocca l'app in attesa di autenticazione obbligatoria
  setupEventListeners();
  updateFilterUI();
  setAppLocked(true);
  openAuthModal(true);

  // Avvia Firebase Auth & Firestore (sblocca automaticamente se l'utente è già autenticato)
  await initFirestore();

  console.log('%cSTATIC MODEL KIT INVENTORY -- BOOT COMPLETE (AUTH REQUIRED)', 'color:#ff007f;font-family:monospace;font-size:14px;');
}

// ─── ENTRYPOINT ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', bootSystem);
