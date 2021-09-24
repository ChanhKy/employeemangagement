import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DepartmentCreateComponent } from './department-create/department-create.component'
import { DepartmentDeleteComponent } from './department-delete/department-delete.component'
import { DepartmentEditComponent } from './department-edit/department-edit.component'
import { DepartmentListComponent } from './department-list/department-list.component'
import { DepartmentViewComponent } from './department-view/department-view.component'
import { DepartmentComponent } from './department.component'


const router: Routes = [
  {
    path: '',
    component: DepartmentComponent,

    children: [
      {
        path: 'list',
        component: DepartmentListComponent
      },
      {
        path: 'create',
        component: DepartmentCreateComponent
      },
      {
        path: 'edit/:departmentId',
        component: DepartmentEditComponent
      },
      {
        path: 'delete',
        component: DepartmentDeleteComponent
      },
      {
        path: 'view/:departmentId',
        component: DepartmentViewComponent
      }
    ]

  }

];
@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})

export class DepartmentRoutingModule {

}
