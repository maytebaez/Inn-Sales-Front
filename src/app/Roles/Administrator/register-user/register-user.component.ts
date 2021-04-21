import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  frmNewUser: FormGroup;
  newUser : User = {
    us_areaCode: '',
    us_company: '',
    us_firstName: '',
    us_lastName: '',
    us_email: '',
    us_cellphone:'',
    us_role: '',
    us_password: ''
  };


  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) { 
    this.frmNewUser = this.createForm();
    this.activatedRoute.params.subscribe(params =>{
      this.newUser.us_company = params['id'];
    });
  }

  createForm(): FormGroup{
    return this.fb.group({
      us_email: [null, Validators.compose([
        Validators.email,
        Validators.required
      ])],
      us_password: [null, Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])],
      us_firstName: [null, Validators.compose([
        Validators.required
      ])],
      us_lastName: [null, Validators.compose([
        Validators.required
      ])],
      us_areaCode: [null, Validators.compose([
        Validators.required
      ])],
      us_cellphone: [null, Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])],
      us_role: [null, Validators.compose([
        Validators.required
      ])],
      verifyPassword: [null, Validators.compose([
        Validators.required
      ])]
    }, {validator: this.matchPassword});
  }

  async registerUser(){
    if (this.frmNewUser.invalid){return;}

    this.newUser.us_areaCode = this.frmNewUser.get('us_areaCode').value;
    this.newUser.us_email = this.frmNewUser.get('us_email').value;
    this.newUser.us_role = this.frmNewUser.get('us_role').value;
    this.newUser.us_firstName = this.frmNewUser.get('us_firstName').value;
    this.newUser.us_lastName = this.frmNewUser.get('us_lastName').value;
    this.newUser.us_password = this.frmNewUser.get('us_password').value;
    this.newUser.us_cellphone = this.frmNewUser.get('us_cellphone').value;
    this.newUser.us_areaCode = this.frmNewUser.get('us_areaCode').value;

    console.log(this.newUser);

    const valido = await this.userService.registerUser(this.newUser);
    if(valido){
      console.log('Registro exitoso');
      this.backPage();
    }else{
      console.log('Registro Fallido');
    }
    
  }
  
  ngOnInit(): void {
  }

  backPage(){
    this.router.navigate(['admin/company-details', this.newUser.us_company]);
  }

  //Validator personalizado para verificacion de contraseña
  matchPassword (control: AbstractControl) {      
    let pass = control.get('us_password').value;
    let verifyPass = control.get('verifyPassword').value;

    if (pass !== verifyPass){
      control.get('verifyPassword').setErrors({NoPasswordMatch: true});
    }
  }

}
