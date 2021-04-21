import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  frmLogin: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {
    this.frmLogin = this.createForm();
  }

  createForm(): FormGroup{
    return this.fb.group({
      email: [null, Validators.compose([
        Validators.email,
        Validators.required
      ])],
      password: [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  ngOnInit(): void {
  }

  async login(){
    const resp = await this.userService.login(this.frmLogin.get('email').value, this.frmLogin.get('password').value );
    
    if(resp){
      console.log("Bienvenido");
      let user: User = JSON.parse(localStorage.getItem('user'));
      this.routeByRole(user.us_role);
      
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong credentials!',
        heightAuto: false
      });
      console.log("Inicio de sesion Fallido")
    }

  }

  routeByRole(role: string){
    switch(role){
      case 'ADMINISTRATOR':
        this.router.navigateByUrl('admin');
        break;
      case 'AGENT':
        this.router.navigateByUrl('agent');
        break;
      case 'SUPERVISOR':
        this.router.navigateByUrl('supervisor');
        break;
      default: 
        this.router.navigateByUrl('404');
    }
  }

}
