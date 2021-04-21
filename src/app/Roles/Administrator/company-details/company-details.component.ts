import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/interfaces/company.interface';
import { CompanyService } from '../../../services/company.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit, AfterViewInit {

  frmUpdateCompany: FormGroup;
  company : Company = {
    co_name: '',
    co_city: '',
    co_state: '',
    co_address: '',
    co_postalCode: '',
    co_country: '',
    co_phoneNumber: '',
    co_areaCode: ''
  };
  public displayedColumns = ['name', 'lastName', 'role', 'email', 'areaCode', 'cellphone', 'options'];
  public dataSource = new MatTableDataSource <User>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  companyId: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private companyService: CompanyService,
              private activatedRoute: ActivatedRoute) { 

    this.frmUpdateCompany = this.createForm();
    this.activatedRoute.params.subscribe(params =>{
      this.companyId = params['id'];
      this.getCompanyDB();
      this.getusersDB();
    });
    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  async updateCompany(){
    if (this.frmUpdateCompany.invalid){return;}

    this.company.co_name = this.frmUpdateCompany.get('name').value;
    this.company.co_city = this.frmUpdateCompany.get('city').value;
    this.company.co_state = this.frmUpdateCompany.get('state').value;
    this.company.co_country = this.frmUpdateCompany.get('country').value;
    this.company.co_postalCode = this.frmUpdateCompany.get('postalCode').value;
    this.company.co_address = this.frmUpdateCompany.get('address').value;
    this.company.co_areaCode = this.frmUpdateCompany.get('areaCode').value;
    this.company.co_phoneNumber = this.frmUpdateCompany.get('phoneNumber').value;

    console.log(this.company);

    const valido = await this.companyService.registerCompany(this.company);
    if(valido){
      console.log('Registro exitoso');
    }else{
      console.log('Registro Fallido');
    }
    
  }

  backPage(){
    this.router.navigateByUrl('admin/companies-record');
  }

  getCompanyDB(){
    this.companyService.getCompany(this.companyId).subscribe(resp =>{
      this.company = resp['company'];
      this.frmUpdateCompany.get('name').setValue(this.company.co_name);
      this.frmUpdateCompany.get('city').setValue(this.company.co_city);
      this.frmUpdateCompany.get('state').setValue(this.company.co_state);
      this.frmUpdateCompany.get('country').setValue(this.company.co_country);
      this.frmUpdateCompany.get('postalCode').setValue(this.company.co_postalCode);
      this.frmUpdateCompany.get('address').setValue(this.company.co_address);
      this.frmUpdateCompany.get('areaCode').setValue(this.company.co_areaCode);
      this.frmUpdateCompany.get('phoneNumber').setValue(this.company.co_phoneNumber);
    });
  }

  getusersDB(){
    this.companyService.getCompanyUsers(this.companyId).subscribe(resp =>{
      this.dataSource.data = resp['users'];
    })
  }

  doFilter(value: any) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  viewDetails(id: string){
    this.router.navigate(['./admin/user-details', id, this.companyId]);
  }

  newUser(){
    this.router.navigate(['./admin/register-user', this.company._id]);
  }

  async modifyCompany(){

    this.company.co_address = this.frmUpdateCompany.get('address').value;
    this.company.co_areaCode = this.frmUpdateCompany.get('areaCode').value;
    this.company.co_name = this.frmUpdateCompany.get('name').value;
    this.company.co_phoneNumber = this.frmUpdateCompany.get('phoneNumber').value;
    this.company.co_postalCode = this.frmUpdateCompany.get('postalCode').value;
    this.company.co_state = this.frmUpdateCompany.get('state').value;
    this.company.co_city = this.frmUpdateCompany.get('city').value;
    this.company.co_country = this.frmUpdateCompany.get('country').value;

    let resp = await this.companyService.modifyCompany(this.company);
    console.log(resp);
  }

}
