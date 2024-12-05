import { EnvironmentInjector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { EmployeeDetailComponent } from './component/dossier/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './component/dossier/employee-list/employee-list.component';
import { PostListComponent } from './component/affectation/post-list/post-list.component';
import { FilterPageFolderComponent } from './filterpages/filter-page-folder/filter-page-folder.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './layout/nav/nav.component';
import { ButtonModule } from 'primeng/button';
import { AddUserComponent } from './form/addUser/add-user/add-user.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailComponent,
    EmployeeListComponent,
    PostListComponent,
    FilterPageFolderComponent,
    NavComponent,
    AddUserComponent,


  ],
  imports: [

    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    DialogModule,
    ToolbarModule,
    ConfirmDialogModule,
    DatePipe,
    RouterModule.forRoot([
      { path: 'userDetail/:id/:organisationId', component: EmployeeDetailComponent },
      { path: 'userList/:id', component: EmployeeListComponent },

      // d'autres routes
    ]),
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
