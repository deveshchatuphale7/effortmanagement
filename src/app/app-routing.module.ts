import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { StateDashboardComponent } from './state-dashboard/state-dashboard.component';
import { DistrictDashboardComponent } from './district-dashboard/district-dashboard.component';
import { MoDashboardComponent } from './mo-dashboard/mo-dashboard.component';

const routes: Routes = [
{path:'home',component:HomeComponent},
{path:'state-level',component:StateDashboardComponent},
{path:'district-level',component:DistrictDashboardComponent},
{path:'mo-level',component:MoDashboardComponent},
{path:'',redirectTo:'home',pathMatch:'full'},
{path:'**',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
