import { CommonModule } from "@angular/common";
import { NgModule  } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmployeeCreateComponent } from "./employee-create/employee-create.component";
import { EmployeeDeleteComponent } from "./employee-delete/employee-delete.component";
import { EmployeeEditComponent } from "./employee-edit/employee-edit.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { EmployeeComponent } from "./employee.component";
import { MatButtonModule} from '@angular/material';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { PaginationComponent } from "../general/pagination/pagination.component";
import { GeneralModule } from "../general/general.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";



@NgModule({
  declarations: [
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeDeleteComponent,
    EmployeeListComponent,
    EmployeeComponent,
    EmployeeViewComponent,




  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    GeneralModule,




  ]
})

export class EmployeeModule{

}
