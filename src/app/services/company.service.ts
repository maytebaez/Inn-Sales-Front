import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../interfaces/company.interface';
import { environment } from '../../environments/environment.prod';
import { User } from '../interfaces/user.interface';
import Swal from 'sweetalert2';
import { UserService } from './user.service';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  constructor(private http: HttpClient,
              private userService: UserService) {

  }
  
  getCompanies(){
    const headers = new HttpHeaders({
      'token': this.userService.token
    });

    return this.http.get<Company[]>(`${URL}/getCompanies`, {headers});
  }

  getCompany(_id: string){

    const headers = new HttpHeaders({
      'token': this.userService.token
    });

    return this.http.get<Company>(`${URL}/getCompanies/${_id}`, {headers});
  }

  registerCompany(company: Company){    
   
    const headers = new HttpHeaders({
      'token': this.userService.token
    });

    return new Promise(resolve=>{
      this.http.post(`${URL}/companies`, company).subscribe(res=>{
        console.log(res);
        if(res['ok']){
          Swal.fire({
            icon: 'success',
            title: 'Great...',
            text: 'Company created successfully!',
            heightAuto: false
          });
          resolve(true);
        }else{
          resolve(false);
        }
      });
    }); 
  }

  getCompanyUsers(_id: string){
    const headers = new HttpHeaders({
      'token': this.userService.token
    });

    return this.http.get<User[]>(`${URL}/getUsersCompany/${_id}`, {headers});
  }

  modifyCompany(company: Company){

    const headers = new HttpHeaders({
      'token': this.userService.token
    });

    return new Promise(resolve=>{

      this.http.put(`${URL}/modifyCompany/${company._id}`, company, {headers}).subscribe(res=>{
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


}
