import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './component/dossier/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './component/dossier/employee-detail/employee-detail.component';
import { AddUserComponent } from './form/addUser/add-user/add-user.component';
import { PostListComponent } from './component/affectation/post-list/post-list.component';
import { FilterPageFolderComponent } from './filterpages/filter-page-folder/filter-page-folder.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'filterPagesFolder',
    pathMatch: 'full',
  },
  {
    path: 'userList',
    component: EmployeeListComponent,
  },
  {
    path: 'userDetail/:id/:organisationId',
    component: EmployeeDetailComponent,
  },
  {
    path: 'addUser',
    component: AddUserComponent,
  },
  {
    path: 'postlist',
    component: PostListComponent,
  },
  {
    path: 'filterPagesFolder',
    component: FilterPageFolderComponent,
  },
  // {
  //   path: 'userList',
  //   component:EmployeeListComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
