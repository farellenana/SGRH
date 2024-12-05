export class Structure {
  structureID: string;
  code: string;
  abbreviationFr: string;
  abbreviationUs: string;
  libelleFr: string;
  libelleUs: string;
  dateCreation: string;
  dateCessation: string | null;
  actif: boolean;
  organisationID: string;
  posteComptableID: string;
  structureParentID: string | null;
  uniteOrganiqueID: string;
  last_update: string;
  user_update: string;
  ip_update: string;
  libelleStructureParent: string;
  libelleOrganisation: string;
  tdb: number;
  categorieCode: string;
  fonctionCode: string;
  localiteCode: string;

  constructor(
    structureID: string,
    code: string,
    abbreviationFr: string,
    abbreviationUs: string,
    libelleFr: string,
    libelleUs: string,
    dateCreation: string,
    dateCessation: string | null,
    actif: boolean,
    organisationID: string,
    posteComptableID: string,
    structureParentID: string | null,
    uniteOrganiqueID: string,
    last_update: string,
    user_update: string,
    ip_update: string,
    libelleStructureParent: string,
    libelleOrganisation: string,
    tdb: number,
    categorieCode: string,
    fonctionCode: string,
    localiteCode: string
  ) {
    this.structureID = structureID;
    this.code = code;
    this.abbreviationFr = abbreviationFr;
    this.abbreviationUs = abbreviationUs;
    this.libelleFr = libelleFr;
    this.libelleUs = libelleUs;
    this.dateCreation = dateCreation;
    this.dateCessation = dateCessation;
    this.actif = actif;
    this.organisationID = organisationID;
    this.posteComptableID = posteComptableID;
    this.structureParentID = structureParentID;
    this.uniteOrganiqueID = uniteOrganiqueID;
    this.last_update = last_update;
    this.user_update = user_update;
    this.ip_update = ip_update;
    this.libelleStructureParent = libelleStructureParent;
    this.libelleOrganisation = libelleOrganisation;
    this.tdb = tdb;
    this.categorieCode = categorieCode;
    this.fonctionCode = fonctionCode;
    this.localiteCode = localiteCode;
  }
}
