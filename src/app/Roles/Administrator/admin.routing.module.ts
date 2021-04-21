import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './administrator.component';
import { CompaniesRecordComponent } from './companies-record/companies-record.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';


const ADMIN_ROUTES: Routes = [
    {
        path: '', component: AdministratorComponent, children: [
          {path: 'companies-record', component:  CompaniesRecordComponent },
          {path: 'register-company', component:  RegisterCompanyComponent },
          {path: 'register-user/:id', component:  RegisterUserComponent },
          {path: 'company-details/:id', component:  CompanyDetailsComponent },
          {path: 'user-details/:id/:idCompany', component:  UserDetailsComponent },
          {path:"", redirectTo:"companies-record", pathMatch:"full"}
        ]
      },
];

@NgModule ({
  imports: [RouterModule.forChild(ADMIN_ROUTES)],
  exports: [RouterModule]
})

export class AdministratorRoutingModule { }