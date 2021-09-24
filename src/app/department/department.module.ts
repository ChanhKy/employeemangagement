import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, NgModel, ReactiveFormsModule } from "@angular/forms";
import { MatBadgeModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRippleModule, MatSelectModule } from "@angular/material";
import { DepartmentCreateComponent } from "./department-create/department-create.component";
import { DepartmentDeleteComponent } from "./department-delete/department-delete.component";
import { DepartmentEditComponent } from "./department-edit/department-edit.component";
import { DepartmentListComponent } from "./department-list/department-list.component";
import { DepartmentRoutingModule } from "./department-routing.module";
import { DepartmentComponent } from './department.component';
import { DepartmentViewComponent } from './department-view/department-view.component';
import { PaginationComponent } from "../general/pagination/pagination.component";
import { GeneralModule } from "../general/general.module";


@NgModule({
  declarations: [
    DepartmentCreateComponent,
    DepartmentListComponent,
    DepartmentEditComponent,
    DepartmentDeleteComponent,
    DepartmentComponent,
    DepartmentViewComponent,


  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    GeneralModule




  ]
})

export class DepartmentModule {

}
