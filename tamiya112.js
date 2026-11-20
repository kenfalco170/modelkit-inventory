/* =============================================================================
   TAMIYA 1/12 BIG SCALE (12001-12057) & MOTORCYCLE SERIES (14001-14144)
   tamiya112.js — Complete Static Model Kit Archive (201 Kits: 57 Auto + 144 Moto)
   ============================================================================= */

const TAMIYA_1_12_MODELS = [
  {
    name: "Honda F-1 RA273", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12001", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1967", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.1 — Kit ufficiale Tamiya scala 1:12 (1967).", photo: null
  },
  {
    name: "Lotus 49 Ford F-1", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12002", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1968", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.2 — Kit ufficiale Tamiya scala 1:12 (1968).", photo: null
  },
  {
    name: "Porsche 910 Carrera 10", brand: "Tamiya", scale: "1:12",
    category: "Sport Car", kitCode: "Tamiya 12003", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1968", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.3 — Kit ufficiale Tamiya scala 1:12 (1968).", photo: null
  },
  {
    name: "Lotus 49B Ford F-1", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12004", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1969", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.4 — Kit ufficiale Tamiya scala 1:12 (1969).", photo: null
  },
  {
    name: "Matra MS11", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12005", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1969", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.5 — Kit ufficiale Tamiya scala 1:12 (1969).", photo: null
  },
  {
    name: "Lola T-70 Mk.III", brand: "Tamiya", scale: "1:12",
    category: "Sport Car", kitCode: "Tamiya 12006", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1970", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.6 — Kit ufficiale Tamiya scala 1:12 (1970).", photo: null
  },
  {
    name: "Ferrari 312B", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12007", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1971", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.7 — Kit ufficiale Tamiya scala 1:12 (1971).", photo: null
  },
  {
    name: "Datsun 240Z Safari Car", brand: "Tamiya", scale: "1:12",
    category: "Rally", kitCode: "Tamiya 12008", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1972", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.8 — Kit ufficiale Tamiya scala 1:12 (1972).", photo: null
  },
  {
    name: "Tyrrell 003 Ford F-1", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12009", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1973", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.9 — Kit ufficiale Tamiya scala 1:12 (1973).", photo: null
  },
  {
    name: "Datsun 240ZG", brand: "Tamiya", scale: "1:12",
    category: "Auto Stradali", kitCode: "Tamiya 12010", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1973", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.10 — Kit ufficiale Tamiya scala 1:12 (1973).", photo: null
  },
  {
    name: "Honda F-1 RA273 (Reissue)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12011", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1982", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.11 — Kit ufficiale Tamiya scala 1:12 (1982).", photo: null
  },
  {
    name: "Lotus 49 Ford F-1 (Reissue)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12012", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1973", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.12 — Kit ufficiale Tamiya scala 1:12 (1973).", photo: null
  },
  {
    name: "John Player Special Lotus 72D", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12013", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1973", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.13 — Kit ufficiale Tamiya scala 1:12 (1973).", photo: null
  },
  {
    name: "Porsche 910 Carrera 10 (1974)", brand: "Tamiya", scale: "1:12",
    category: "Sport Car", kitCode: "Tamiya 12014", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1974", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.14 — Kit ufficiale Tamiya scala 1:12 (1974).", photo: null
  },
  {
    name: "Lola T-70 Mk.III (1974)", brand: "Tamiya", scale: "1:12",
    category: "Sport Car", kitCode: "Tamiya 12015", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1974", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.15 — Kit ufficiale Tamiya scala 1:12 (1974).", photo: null
  },
  {
    name: "Texaco Marlboro McLaren M23", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12016", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1974", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.16 — Kit ufficiale Tamiya scala 1:12 (1974).", photo: null
  },
  {
    name: "Yardley McLaren M23", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12017", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1975", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.17 — Kit ufficiale Tamiya scala 1:12 (1975).", photo: null
  },
  {
    name: "Brabham Martini BT44B", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12018", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1975", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.18 — Kit ufficiale Tamiya scala 1:12 (1975).", photo: null
  },
  {
    name: "Ferrari 312T", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12019", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1976", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.19 — Kit ufficiale Tamiya scala 1:12 (1976).", photo: null
  },
  {
    name: "Porsche Turbo RSR Type 934", brand: "Tamiya", scale: "1:12",
    category: "Sport Car", kitCode: "Tamiya 12020", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1976", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.20 — Kit ufficiale Tamiya scala 1:12 (1976).", photo: null
  },
  {
    name: "Tyrrell P34 Six Wheeler", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12021", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1977", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.21 — Kit ufficiale Tamiya scala 1:12 (1977).", photo: null
  },
  {
    name: "Team Lotus J.P.S. Mk.III (Type 78)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12022", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1978", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.22 — Kit ufficiale Tamiya scala 1:12 (1978).", photo: null
  },
  {
    name: "Martini Porsche 935 Turbo", brand: "Tamiya", scale: "1:12",
    category: "Sport Car", kitCode: "Tamiya 12023", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1977", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.23 — Kit ufficiale Tamiya scala 1:12 (1977).", photo: null
  },
  {
    name: "Wolf WR1 Ford F-1", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12024", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1978", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.24 — Kit ufficiale Tamiya scala 1:12 (1978).", photo: null
  },
  {
    name: "Ferrari 312T4", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12025", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1989", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.25 — Kit ufficiale Tamiya scala 1:12 (1989).", photo: null
  },
  {
    name: "Renault RE20 Turbo", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12026", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1990", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.26 — Kit ufficiale Tamiya scala 1:12 (1990).", photo: null
  },
  {
    name: "Ferrari 641/2 (F190)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12027", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1991", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.27 — Kit ufficiale Tamiya scala 1:12 (1991).", photo: null
  },
  {
    name: "McLaren MP4/6 Honda", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12028", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1991", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.28 — Kit ufficiale Tamiya scala 1:12 (1991).", photo: null
  },
  {
    name: "Williams FW14B Renault", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12029", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1992", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.29 — Kit ufficiale Tamiya scala 1:12 (1992).", photo: null
  },
  {
    name: "Ferrari 641/2 (F190) Vintage Selection", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12030", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1993", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.30 — Kit ufficiale Tamiya scala 1:12 (1993).", photo: null
  },
  {
    name: "Rover Mini Cooper 1.3i", brand: "Tamiya", scale: "1:12",
    category: "Auto Stradali", kitCode: "Tamiya 12031", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1995", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.31 — Kit ufficiale Tamiya scala 1:12 (1995).", photo: null
  },
  {
    name: "Honda RA273 (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12032", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2006", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.32 — Kit ufficiale Tamiya scala 1:12 (2006).", photo: null
  },
  {
    name: "Renault RE-20 Turbo (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12033", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2007", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.33 — Kit ufficiale Tamiya scala 1:12 (2007).", photo: null
  },
  {
    name: "Ferrari 312T (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12034", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2008", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.34 — Kit ufficiale Tamiya scala 1:12 (2008).", photo: null
  },
  {
    name: "Ferrari 312T4 (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12035", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2008", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.35 — Kit ufficiale Tamiya scala 1:12 (2008).", photo: null
  },
  {
    name: "Tyrrell P34 Six Wheeler (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12036", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2008", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.36 — Kit ufficiale Tamiya scala 1:12 (2008).", photo: null
  },
  {
    name: "Lotus Type 78 (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12037", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2008", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.37 — Kit ufficiale Tamiya scala 1:12 (2008).", photo: null
  },
  {
    name: "Porsche 935 Martini (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Sport Car", kitCode: "Tamiya 12038", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2009", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.38 — Kit ufficiale Tamiya scala 1:12 (2009).", photo: null
  },
  {
    name: "Tyrrell 003 1971 Monaco GP", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12039", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2009", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.39 — Kit ufficiale Tamiya scala 1:12 (2009).", photo: null
  },
  {
    name: "Porsche Turbo RSR Type 934 Jägermeister", brand: "Tamiya", scale: "1:12",
    category: "Sport Car", kitCode: "Tamiya 12040", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2008", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.40 — Kit ufficiale Tamiya scala 1:12 (2008).", photo: null
  },
  {
    name: "Porsche 910 (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Sport Car", kitCode: "Tamiya 12041", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2010", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.41 — Kit ufficiale Tamiya scala 1:12 (2010).", photo: null
  },
  {
    name: "Martini Brabham BT44B 1975 (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12042", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2010", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.42 — Kit ufficiale Tamiya scala 1:12 (2010).", photo: null
  },
  {
    name: "Lola T70 Mk.III (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Sport Car", kitCode: "Tamiya 12043", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2011", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.43 — Kit ufficiale Tamiya scala 1:12 (2011).", photo: null
  },
  {
    name: "Wolf WR1 1977 (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12044", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2010", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.44 — Kit ufficiale Tamiya scala 1:12 (2010).", photo: null
  },
  {
    name: "McLaren M23 1974 (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12045", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2011", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.45 — Kit ufficiale Tamiya scala 1:12 (2011).", photo: null
  },
  {
    name: "Team Lotus Type 72D 1972 (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12046", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2012", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.46 — Kit ufficiale Tamiya scala 1:12 (2012).", photo: null
  },
  {
    name: "Enzo Ferrari", brand: "Tamiya", scale: "1:12",
    category: "Sport Car", kitCode: "Tamiya 12047", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2012", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.47 — Kit ufficiale Tamiya scala 1:12 (2012).", photo: null
  },
  {
    name: "Ferrari 312B (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12048", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2012", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.48 — Kit ufficiale Tamiya scala 1:12 (2012).", photo: null
  },
  {
    name: "Yardley McLaren M23 1974 (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12049", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2012", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.49 — Kit ufficiale Tamiya scala 1:12 (2012).", photo: null
  },
  {
    name: "Porsche Carrera GT", brand: "Tamiya", scale: "1:12",
    category: "Sport Car", kitCode: "Tamiya 12050", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2013", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.50 — Kit ufficiale Tamiya scala 1:12 (2013).", photo: null
  },
  {
    name: "Nissan Fairlady 240ZG Street-Custom", brand: "Tamiya", scale: "1:12",
    category: "Auto Stradali", kitCode: "Tamiya 12051", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2014", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.51 — Kit ufficiale Tamiya scala 1:12 (2014).", photo: null
  },
  {
    name: "Team Lotus Type 49 1967 (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12052", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2014", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.52 — Kit ufficiale Tamiya scala 1:12 (2014).", photo: null
  },
  {
    name: "Team Lotus Type 49B 1968 (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12053", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2015", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.53 — Kit ufficiale Tamiya scala 1:12 (2015).", photo: null
  },
  {
    name: "Tyrrell 003 1971 Monaco GP (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Formula 1", kitCode: "Tamiya 12054", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2015", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.54 — Kit ufficiale Tamiya scala 1:12 (2015).", photo: null
  },
  {
    name: "Porsche 934 Jägermeister (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Sport Car", kitCode: "Tamiya 12055", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2019", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.55 — Kit ufficiale Tamiya scala 1:12 (2019).", photo: null
  },
  {
    name: "Porsche 934 Vaillant (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Sport Car", kitCode: "Tamiya 12056", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2020", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.56 — Kit ufficiale Tamiya scala 1:12 (2020).", photo: null
  },
  {
    name: "Porsche 935 Martini (w/Photo-Etched Parts)", brand: "Tamiya", scale: "1:12",
    category: "Sport Car", kitCode: "Tamiya 12057", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2020", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Big Scale Series No.57 — Kit ufficiale Tamiya scala 1:12 (2020).", photo: null
  },
  {
    name: "Yamaha YZR500 Grand Prix Racer", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14001", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1981", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.1 — Kit ufficiale Tamiya scala 1:12 (1981).", photo: null
  },
  {
    name: "Yamaha RZ250", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14002", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1981", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.2 — Kit ufficiale Tamiya scala 1:12 (1981).", photo: null
  },
  {
    name: "Suzuki RGB500 Grand Prix Racer", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14003", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1981", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.3 — Kit ufficiale Tamiya scala 1:12 (1981).", photo: null
  },
  {
    name: "Yamaha RZ350", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14004", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1981", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.4 — Kit ufficiale Tamiya scala 1:12 (1981).", photo: null
  },
  {
    name: "Yamaha Scooter Beluga 80", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14005", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1982", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.5 — Kit ufficiale Tamiya scala 1:12 (1982).", photo: null
  },
  {
    name: "Honda CB750F", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14006", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1982", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.6 — Kit ufficiale Tamiya scala 1:12 (1982).", photo: null
  },
  {
    name: "Honda CB900F2 Bol d'Or", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14007", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1982", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.7 — Kit ufficiale Tamiya scala 1:12 (1982).", photo: null
  },
  {
    name: "Honda CB1100R", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14008", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1983", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.8 — Kit ufficiale Tamiya scala 1:12 (1983).", photo: null
  },
  {
    name: "Suzuki RGB500 Team Gallina", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14009", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2006", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.9 — Kit ufficiale Tamiya scala 1:12 (2006).", photo: null
  },
  {
    name: "Suzuki GSX1100S Katana", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14010", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1983", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.10 — Kit ufficiale Tamiya scala 1:12 (1983).", photo: null
  },
  {
    name: "Honda CR250R", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14011", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1983", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.11 — Kit ufficiale Tamiya scala 1:12 (1983).", photo: null
  },
  {
    name: "Kawasaki KR1000F Endurance Racer", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14012", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1983", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.12 — Kit ufficiale Tamiya scala 1:12 (1983).", photo: null
  },
  {
    name: "Suzuki RM250 Motocrosser", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14013", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1983", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.13 — Kit ufficiale Tamiya scala 1:12 (1983).", photo: null
  },
  {
    name: "Honda RS1000 Endurance Racer", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14014", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1982", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.14 — Kit ufficiale Tamiya scala 1:12 (1982).", photo: null
  },
  {
    name: "Suzuki GSX750S Katana", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14015", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1983", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.15 — Kit ufficiale Tamiya scala 1:12 (1983).", photo: null
  },
  {
    name: "Honda CX500 Turbo", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14016", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1982", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.16 — Kit ufficiale Tamiya scala 1:12 (1982).", photo: null
  },
  {
    name: "Honda VT250F", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14017", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1983", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.17 — Kit ufficiale Tamiya scala 1:12 (1983).", photo: null
  },
  {
    name: "Honda CR450R Motocrosser", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14018", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1983", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.18 — Kit ufficiale Tamiya scala 1:12 (1983).", photo: null
  },
  {
    name: "Ducati 900 Mike Hailwood Replica", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14019", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1983", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.19 — Kit ufficiale Tamiya scala 1:12 (1983).", photo: null
  },
  {
    name: "Suzuki GSX750 Police Bike", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14020", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1984", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.20 — Kit ufficiale Tamiya scala 1:12 (1984).", photo: null
  },
  {
    name: "Honda VF750F", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14021", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1984", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.21 — Kit ufficiale Tamiya scala 1:12 (1984).", photo: null
  },
  {
    name: "Ducati 900 NCR Racer", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14022", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1983", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.22 — Kit ufficiale Tamiya scala 1:12 (1983).", photo: null
  },
  {
    name: "Honda MVX250F", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14023", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1984", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.23 — Kit ufficiale Tamiya scala 1:12 (1984).", photo: null
  },
  {
    name: "Suzuki RG250 Gamma", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14024", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1983", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.24 — Kit ufficiale Tamiya scala 1:12 (1983).", photo: null
  },
  {
    name: "Ducati 900SS", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14025", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1983", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.25 — Kit ufficiale Tamiya scala 1:12 (1983).", photo: null
  },
  {
    name: "Kenny Roberts & Yamaha YZR500", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14026", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1984", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.26 — Kit ufficiale Tamiya scala 1:12 (1984).", photo: null
  },
  {
    name: "Jumping Rider Figure", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14027", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1983", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.27 — Kit ufficiale Tamiya scala 1:12 (1983).", photo: null
  },
  {
    name: "Kawasaki KR500 Grand Prix Racer", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14028", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1984", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.28 — Kit ufficiale Tamiya scala 1:12 (1984).", photo: null
  },
  {
    name: "Suzuki RG250 Gamma w/Full Options", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14029", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1984", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.29 — Kit ufficiale Tamiya scala 1:12 (1984).", photo: null
  },
  {
    name: "Honda VT250F Integra", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14030", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1984", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.30 — Kit ufficiale Tamiya scala 1:12 (1984).", photo: null
  },
  {
    name: "Honda VF750F (Export)", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14031", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1984", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.31 — Kit ufficiale Tamiya scala 1:12 (1984).", photo: null
  },
  {
    name: "Honda NS500 Grand Prix Racer", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14032", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1984", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.32 — Kit ufficiale Tamiya scala 1:12 (1984).", photo: null
  },
  {
    name: "Racing Rider Figure", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14033", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1984", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.33 — Kit ufficiale Tamiya scala 1:12 (1984).", photo: null
  },
  {
    name: "Suzuki GSX750S New Katana", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14034", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1985", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.34 — Kit ufficiale Tamiya scala 1:12 (1985).", photo: null
  },
  {
    name: "Honda CBR400F", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14035", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1985", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.35 — Kit ufficiale Tamiya scala 1:12 (1985).", photo: null
  },
  {
    name: "BMW K100", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14036", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1984", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.36 — Kit ufficiale Tamiya scala 1:12 (1984).", photo: null
  },
  {
    name: "Yamaha RZV500R", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14037", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1984", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.37 — Kit ufficiale Tamiya scala 1:12 (1984).", photo: null
  },
  {
    name: "Yamaha YZR500 (0W70)", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14038", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1985", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.38 — Kit ufficiale Tamiya scala 1:12 (1985).", photo: null
  },
  {
    name: "Honda CBR400F Endurance", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14039", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1986", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.39 — Kit ufficiale Tamiya scala 1:12 (1986).", photo: null
  },
  {
    name: "Straight Run Rider Figure", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14040", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1985", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.40 — Kit ufficiale Tamiya scala 1:12 (1985).", photo: null
  },
  {
    name: "Starting Rider Figure", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14041", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1985", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.41 — Kit ufficiale Tamiya scala 1:12 (1985).", photo: null
  },
  {
    name: "Honda NS500 with Starting Rider", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14042", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1986", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.42 — Kit ufficiale Tamiya scala 1:12 (1986).", photo: null
  },
  {
    name: "Yamaha YZR500 0W70 with Straight Run Rider", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14043", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1986", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.43 — Kit ufficiale Tamiya scala 1:12 (1986).", photo: null
  },
  {
    name: "Yamaha XV1000 Virago", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14044", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1986", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.44 — Kit ufficiale Tamiya scala 1:12 (1986).", photo: null
  },
  {
    name: "Kawasaki GPZ400R", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14045", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1986", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.45 — Kit ufficiale Tamiya scala 1:12 (1986).", photo: null
  },
  {
    name: "KTM 250MX", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14046", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1986", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.46 — Kit ufficiale Tamiya scala 1:12 (1986).", photo: null
  },
  {
    name: "Yamaha FZ250 Phazer", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14047", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1986", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.47 — Kit ufficiale Tamiya scala 1:12 (1986).", photo: null
  },
  {
    name: "Yamaha SRX-600", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14048", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1986", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.48 — Kit ufficiale Tamiya scala 1:12 (1986).", photo: null
  },
  {
    name: "BMW R80 G/S", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14049", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1987", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.49 — Kit ufficiale Tamiya scala 1:12 (1987).", photo: null
  },
  {
    name: "Honda NS500 '84", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14050", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1987", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.50 — Kit ufficiale Tamiya scala 1:12 (1987).", photo: null
  },
  {
    name: "KTM 250MX with Motocross Rider", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14051", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1987", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.51 — Kit ufficiale Tamiya scala 1:12 (1987).", photo: null
  },
  {
    name: "Yamaha XV1000 Virago Special", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14052", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1986", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.52 — Kit ufficiale Tamiya scala 1:12 (1986).", photo: null
  },
  {
    name: "Suzuki RG250 Walter Wolf Special", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14053", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1987", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.53 — Kit ufficiale Tamiya scala 1:12 (1987).", photo: null
  },
  {
    name: "Honda NXR750 Paris-Dakar", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14054", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1986", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.54 — Kit ufficiale Tamiya scala 1:12 (1986).", photo: null
  },
  {
    name: "Honda NSR500 Grand Prix Racer", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14055", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1987", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.55 — Kit ufficiale Tamiya scala 1:12 (1987).", photo: null
  },
  {
    name: "BMW R80 G/S Paris-Dakar", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14056", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1988", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.56 — Kit ufficiale Tamiya scala 1:12 (1988).", photo: null
  },
  {
    name: "Honda VFR750R (RC30)", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14057", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1989", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.57 — Kit ufficiale Tamiya scala 1:12 (1989).", photo: null
  },
  {
    name: "Yamaha FZR750R (OW01)", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14058", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1989", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.58 — Kit ufficiale Tamiya scala 1:12 (1989).", photo: null
  },
  {
    name: "Honda NSR250 Repsol", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14059", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1992", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.59 — Kit ufficiale Tamiya scala 1:12 (1992).", photo: null
  },
  {
    name: "Honda NR750", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14060", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1993", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.60 — Kit ufficiale Tamiya scala 1:12 (1993).", photo: null
  },
  {
    name: "Honda NSR250", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14061", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1993", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.61 — Kit ufficiale Tamiya scala 1:12 (1993).", photo: null
  },
  {
    name: "Bimota Tesi 1D 906SR", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14062", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1993", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.62 — Kit ufficiale Tamiya scala 1:12 (1993).", photo: null
  },
  {
    name: "Ducati 888 Superbike Racer", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14063", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1994", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.63 — Kit ufficiale Tamiya scala 1:12 (1994).", photo: null
  },
  {
    name: "Yamaha TZ250M", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14064", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1995", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.64 — Kit ufficiale Tamiya scala 1:12 (1995).", photo: null
  },
  {
    name: "Suzuki GSX1100S Katana Custom Tuned", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14065", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1995", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.65 — Kit ufficiale Tamiya scala 1:12 (1995).", photo: null
  },
  {
    name: "Honda CB750F Custom Tuned", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14066", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1995", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.66 — Kit ufficiale Tamiya scala 1:12 (1995).", photo: null
  },
  {
    name: "Yamaha TZ250M '94", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14067", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1995", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.67 — Kit ufficiale Tamiya scala 1:12 (1995).", photo: null
  },
  {
    name: "Ducati 916", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14068", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1996", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.68 — Kit ufficiale Tamiya scala 1:12 (1996).", photo: null
  },
  {
    name: "Moto Guzzi V10 Centauro", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14069", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1998", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.69 — Kit ufficiale Tamiya scala 1:12 (1998).", photo: null
  },
  {
    name: "Honda CBR1100XX Super Blackbird", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14070", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1998", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.70 — Kit ufficiale Tamiya scala 1:12 (1998).", photo: null
  },
  {
    name: "Honda NSR500 '98 Repsol", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14071", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1999", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.71 — Kit ufficiale Tamiya scala 1:12 (1999).", photo: null
  },
  {
    name: "Honda MoviStar Pons NSR500 '98", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14072", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1999", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.72 — Kit ufficiale Tamiya scala 1:12 (1999).", photo: null
  },
  {
    name: "Yamaha YZF-R1", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14073", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1999", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.73 — Kit ufficiale Tamiya scala 1:12 (1999).", photo: null
  },
  {
    name: "Yamaha YZF-R1 Taira Racing", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14074", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1999", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.74 — Kit ufficiale Tamiya scala 1:12 (1999).", photo: null
  },
  {
    name: "Yamaha YZR500 (0W70) Taira Version", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14075", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2000", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.75 — Kit ufficiale Tamiya scala 1:12 (2000).", photo: null
  },
  {
    name: "Yamaha Red Bull WCM YZR500 '99", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14076", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2000", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.76 — Kit ufficiale Tamiya scala 1:12 (2000).", photo: null
  },
  {
    name: "Honda Repsol NSR500 '99", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14077", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "1999", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.77 — Kit ufficiale Tamiya scala 1:12 (1999).", photo: null
  },
  {
    name: "Antena 3 Yamaha D'Antin YZR500", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14078", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2000", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.78 — Kit ufficiale Tamiya scala 1:12 (2000).", photo: null
  },
  {
    name: "Honda CBR1100XX Super Blackbird With Me", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14079", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2001", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.79 — Kit ufficiale Tamiya scala 1:12 (2001).", photo: null
  },
  {
    name: "Yamaha XV1600 RoadStar", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14080", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2000", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.80 — Kit ufficiale Tamiya scala 1:12 (2000).", photo: null
  },
  {
    name: "Suzuki RGV-Gamma (XR89)", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14081", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2000", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.81 — Kit ufficiale Tamiya scala 1:12 (2000).", photo: null
  },
  {
    name: "Honda NSR500 Nastro Azzurro", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14082", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2000", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.82 — Kit ufficiale Tamiya scala 1:12 (2000).", photo: null
  },
  {
    name: "Suzuki RGV-Gamma (XR89) '00", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14083", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2002", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.83 — Kit ufficiale Tamiya scala 1:12 (2002).", photo: null
  },
  {
    name: "Kawasaki Ninja ZX-12R", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14084", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2002", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.84 — Kit ufficiale Tamiya scala 1:12 (2002).", photo: null
  },
  {
    name: "Yamaha YZF-R1 Taira Racing (Full View)", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14085", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2002", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.85 — Kit ufficiale Tamiya scala 1:12 (2002).", photo: null
  },
  {
    name: "Yamaha Tech 3 YZR500 '01", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14086", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2001", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.86 — Kit ufficiale Tamiya scala 1:12 (2001).", photo: null
  },
  {
    name: "Honda Pons NSR500 '01", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14087", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2001", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.87 — Kit ufficiale Tamiya scala 1:12 (2001).", photo: null
  },
  {
    name: "Yamaha Factory YZR500 '01", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14088", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2001", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.88 — Kit ufficiale Tamiya scala 1:12 (2001).", photo: null
  },
  {
    name: "Suzuki RGV-Gamma (XR89) '01", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14089", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2002", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.89 — Kit ufficiale Tamiya scala 1:12 (2002).", photo: null
  },
  {
    name: "Suzuki GSX1300R Hayabusa", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14090", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2002", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.90 — Kit ufficiale Tamiya scala 1:12 (2002).", photo: null
  },
  {
    name: "Yamaha D'Antin Antena 3 YZR500 '02", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14091", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2003", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.91 — Kit ufficiale Tamiya scala 1:12 (2003).", photo: null
  },
  {
    name: "Repsol Honda RC211V '02", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14092", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2003", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.92 — Kit ufficiale Tamiya scala 1:12 (2003).", photo: null
  },
  {
    name: "Yoshimura Hayabusa X-1", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14093", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2004", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.93 — Kit ufficiale Tamiya scala 1:12 (2004).", photo: null
  },
  {
    name: "Repsol Honda RC211V '03", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14094", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2003", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.94 — Kit ufficiale Tamiya scala 1:12 (2003).", photo: null
  },
  {
    name: "Team Honda Pons RC211V '03", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14095", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2003", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.95 — Kit ufficiale Tamiya scala 1:12 (2003).", photo: null
  },
  {
    name: "Telefonica MoviStar Honda RC211V '03", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14096", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2004", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.96 — Kit ufficiale Tamiya scala 1:12 (2004).", photo: null
  },
  {
    name: "Repsol Honda RC211V '03 Valencia", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14097", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2004", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.97 — Kit ufficiale Tamiya scala 1:12 (2004).", photo: null
  },
  {
    name: "Yamaha YZR-M1 '04 No.46/No.17", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14098", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2004", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.98 — Kit ufficiale Tamiya scala 1:12 (2004).", photo: null
  },
  {
    name: "Honda NSR500 '84", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14099", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2005", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.99 — Kit ufficiale Tamiya scala 1:12 (2005).", photo: null
  },
  {
    name: "Yamaha YZR-M1 '04 No.7/No.33", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14100", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2005", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.100 — Kit ufficiale Tamiya scala 1:12 (2005).", photo: null
  },
  {
    name: "Ducati Desmosedici GP4", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14101", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2006", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.101 — Kit ufficiale Tamiya scala 1:12 (2006).", photo: null
  },
  {
    name: "Honda Pons RC211V '03", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14102", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2006", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.102 — Kit ufficiale Tamiya scala 1:12 (2006).", photo: null
  },
  {
    name: "D'Antin Pramac Ducati GP4", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14103", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2006", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.103 — Kit ufficiale Tamiya scala 1:12 (2006).", photo: null
  },
  {
    name: "Yamaha YZR-M1 '05 US Intercoloring", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14104", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2006", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.104 — Kit ufficiale Tamiya scala 1:12 (2006).", photo: null
  },
  {
    name: "Yamaha YZR-M1 50th Ann. Valencia MotoGP", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14105", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2007", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.105 — Kit ufficiale Tamiya scala 1:12 (2007).", photo: null
  },
  {
    name: "Repsol Honda RC211V '06", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14106", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2006", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.106 — Kit ufficiale Tamiya scala 1:12 (2006).", photo: null
  },
  {
    name: "Konica Minolta Honda RC211V '06", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14107", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2007", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.107 — Kit ufficiale Tamiya scala 1:12 (2007).", photo: null
  },
  {
    name: "Honda RC211V Team LCR '06", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14108", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2007", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.108 — Kit ufficiale Tamiya scala 1:12 (2007).", photo: null
  },
  {
    name: "Kawasaki Ninja ZX-RR", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14109", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2007", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.109 — Kit ufficiale Tamiya scala 1:12 (2007).", photo: null
  },
  {
    name: "Honda NSR250 Ajinomoto", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14110", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2009", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.110 — Kit ufficiale Tamiya scala 1:12 (2009).", photo: null
  },
  {
    name: "Kawasaki ZZR 1400", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14111", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2009", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.111 — Kit ufficiale Tamiya scala 1:12 (2009).", photo: null
  },
  {
    name: "Kawasaki Ninja ZX-14 Special Color", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14112", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2009", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.112 — Kit ufficiale Tamiya scala 1:12 (2009).", photo: null
  },
  {
    name: "Honda RC166 GP Racer", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14113", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2009", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.113 — Kit ufficiale Tamiya scala 1:12 (2009).", photo: null
  },
  {
    name: "Yamaha YZR-M1 '05 No.46/No.5", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14114", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2011", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.114 — Kit ufficiale Tamiya scala 1:12 (2011).", photo: null
  },
  {
    name: "Yamaha YZR-M1 '05 Valencia", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14115", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2011", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.115 — Kit ufficiale Tamiya scala 1:12 (2011).", photo: null
  },
  {
    name: "Yamaha YZR-M1 2005 Laguna Seca", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14116", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2011", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.116 — Kit ufficiale Tamiya scala 1:12 (2011).", photo: null
  },
  {
    name: "Yamaha YZR-M1 '09 Fiat Yamaha Team", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14117", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2011", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.117 — Kit ufficiale Tamiya scala 1:12 (2011).", photo: null
  },
  {
    name: "Valentino Rossi Figure High Speed Riding", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14118", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2011", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.118 — Kit ufficiale Tamiya scala 1:12 (2011).", photo: null
  },
  {
    name: "Yamaha YZR-M1 '09 Monster Tech3", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14119", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2011", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.119 — Kit ufficiale Tamiya scala 1:12 (2011).", photo: null
  },
  {
    name: "Yamaha YZR-M1 '09 Estoril Edition", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14120", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2012", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.120 — Kit ufficiale Tamiya scala 1:12 (2012).", photo: null
  },
  {
    name: "Honda NSR500 '84", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14121", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2012", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.121 — Kit ufficiale Tamiya scala 1:12 (2012).", photo: null
  },
  {
    name: "Racing Rider Figure (Reissue)", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14122", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2013", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.122 — Kit ufficiale Tamiya scala 1:12 (2013).", photo: null
  },
  {
    name: "Straight Run Rider Figure (Reissue)", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14123", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2013", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.123 — Kit ufficiale Tamiya scala 1:12 (2013).", photo: null
  },
  {
    name: "Starting Rider Figure (Reissue)", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14124", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2013", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.124 — Kit ufficiale Tamiya scala 1:12 (2013).", photo: null
  },
  {
    name: "Honda NS500 '84", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14125", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2013", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.125 — Kit ufficiale Tamiya scala 1:12 (2013).", photo: null
  },
  {
    name: "Honda NSR500 '84 (Full View)", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14126", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2013", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.126 — Kit ufficiale Tamiya scala 1:12 (2013).", photo: null
  },
  {
    name: "Honda RC166 GP Racer (Full View)", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14127", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2013", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.127 — Kit ufficiale Tamiya scala 1:12 (2013).", photo: null
  },
  {
    name: "Yamaha YZR-M1 '09 Fiat Yamaha Team (Full View)", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14128", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2013", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.128 — Kit ufficiale Tamiya scala 1:12 (2013).", photo: null
  },
  {
    name: "Ducati 1199 Panigale S", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14129", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2014", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.129 — Kit ufficiale Tamiya scala 1:12 (2014).", photo: null
  },
  {
    name: "Repsol Honda RC213V '14", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14130", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2016", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.130 — Kit ufficiale Tamiya scala 1:12 (2016).", photo: null
  },
  {
    name: "Kawasaki Ninja H2R", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14131", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2016", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.131 — Kit ufficiale Tamiya scala 1:12 (2016).", photo: null
  },
  {
    name: "Ducati 1199 Panigale S Tricolore", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14132", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2017", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.132 — Kit ufficiale Tamiya scala 1:12 (2017).", photo: null
  },
  {
    name: "Yamaha YZF-R1M", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14133", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2018", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.133 — Kit ufficiale Tamiya scala 1:12 (2018).", photo: null
  },
  {
    name: "Honda Monkey 125", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14134", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2019", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.134 — Kit ufficiale Tamiya scala 1:12 (2019).", photo: null
  },
  {
    name: "Yamaha XV1600 RoadStar Custom", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14135", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2019", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.135 — Kit ufficiale Tamiya scala 1:12 (2019).", photo: null
  },
  {
    name: "Kawasaki Ninja H2 Carbon", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14136", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2020", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.136 — Kit ufficiale Tamiya scala 1:12 (2020).", photo: null
  },
  {
    name: "Street Rider Figure", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14137", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2019", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.137 — Kit ufficiale Tamiya scala 1:12 (2019).", photo: null
  },
  {
    name: "Honda CBR1000RR-R Fireblade SP", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14138", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2020", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.138 — Kit ufficiale Tamiya scala 1:12 (2020).", photo: null
  },
  {
    name: "Team Suzuki ECSTAR GSX-RR '20", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14139", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2021", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.139 — Kit ufficiale Tamiya scala 1:12 (2021).", photo: null
  },
  {
    name: "Ducati Superleggera V4", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14140", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2022", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.140 — Kit ufficiale Tamiya scala 1:12 (2022).", photo: null
  },
  {
    name: "Honda CBR1000RR-R Fireblade SP 30th Anniversary", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14141", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2023", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.141 — Kit ufficiale Tamiya scala 1:12 (2023).", photo: null
  },
  {
    name: "Honda Dax 125 Tamiya Limited Edition", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14142", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2024", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.142 — Kit ufficiale Tamiya scala 1:12 (2024).", photo: null
  },
  {
    name: "Ducati Superleggera V4 with Racing Kit", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14143", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2025", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.143 — Kit ufficiale Tamiya scala 1:12 (2025).", photo: null
  },
  {
    name: "Honda CB1000F", brand: "Tamiya", scale: "1:12",
    category: "Moto", kitCode: "Tamiya 14144", status: "WISHLIST", progress: 0,
    stage: "Non Iniziato (Backlog)", location: "", year: "2026", purchasePrice: 0, estimatedValue: 0,
    paints: "", aftermarket: "",
    notes: "Tamiya 1/12 Motorcycle Series No.144 — Kit ufficiale Tamiya scala 1:12 (2026).", photo: null
  }
];
