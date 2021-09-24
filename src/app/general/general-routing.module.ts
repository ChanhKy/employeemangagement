import { NgModule } from "@angular/core";import { Router, RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { GeneralModule } from "./general.module";


const router: Routes = [
  {
    path: '',
    component: DashboardComponent,

    children: [

    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})

export class GeneralRoutingModule {

}
