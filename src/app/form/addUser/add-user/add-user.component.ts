import { environment } from 'src/app/environments/environment';
import { AcademicBackground } from './../../../model/AcademicBackground';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Employe } from '../../../model/employer';
import { ProfessionalBackground } from 'src/app/model/ProfessionalBackground';
import { Document } from 'src/app/model/Document';
import { Modal } from 'bootstrap';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRhService } from 'src/app/service/ApiRh/api-rh.service';
import { DocFile } from 'src/app/model/DocFile';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  documents: Document[] = [];
  academicBackground: AcademicBackground[] = [];
  professionalBackground: ProfessionalBackground[] = [];
  skills: string[] = [];
  benefits: string[] = [];
  showForms: boolean[] = [];
  organisationId!: string;
  files: DocFile[] = [];
  selectedFile: File[] = [];

  profilePhoto: any;
  employe: Employe = new Employe();
  doc: Document = new Document();
  academic: AcademicBackground = new AcademicBackground();
  professional: ProfessionalBackground = new ProfessionalBackground();
  skill: string = '';
  benefit: string = '';
  visible: boolean = false;
  academicDialogVisible: boolean = false;
  professionalDialogVisible: boolean = false;
  isEditMode: boolean = false;
  employeeId: string | null = null;

  constructor(
    private userService: UserService,
    private apiRhService: ApiRhService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.organisationId = params['organisationId'];
      console.log('Organisation ID:', this.organisationId);

      const employeeId = params['employeeId'];

      if (employeeId) {
        this.isEditMode = true;
        this.loadEmployeeData(employeeId);
      }
    });
  }

  listDocumentByEmploye(employeID: string) {
    const fileType = '';
    this.apiRhService.listFichier(employeID, fileType).subscribe(
      (response) => {
        console.log('Documents:', response);
        this.documents = response;
      },
      (error) => {
        console.error('Error loading documents:', error);
      }
    );
  }

  listAcademicBackgroundByEmploye(employeID: string): void {
    this.apiRhService.getAcademicBackground(employeID).subscribe(
      (response) => {
        console.log('academicBackground:', response);
        this.academicBackground = response;
      },
      (error) => {
        console.error('erreur lors du chargement du parcour academique');
      }
    );
  }
  listProfesionnalBackgroundByEmploye(employeID: string) {
    this.apiRhService.getProfessionalBackground(employeID).subscribe(
      (response) => {
        console.log('professionalBackground:', response);
        this.professionalBackground = response;
      },
      (error) => {
        console.error('erreur lors du chargement du parcour academique');
      }
    );
  }

  // caharger les information pour la modification
  loadEmployeeData(employeeId: string): void {
    this.userService.getEmployeeById(employeeId, this.organisationId).subscribe(
      (employee) => {
        console.log(employee);
        if (employee) {
          this.employe = employee[0];
          this.loadImageForEmploye(this.employe);
          this.listDocumentByEmploye(employee[0].employeID);
          this.listAcademicBackgroundByEmploye(employee[0].employeID);
          this.listProfesionnalBackgroundByEmploye(employee[0].employeID);
        } else {
          console.error('Employé non trouvé');
        }
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des détails de l'employé :",
          error
        );
      }
    );
  }

  // charger l'image pour la modification
  loadImageForEmploye(employe: Employe): void {
    console.log(this.employe);
    this.apiRhService.fichierDownload(employe.picture).subscribe(
      (blob: Blob) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.employe.profilePhotoFile = e.target.result;
        };
        reader.readAsDataURL(blob);
      },
      (error) => {
        console.error(
          'Erreur lors du téléchargement de la photo de profil:',
          error
        );
      }
    );
  }

  // ajouter la liste des Competences
  addSkill() {
    this.skill = '';
    if (this.skill) {
      this.employe.skills.push(this.skill); // Ajoute la compétence
      this.skill = '';
    }
  }

  // ajouter la liste des avantages
  addBenefit() {
    if (this.benefit) {
      this.employe.benefits.push(this.benefit);
      this.benefit = '';
    }
  }

  onSubmit(): void {
    this.employe.documents = this.documents;
    this.employe.organisationID = this.organisationId;
    this.employe.academicBackground = this.academicBackground;
    this.employe.professionalBackground = this.professionalBackground;
    this.employe.skills = this.skills;
    console.log('Compétences soumises:', this.skills);
    console.log("L'ajout de l'employé :", this.employe);
    if (this.isEditMode) {
      // Update employee
      this.userService.addEmployee(this.employe).subscribe(
        (employe: Employe) => {
          this.saveFile();
          this.savePP(employe.employeID);
          this.showSuccessModal();
        },
        (error) => {
          console.error("Erreur lors de la mise à jour de l'employé", error);
        }
      );
    } else {
      this.userService.addEmployee(this.employe).subscribe(
        (employe: Employe) => {
          this.saveFile();
          this.savePP(employe.employeID);
          this.showSuccessModal();
        },
        (error) => {
          console.error("Erreur lors de l'ajout de l'employé", error);
        }
      );
    }
  }

  // Document

  addDoc() {
    this.visible = true;
    this.doc = new Document();
    this.doc.rhEmployeDocumentID = `RHFILE${new Date()
      .toISOString()
      .replace(/[-:]/g, '')
      .replace('T', '')
      .replace(/\..*$/, '')}.${Math.floor(Math.random() * 1000)}.${Math.floor(
      Math.random() * 1000
    )}`;
  }

  saveDoc() {
    console.log(this.doc);
    this.documents.push(this.doc);
    this.files.push({
      id: this.doc.rhEmployeDocumentID,
      file: this.file,
      type: this.doc.type,
    });
    this.visible = false;
    console.log(this.files);
    console.log(this.documents);
  }

  editDocument(index: number) {
    console.log('Editing document at index:', index);
    const documentToEdit = this.documents[index];
    console.log('Document data:', documentToEdit);
    this.doc = Object.assign(new Document(), documentToEdit);
    this.visible = true;
  }

  removeDocument(index: number) {
    console.log('Before removal:', this.documents);
    this.documents.splice(index, 1);
    console.log('After removal:', this.documents);
  }

  // AcademicBackground

  addAcademicBackground() {
    this.academicDialogVisible = true;
    this.academic = new AcademicBackground();
  }

  saveAcademicBackground() {
    console.log(this.academic);
    this.academicBackground.push(this.academic);
    this.academicDialogVisible = false;
  }

  editAcademicBackground(index: number) {
    this.academic = { ...this.academicBackground[index] }; // Copie les données de l'élément sélectionné
    this.academicDialogVisible = true; // Affiche le dialogue
  }

  removeAcademicBackground(index: number) {
    console.log('Before removal:', this.academicBackground);
    this.academicBackground.splice(index, 1);
    console.log('After removal:', this.academicBackground);
  }

  // ProfessionalBackground

  addProfessionalBackground() {
    this.professionalDialogVisible = true;
    this.professional = new ProfessionalBackground();
  }

  saveProfessionalBackground() {
    console.log(this.professional);
    this.professionalBackground.push(this.professional);
    this.professionalDialogVisible = false;
  }

  editProfessionalBackground(index: number) {
    this.professional = { ...this.professionalBackground[index] }; // Copie les données de l'élément sélectionné
    this.professionalDialogVisible = true; // Affiche le dialogue
  }

  removeProfessionalBackground(index: number) {
    console.log('Before removal:', this.professionalBackground);
    this.professionalBackground.splice(index, 1);
    console.log('After removal:', this.professionalBackground);
  }

  removeForm(index: number) {
    this.documents.splice(index, 1);
  }

  handleFileInput(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.documents[index].file = file;
    }
  }

  closeDialog() {
    this.visible = false;
  }

  // ---------file------------

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  file: any;
  onFileSelected0(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.file = file;
      console.log(this.file);
    }
  }

  filePP: any;
  onProfilePhotoSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.filePP = file; // Stocker le fichier dans l'objet employe
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.profilePhoto = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveFile() {
    for (const ele of this.files) {
      this.apiRhService
        .saveFile(ele.file, ele.id, ele.type)
        .subscribe((data) => {});
    }
  }

  savePP(employeID: string) {
    console.log(this.filePP);
    this.apiRhService
      .saveFile(this.filePP, employeID, 'profilePhoto')
      .subscribe((data) => {});
  }

  // modal

  showSuccessModal(): void {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
