import { Injectable } from '@angular/core';
import { MeetingService } from './meeting.service';
import { Lead } from '../interfaces/lead.interface';
import { environment } from '../../environments/environment.prod';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(private meetingService: MeetingService,
              private http: HttpClient,
              private userService: UserService) { }

  
  getLeadById(id: string){
    const headers = new HttpHeaders({
      'token': this.userService.token
    });

    return this.http.get<Lead>(`${URL}/getLeadId/${id}`, {headers});
  }


}
