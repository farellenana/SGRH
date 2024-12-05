import { AcademicBackground } from 'src/app/model/AcademicBackground';
import { ApiRhService } from 'src/app/service/ApiRh/api-rh.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { organisations } from 'src/app/lists/organisationList';
import { Employe } from 'src/app/model/employer';
import { UserService } from 'src/app/service/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  employe!: Employe;
  // employe: Employe[] = [];
  organisationId: string | null = null;
  employeeId: string | null = null;
  documents: any[] = [];
  academicBackground: any[] = [];
  professionalBackground: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private apiRhService: ApiRhService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id');
      this.organisationId = params.get('organisationId');
      console.log('employeeId:', this.employeeId);
      console.log('organisationId:', this.organisationId);
      if (this.employeeId && this.organisationId) {
        this.loadEmployeeDetails(this.employeeId, this.organisationId);
        this.loadDocuments(this.employeeId);
        this.loadAcademicBackground(this.employeeId);
        this.loadProfessionalBackground(this.employeeId);
      } else {
        console.error(
          'Employee ID or Organisation ID is missing in the route.'
        );
      }
    });
  }
  // loadEmployeeDetails(employeeId: string, organisationId: string): void {
  //   this.userService.getEmployeeById(employeeId, organisationId).subscribe(
  //     (employee) => {

  //       if (!employee) {
  //         console.error(`Employee with ID ${employeeId} not found.`);
  //       } else {
  //         this.employe = employee;
  //         console.log('Employee details:', this.employe);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching employee details:', error);
  //     }
  //   );
  // }

  // LoadDocument(id: String, type: string):void{
  //   this.apiRhService.

  // }
  async loadEmployeeDetails(employeeId: string, organisationId: string) {
    this.userService.getEmployeeById(employeeId, organisationId).subscribe(
        (response) => {
            console.log('API Response:', response);
            if (Array.isArray(response) && response.length > 0) {
                this.employe = response[0];
                console.log('Employee details:', this.employe);
                // Chargez l'image pour cet employé
                this.loadImageForEmploye(this.employe);
            } else {
                console.error(`Employee with ID ${employeeId} not found.`);
            }
        },
        (error) => {
            console.error('Error fetching employee details:', error);
        }
    );
}


  loadImageForEmploye(employe: Employe):void {
    console.log("je charges l'ima");
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

  loadDocuments(employeeId: string): void {
    const fileType = '';
    this.apiRhService.listFichier(employeeId, fileType).subscribe(
      (response) => {
        console.log('Documents:', response); // Log to see the structure of the file response
        this.documents = response; // Store the file list
      },
      (error) => {
        console.error('Error loading documents:', error);
      }
    );
  }

  loadAcademicBackground(employeeId: string): void {
    this.apiRhService.getAcademicBackground(employeeId).subscribe(
      (response) => {
        console.log('academicBackground:', response);
        this.academicBackground = response;
      },
      (error) => {
        console.error('erreur lors du chargement du parcour academique');
      }
    );
  }

  loadProfessionalBackground(employeeId: string): void {
    this.apiRhService.getProfessionalBackground(employeeId).subscribe(
      (response) => {
        console.log('professionalBackground:', response);
        this.professionalBackground = response;
      },
      (error) => {
        console.error('erreur lors du chargement du parcour academique');
      }
    );
  }

  navigateToEdit(employeeId: string): void {
    this.router.navigate(['/addUser'], {
      queryParams: {
        employeeId: employeeId,
        organisationId: this.organisationId, // Pass the organisation ID if needed
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
