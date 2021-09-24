import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './general/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./general/general.module').then(module => module.GeneralModule)
  },
  {
    path: 'department',
    loadChildren: () => import('./department/department.module').then(module => module.DepartmentModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(module => module.EmployeeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
