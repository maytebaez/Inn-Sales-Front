import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../interfaces/user.interface';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MeetingService } from '../../../services/meeting.service';
import { UserService } from '../../../services/user.service';
import { Meeting } from 'src/app/interfaces/meeting.interface';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit, AfterViewInit{

  public displayedColumns = ['name', 'lastName', 'role', 'email', 'areaCode', 'cellphone', 'options'];
  public dataSource = new MatTableDataSource <Meeting>();
  userAuth: User;
  meetings: MeetingService[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private meetingService: MeetingService,
              private userService: UserService) {
                this.userAuth = this.userService.getDataFromStorage('user');
                this.meetingService.getMeetings(this.userAuth._id).subscribe(resp =>{
                  this.dataSource.data = resp['meetings']; 
                });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(value: any) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
