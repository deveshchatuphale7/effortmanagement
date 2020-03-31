import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { NbThemeModule } from '@nebular/theme';

import { NbUserModule,NbDialogModule,NbToastrModule,NbActionsModule,NbSidebarModule,NbAccordionModule,NbProgressBarModule,NbTooltipModule,NbRadioModule,NbButtonModule,NbContextMenuModule,NbCheckboxModule,NbStepperModule,NbMenuModule,NbLayoutModule,NbPopoverModule,NbSelectModule,NbWindowModule,NbCardModule,NbListModule,NbInputModule,NbTabsetModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MatPaginatorModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StateDashboardComponent } from './state-dashboard/state-dashboard.component';
import { DistrictDashboardComponent } from './district-dashboard/district-dashboard.component';
import { MoDashboardComponent } from './mo-dashboard/mo-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StateDashboardComponent,
    DistrictDashboardComponent,
    MoDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    FormsModule, ReactiveFormsModule,
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
    NbUserModule,
    NbWindowModule.forRoot(),
    NbCardModule,
    NbListModule,
    NbSelectModule,
    NbCheckboxModule,
    NbContextMenuModule,
    NbTooltipModule,
    NbMenuModule.forRoot(),
    NbPopoverModule,
    NbButtonModule,
    NbInputModule,
    NbDialogModule.forRoot(),
    NbStepperModule,
    NbRadioModule,
    NbAccordionModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
