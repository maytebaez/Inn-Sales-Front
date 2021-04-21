import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from './agent.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MeetingReportsComponent } from './meeting-reports/meeting-reports.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { LeadsComponent } from './leads/leads.component';

const AGENT_ROUTES: Routes = [
    {
        path: '', component: AgentComponent, children: [
          {path: 'dashboard', component:  DashboardComponent },
          {path: 'meetingReports/:idLead', component:  MeetingReportsComponent },
          {path: 'meetingReports/:idLead', component:  MeetingReportsComponent },
          {path: 'meetings', component:  MeetingsComponent },
          {path: 'leads', component:  LeadsComponent },
          {path:"", redirectTo:"dashboard", pathMatch:"full"}
        ]
      },
];

@NgModule ({
  imports: [RouterModule.forChild(AGENT_ROUTES)],
  exports: [RouterModule]
})

export class AgentRoutingModule { }