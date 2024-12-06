import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from 'src/app/model/employer';
import { Exercice } from 'src/app/model/Exercice';
import { Organisation } from 'src/app/model/Organisation';
import { Structure } from 'src/app/model/Structure';
import { ApiRhService } from 'src/app/service/ApiRh/api-rh.service';
import { ExerciceService } from 'src/app/service/exercice/exercice.service';
import { OrganisationService } from 'src/app/service/organisation/organisation.service';

import { UserService } from 'src/app/service/user.service';

import { forkJoin, of, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [ConfirmationService],
})
export class EmployeeListComponent implements OnInit {
  employe: Employe[] = [];
  filteredUsers: Employe[] = []; // Liste filtrée pour la recherche
  searchQuery: string = ''; // Chaîne de recherche
  selectedUsers: any[] = [];
  organisationId: string = '';
  organisations: Organisation[] = [];
  structures: Structure[] = []; // Remplacez par le type approprié
  exercices: Exercice[] = [];
  selectedOrganisation: Organisation | null = null;
  selectedStructure: Structure | null = null; // Remplacez par le type approprié
  selectedExercice: Exercice | null = null;
  employeeToDelete: string | null = null;

  profilePhotos: { [key: string]: string } = {};

  loading = false;

  constructor(
    private userService: UserService,
    private organisationService: OrganisationService,
    private apiRhService: ApiRhService,
    private exerciceService: ExerciceService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    // Récupérer organisationId depuis les query parameters
    this.route.queryParams.subscribe((params) => {
      this.organisationId = params['organisationId'];
      if (this.organisationId) {
        this.loadEmployees(this.organisationId);
      } else {
        console.error('Organisation ID non trouvé dans les paramètres.');
      }
    });
    this.loadOrganisations();
    this.loadExercices();
  }

