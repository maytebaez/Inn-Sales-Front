import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { AgentComponent } from './agent.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgentRoutingModule } from './agent.routing.module';
import { SharedModule } from '../../Shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MeetingReportsComponent } from './meeting-reports/meeting-reports.component';
import { LeadsComponent } from './leads/leads.component';
import { MeetingsComponent } from './meetings/meetings.component';



@NgModule({
  declarations: [
    AgentComponent,
    DashboardComponent,
    MeetingReportsComponent,
    LeadsComponent,
    MeetingsComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    AgentRoutingModule,
    SharedModule,
    ChartsModule,
    FlexLayoutModule
  ]
})
export class AgentModule { }
