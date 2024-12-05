export class Organisation {
  organisationID: string;
  code: string;
  abbreviationFr: string;
  abbreviationUs: string;
  libelleFr: string;
  libelleUs: string;
  dateCreation: string;
  dateCessation: string | null;
  actif: boolean;
  ville: string;
  piedpage: string;
  boitepostale: string;
  activite: string;
  telephone: string;
  email: string;
  localisation: string;
  localiteID: string;
  secteurID: string;
  categorieID: string;
  sousCategorieID: string;
  budgetModeID: string | null;
  comptabiliteDC: boolean;
  last_update: string;
  user_update: string;
  ip_update: string;

  constructor(
    organisationID: string,
    code: string,
    abbreviationFr: string,
    abbreviationUs: string,
    libelleFr: string,
    libelleUs: string,
    dateCreation: string,
    dateCessation: string | null,
    actif: boolean,
    ville: string,
    piedpage: string,
    boitepostale: string,
    activite: string,
    telephone: string,
    email: string,
    localisation: string,
    localiteID: string,
    secteurID: string,
    categorieID: string,
    sousCategorieID: string,
    budgetModeID: string | null,
    comptabiliteDC: boolean,
    last_update: string,
    user_update: string,
    ip_update: string
  ) {
    this.organisationID = organisationID;
    this.code = code;
    this.abbreviationFr = abbreviationFr;
    this.abbreviationUs = abbreviationUs;
    this.libelleFr = libelleFr;
    this.libelleUs = libelleUs;
    this.dateCreation = dateCreation;
    this.dateCessation = dateCessation;
    this.actif = actif;
    this.ville = ville;
    this.piedpage = piedpage;
    this.boitepostale = boitepostale;
    this.activite = activite;
    this.telephone = telephone;
    this.email = email;
    this.localisation = localisation;
    this.localiteID = localiteID;
    this.secteurID = secteurID;
    this.categorieID = categorieID;
    this.sousCategorieID = sousCategorieID;
    this.budgetModeID = budgetModeID;
    this.comptabiliteDC = comptabiliteDC;
    this.last_update = last_update;
    this.user_update = user_update;
    this.ip_update = ip_update;
  }
}
