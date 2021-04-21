import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../../../interfaces/company.interface';
import { Router } from '@angular/router';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss']
})
export class RegisterCompanyComponent implements OnInit {

  frmNewCompany: FormGroup;
  newCompany : Company = {
    co_name: '',
    co_city: '',
    co_state: '',
    co_address: '',
    co_postalCode: '',
    co_country: '',
    co_phoneNumber: '',
    co_areaCode: ''
  };


  constructor(private fb: FormBuilder,
              private router: Router,
              private companyService: CompanyService) { 
    this.frmNewCompany = this.createForm();
  }

  createForm(): FormGroup{
    return this.fb.group({
      name: [null, Validators.compose([
        Validators.required
      ])],
      city: [null, Validators.compose([
        Validators.required
      ])],
      state: [null, Validators.compose([
        Validators.required
      ])],
      postalCode: [null, Validators.compose([
        Validators.required
      ])],
      address: [null, Validators.compose([
        Validators.required
      ])],
      phoneNumber: [null, Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])],
      country: [null, Validators.compose([
        Validators.required
      ])],
      areaCode: [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async registerCompany(){
    if (this.frmNewCompany.invalid){return;}

    this.newCompany.co_name = this.frmNewCompany.get('name').value;
    this.newCompany.co_city = this.frmNewCompany.get('city').value;
    this.newCompany.co_state = this.frmNewCompany.get('state').value;
    this.newCompany.co_country = this.frmNewCompany.get('country').value;
    this.newCompany.co_postalCode = this.frmNewCompany.get('postalCode').value;
    this.newCompany.co_address = this.frmNewCompany.get('address').value;
    this.newCompany.co_areaCode = this.frmNewCompany.get('areaCode').value;
    this.newCompany.co_phoneNumber = this.frmNewCompany.get('phoneNumber').value;

    console.log(this.newCompany);

    const valido = await this.companyService.registerCompany(this.newCompany);
    if(valido){
      console.log('Registro exitoso');
    }else{
      console.log('Registro Fallido');
    }
    
  }
  
  ngOnInit(): void {
  }

  backPage(){
    
  }

}