  loadProfilePhotos(): void {
    this.employe.forEach((employee) => {
      this.apiRhService.fichierDownload(employee.picture).subscribe(
        (blob: Blob) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.profilePhotos[employee.employeID] = e.target.result;
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
    });
  }

  loadEmployees(organisationId: string): void {
    this.loading = true;
    this.userService.getEmployees(organisationId).subscribe({
      next: (data: Employe[]) => {
        this.employe = data;
        this.filteredUsers = data;
        console.log(data);

        const imageRequests = this.employe.map((employe) =>
          this.loadImageForEmploye(employe)
        );
        forkJoin(imageRequests).subscribe({
          complete: () => {
            this.employe = [...this.employe]; // Ensure change detection
            this.loading = false;
          },
        });
      },
      error: (error: any) => {
        console.error(error);
        this.loading = false;
      },
      complete: () => {
        console.info('complete');
      },
    });
  }

  loadImageForEmploye(employe: Employe) {
    return this.apiRhService.fichierDownload(employe.picture).pipe(
      tap((file: Blob) => {
        // Adjust type to Blob if necessary
        const fileObject = new File([file], employe.picture); // Convert Blob to File
        employe.profilePhotoFile = URL.createObjectURL(fileObject);
      }),
      catchError((error: any) => {
        console.error(
          `Erreur lors du chargement de l'image pour ${employe.firstName}:`,
          error
        );
        return of(null);
      })
    );
  }

  loadImageForEmploye2(employe: Employe) {
    return this.apiRhService.fichierDownload(employe.picture).pipe(
      tap((imageData: any) => {
        employe.profilePhotoFile = imageData;
      }),
      catchError((error: any) => {
        console.error(
          `Erreur lors du chargement de l'image pour ${employe.firstName}:`,
          error
        );
        return of(null);
      })
    );
  }

  async getPP(employe: Employe) {
    //todo: change pour envoyer l image obtenue dans profilePhotoFile ; fais le parcours de la liste des employes
    // appelles cette fonction a la suite de la precedente qui liste les employes
    let res: any = 'assets/images/profile2.png';

    if (employe.picture) {
      this.apiRhService.fichierDownload(employe.picture).subscribe(
        (response) => {
          const blob = new Blob([response], { type: 'application/json' });
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              res = e.target.result;
            }
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
    return res;
  }

  // Fonction pour filtrer les utilisateurs selon la recherche
  onSearch(): void {
    if (this.searchQuery) {
      const queryParts = this.searchQuery.toLowerCase().split(' '); // Split query into parts
      this.filteredUsers = this.employe.filter((employee) => {
        const firstName = employee.firstName
          ? employee.firstName.toLowerCase()
          : '';
        const lastName = employee.lastName
          ? employee.lastName.toLowerCase()
          : '';
        // Check if all parts of the query exist in either name
        return queryParts.every(
          (part) => firstName.includes(part) || lastName.includes(part)
        );
      });
    } else {
      this.filteredUsers = this.employe; // If search is empty, show all users
    }
  }

  editUser(userId: string): void {
    console.log("Modifier l'utilisateur avec ID :", userId);
    // Logique pour ouvrir un formulaire de modification
  }

  // Fonction pour supprimer un utilisateur
  deleteUser(userId: string): void {
    console.log("Supprimer l'utilisateur avec ID :", userId);
    // Logique pour supprimer un utilisateur
    this.employe = this.employe.filter((user) => user.employeID !== userId);
    this.onSearch(); // Re-filtrer les utilisateurs après suppression
  }

  navigateToDetail(employeID: string, organisationId: string): void {
    this.router.navigate(['/userDetail', employeID, organisationId]);
  }
  navigateAddForm(): void {
    if (this.organisationId) {
      this.router.navigate(['/addUser'], {
        queryParams: {
          organisationId: this.organisationId,
        },
      });
    } else {
      console.error('Organisation ID non trouvé.');
    }
  }

  navigateToEdit(employeeId: string): void {
    this.router.navigate(['/addUser'], {
      queryParams: {
        employeeId: employeeId,
        organisationId: this.organisationId, // Pass the organisation ID if needed
      },
    });
  }

  deleteEmploye(employeeId: string): void {
    this.userService.deleteEmployee(employeeId).subscribe(
      (response) => {
        console.log('employer suprimer avec success', employeeId);

        this.employe = this.employe.filter(
          (user) => user.employeID !== employeeId
        );
        this.onSearch(); // Re-filter the users after deletion
        console.log('Employee deleted:', employeeId);
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }

  // -----------------------------------filtre---------------------------

  loadOrganisations(): void {
    this.organisationService.getOrganisation().subscribe(
      (response: Organisation[]) => {
        this.organisations = response;
      },
      (error) => {
        console.error('Erreur lors du chargement des organisations', error);
      }
    );
  }

  loadExercices(): void {
    this.exerciceService.getStructure().subscribe(
      (response: Exercice[]) => {
        this.exercices = response;
      },
      (error) => {
        console.error('Erreur lors du chargement des exercices', error);
      }
    );
  }

  onFilterChange() {
    if (
      this.selectedOrganisation &&
      this.selectedStructure &&
      this.selectedExercice
    ) {
      this.loadEmployees(this.organisationId);
    }
  }
  reloadPage(organisationId: string) {
    this.loading = true;
    this.userService.getEmployees(organisationId).subscribe({
      next: (data: Employe[]) => {
        this.employe = data;
        this.filteredUsers = data;
        console.log(data);

        const imageRequests = this.employe.map((employe) =>
          this.loadImageForEmploye(employe)
        );
        forkJoin(imageRequests).subscribe({
          complete: () => {
            this.employe = [...this.employe]; // Ensure change detection
            this.loading = false;
          },
        });
        window.location.reload();
      },
      error: (error: any) => {
        console.error(error);
        this.loading = false;
      },
      complete: () => {
        console.info('complete');
      },
    });
    window.location.reload();
  }

  onOrganisationChange(): void {
    if (this.selectedOrganisation) {
      this.loadStructures(this.selectedOrganisation.organisationID); // Utilisez organisationID
    } else {
      this.structures = []; // Réinitialisez si aucune organisation n'est sélectionnée
    }
  }

  loadStructures(organisationId: string): void {
    this.organisationService
      .getStructuresByOrganisation(organisationId)
      .subscribe(
        (response: Structure[]) => {
          this.structures = response;
        },
        (error) => {
          console.error('Erreur lors du chargement des structures', error);
        }
      );
  }

  showAlert(): void {
    alert('Aucun utilisateur trouvé pour les critères sélectionnés.');
  }

  navigateToUserList(): void {
    if (
      this.selectedOrganisation &&
      this.selectedStructure &&
      this.selectedExercice
    ) {
      this.router.navigate(['/userList'], {
        queryParams: {
          organisationId: this.selectedOrganisation.organisationID,
          structureId: this.selectedStructure.structureID, // Assurez-vous que le bon ID est utilisé
          exerciceId: this.selectedExercice.millesime, // Ajustez si nécessaire
        },
      });
    } else {
      alert(
        'Veuillez sélectionner une organisation, une structure et un exercice.'
      );
    }
  }
}
