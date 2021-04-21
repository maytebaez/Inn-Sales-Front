import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token :string;

  constructor(private http: HttpClient,
              private router: Router) {
    this.token = this.getDataFromStorage('token'); 
  }

  
  registerUser(user: User){

    const headers = new HttpHeaders({
      'token': this.token
    });

    return new Promise(resolve=>{
      this.http.post(`${URL}/users`,user, {headers}).subscribe(res=>{
        console.log(res);
        if(res['ok']){
          Swal.fire({
            icon: 'success',
            title: 'Great...',
            text: 'User created successfully!',
            heightAuto: false
          });
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });    

  }

  getUserById(_id: string){
    const headers = new HttpHeaders({
      'token': this.token
    });

    return this.http.get<User>(`${URL}/getUser/${_id}`, {headers});
  }

  login(us_email: string, us_password: string){

    const data = {us_email, us_password};

    return new Promise(resolve=>{

      this.http.post(`${URL}/login`,data).subscribe(resp=>{
        
        if (resp['ok']){
          this.updateUserLocalStorage(resp['user'], resp['token']);
          this.token = resp['token'];
          resolve(true);          
        }else{
          this.token = null;
          resolve(false);
        }
      });

    });    

  }

  getDataFromStorage(option: string) {
    const data = localStorage.getItem(option);

    if (data && option=='user') {
      return JSON.parse(data);
    }
    else if(data &&  option=='token') {
      return data;
    }
    else{
      return null;
    }
  }

  updateUserLocalStorage (user: any, token: any){
    this.token = this.getDataFromStorage('token');
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  modifyUser(user: User){

    const headers = new HttpHeaders({
      'token': this.token
    });

    return new Promise(resolve=>{

      this.http.put(`${URL}/modifyUser/${user._id}`, user, {headers}).subscribe(res=>{
        console.log(res);
        if(res['ok']){
          Swal.fire({
            icon: 'success',
            title: 'Great...',
            text: 'The data has been updated!',
            heightAuto: false
          });
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('login');
  }


}
