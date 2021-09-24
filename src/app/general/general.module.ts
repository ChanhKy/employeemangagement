import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatRippleModule, MatSelectModule, MatTooltipModule } from '@angular/material';
import { GeneralRoutingModule } from './general-routing.module';
import { SweetalertComponent } from './sweetalert/sweetalert.component';
import { FormFocusDirective } from './form-focus.directive';

const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSelectModule,
  MatIconModule,
  MatCardModule,
  MatNativeDateModule,
  MatTooltipModule,
  MatDatepickerModule
];


@NgModule({
  declarations: [
    PaginationComponent,
    DashboardComponent,
    HeaderComponent,
    MenuComponent,
    SweetalertComponent,
    FormFocusDirective

  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    modules,

  ],
  exports: [
    PaginationComponent,
    DashboardComponent,
    HeaderComponent,
    MenuComponent,
    FormFocusDirective

  ]
})
export class GeneralModule { }
