import { NgModule } from "@angular/core";import { Router, RouterModule, Routes } from "@angular/router";
import { EmployeeCreateComponent } from "./employee-create/employee-create.component";
import { EmployeeDeleteComponent } from "./employee-delete/employee-delete.component";
import { EmployeeEditComponent } from "./employee-edit/employee-edit.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeViewComponent } from "./employee-view/employee-view.component";
import { EmployeeComponent } from "./employee.component";

const router: Routes = [
  {
    path: '',
    component: EmployeeComponent,

    children: [
      {
        path: 'list',
        component: EmployeeListComponent,
      },
      {
        path: 'create',
        component: EmployeeCreateComponent,
      },
      {
        path: 'edit/:employeeId',
        component: EmployeeEditComponent,
      },
      {
        path: 'delete',
        component: EmployeeDeleteComponent,
      },
      {
        path: 'view/:employeeId',
        component: EmployeeViewComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})

export class EmployeeRoutingModule {

}
