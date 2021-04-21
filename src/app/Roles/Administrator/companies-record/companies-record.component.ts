import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Company } from '../../../interfaces/company.interface';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-companies-record',
  templateUrl: './companies-record.component.html',
  styleUrls: ['./companies-record.component.scss']
})
export class CompaniesRecordComponent implements OnInit, AfterViewInit{

  public displayedColumns = ['name', 'city', 'state', 'address', 'country',  'areaCode', 'phone', 'options'];
  public dataSource = new MatTableDataSource <Company>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private companyService: CompanyService,
              private router: Router) { 
    this.getCompaniesDB();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  getCompaniesDB(){
      this.companyService.getCompanies().subscribe(resp =>{
        this.dataSource.data.push(...resp['companies']);
      });
  }

  doFilter(value: any) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  viewDetails(id: string){
    this.router.navigate(['./admin/company-details', id]);
  }

  newCompany(){
    this.router.navigateByUrl('admin/register-company');
  }

}
