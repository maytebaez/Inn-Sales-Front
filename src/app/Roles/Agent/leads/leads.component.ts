import { Component, ViewChild } from '@angular/core';
import { Meeting } from 'src/app/interfaces/meeting.interface';
import { MeetingService } from '../../../services/meeting.service';
import { User } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';
import { Lead } from '../../../interfaces/lead.interface';
import { LeadService } from '../../../services/lead.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent {

  meetings: Meeting[] = [];
  userAuth: User;
  leads: Lead[] = [];
  public displayedColumns = ['name', 'lastName', 'email', 'areaCode', 'cellphone', 'linkedin','company', 'area', 'qualification', 'options'];
  public dataSource = new MatTableDataSource <Lead>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
          this.leads.push(resp1['lead']);
        }
        this.dataSource.data = this.leads;
      });
      });
    }); 
  }

  doFilter(value: any) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


}
