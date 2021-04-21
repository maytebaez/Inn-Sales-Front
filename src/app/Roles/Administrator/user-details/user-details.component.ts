import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  frmUser: FormGroup;
  userId: string;
  user : User;
  companyId: string;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.frmUser = this.createForm();
    this.activatedRoute.params.subscribe(params =>{
      this.userId = params['id'];
      this.companyId = params['idCompany'];
      this.getUserDB();
    });

  }

  backPage(){
    this.router.navigate(['./admin/company-details', this.companyId]);
  }

  createForm(): FormGroup{
    return this.fb.group({
      us_email: [null, Validators.compose([
        Validators.email,
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
      ])]
    },);
  }

  ngOnInit(): void {
  }

  getUserDB(){
    this.userService.getUserById(this.userId).subscribe(resp =>{
      this.user = resp['user'];
      this.frmUser.get('us_firstName').setValue(this.user.us_firstName);
      this.frmUser.get('us_lastName').setValue(this.user.us_lastName);
      this.frmUser.get('us_areaCode').setValue(this.user.us_areaCode);
      this.frmUser.get('us_cellphone').setValue(this.user.us_cellphone);
      this.frmUser.get('us_email').setValue(this.user.us_email);
      this.frmUser.get('us_role').setValue(this.user.us_role);
    });
  }

  async modifyUser(){
    this.user.us_firstName = this.frmUser.get('us_firstName').value;
    this.user.us_lastName = this.frmUser.get('us_lastName').value;
    this.user.us_areaCode = this.frmUser.get('us_areaCode').value;
    this.user.us_cellphone = this.frmUser.get('us_cellphone').value;
    this.user.us_email = this.frmUser.get('us_email').value;
    this.user.us_role = this.frmUser.get('us_role').value;

    let resp = await this.userService.modifyUser(this.user);
    console.log(resp);
  }

}
