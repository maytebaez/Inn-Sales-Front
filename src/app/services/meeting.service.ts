import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Meeting } from '../interfaces/meeting.interface';
import { environment } from '../../environments/environment.prod';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient,
              private userService: UserService) { }

  getMeetings(idAgent: string){
    const headers = new HttpHeaders({
      'token': this.userService.token
    });

    return this.http.get<Meeting[]>(`${URL}/getMeetingsAgent/${idAgent}`, {headers});
  }

  getMeetingById(id: string){
    const headers = new HttpHeaders({
      'token': this.userService.token
    });

    return this.http.get<Meeting>(`${URL}/getMeetingId/${id}`, {headers});
  }

  addMeeting(meeting: Meeting){
    const headers = new HttpHeaders({
      'token': this.userService.token
    });

    return this.http.post(`${URL}/meetings`, meeting, {headers});
    
  }

}
