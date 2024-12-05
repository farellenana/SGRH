export class Exercice {
  millesime: string;
  last_update: string;
  user_update: string;
  ip_update: string;
  libelleFr: string;
  libelleUs: string;
  dateDebut: string;
  dateFin: string;
  enProgrammation: boolean;
  enBudgetisation: boolean;
  enExecution: boolean;
  enCloture: boolean;

  constructor(
    millesime: string,
    last_update: string,
    user_update: string,
    ip_update: string,
    libelleFr: string,
    libelleUs: string,
    dateDebut: string,
    dateFin: string,
    enProgrammation: boolean,
    enBudgetisation: boolean,
    enExecution: boolean,
    enCloture: boolean
  ) {
    this.millesime = millesime;
    this.last_update = last_update;
    this.user_update = user_update;
    this.ip_update = ip_update;
    this.libelleFr = libelleFr;
    this.libelleUs = libelleUs;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.enProgrammation = enProgrammation;
    this.enBudgetisation = enBudgetisation;
    this.enExecution = enExecution;
    this.enCloture = enCloture;
  }
}
