  import { organisations } from 'src/app/lists/organisationList';
  import { AcademicBackground } from 'src/app/model/AcademicBackground';
  import { Document } from 'src/app/model/Document';
  import { ProfessionalBackground } from 'src/app/model/ProfessionalBackground';
  export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    SUSPENDED = 'SUSPENDED',
  }

  export class Employe {
    employeID!: string;
    matricule!: string;
    firstName!: string;
    lastName!: string;
    picture!: string; // Optionnel
    birthdate!: Date;
    post!: string;
    birthPlace!: string;
    gender!: string;
    nationality!: string;
    maritalStatus!: string;
    children!: number; // Optionnel
    address!: string;
    phone!: string;
    email!: string;
    socialSecurityNumber!: string;
    taxId!: string;
    identificationCardNumber!: string;
    issueDate!: Date; // Date de délivrance
    expirationDate!: Date; // Date d'expiration
    emergencyContactName!: string;
    relationship!: string;
    emergencyContactPhone!: string; // Changement de number à string
    emergencyContactAddress!: string;
    hireDate!: Date; // Date d'embauche
    positionLevel!: string; // Niveau de poste (ex: Junior, Senior)
    department!: string; // Département de l'employé
    salary!: number; // Salaire
    benefits!: string[]; // Liste des avantages
    academicBackground: AcademicBackground[] = []; // Background académique avec un élément par défaut
    professionalBackground: ProfessionalBackground[] = []; // Background professionnel
    skills: string[]=[]; // Compétences
    status!: UserStatus; // Statut
    documents: Document[] = [];
    organisationID!: string;
    structureID!: string;
    exerciceID!: string;
    profilePhotoFile?: any;
  }
