import { Component, OnInit } from '@angular/core';
import { Exercices } from 'src/app/lists/exerxicesList';
import { organisations } from 'src/app/lists/organisationList';
import { Structures } from 'src/app/lists/structureList';
import { Exercice } from 'src/app/model/Exercice';
import { Organisation } from 'src/app/model/Organisation';
import { Structure } from 'src/app/model/Structure';
import { ExerciceService } from 'src/app/service/exercice/exercice.service';
import { OrganisationService } from 'src/app/service/organisation/organisation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-page-folder',
  templateUrl: './filter-page-folder.component.html',
  styleUrls: ['./filter-page-folder.component.scss'],
})
export class FilterPageFolderComponent implements OnInit {
  organisations: Organisation[] = [];
  structures: Structure[] = []; // Remplacez par le type approprié
  exercices: Exercice[] = [];
  selectedOrganisation: Organisation | null = null;
  selectedStructure: Structure | null = null; // Remplacez par le type approprié
  selectedExercice: Exercice | null = null;

  constructor(
    private organisationService: OrganisationService,
    private exerciceService: ExerciceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrganisations();
    this.loadExercices();
  }

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
