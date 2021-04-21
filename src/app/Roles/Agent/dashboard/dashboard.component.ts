import { Component, OnInit } from '@angular/core';
import { Meeting } from 'src/app/interfaces/meeting.interface';
import { MeetingService } from '../../../services/meeting.service';
import { User } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Lead } from '../../../interfaces/lead.interface';
import { LeadService } from '../../../services/lead.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  meetings: Meeting[] = [];
  userAuth: User;
  leads: Lead[] = [];

  public doughnutChartData: Number[]=[100];

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
      labels: {
        // This more specific font property overrides the global property
        fontColor: 'black',
        fontSize: 20
      }
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartColors = [
    {
      backgroundColor: ['rgba(236,76,64)'],
    },
  ];

  public doughnutChartColors2 = [
    {
      backgroundColor: ['rgba(0,188,213)'],
    },
  ];

  constructor(private meetingService: MeetingService,
              private userService: UserService,
              private leadService: LeadService,
              private router: Router) {

    this.userAuth = this.userService.getDataFromStorage('user');

    this.meetingService.getMeetings(this.userAuth._id).subscribe(resp =>{
      this.meetings = resp['meetings'];
      this.meetings.map(meet =>{
        this.leadService.getLeadById(meet.me_lead).subscribe(resp1 =>{
          let aux = true;
          this.leads.map(lead =>{
            if(lead._id == resp1['lead']._id){
              aux=false;
            }
          });
          if(aux){
            resp1['lead'].le_qualification = 70;
            this.leads.push(resp1['lead']);
          }
        });
      });
    });

  }

  ngOnInit(): void {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  seeMeeting(idLead: string){
    this.router.navigate(['agent/meetingReports', idLead]);
  }


}
