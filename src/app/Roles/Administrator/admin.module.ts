import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator.component';
import { AppModule } from '../../app.module';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { CompaniesRecordComponent } from './companies-record/companies-record.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdministratorRoutingModule } from './admin.routing.module';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';
import { FooterComponent } from '../../Shared/footer/footer.component';
import { SharedModule } from '../../Shared/shared.module';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';



@NgModule({
  declarations: [
    AdministratorComponent,
    RegisterUserComponent,
    RegisterCompanyComponent,
    CompaniesRecordComponent,
    CompanyDetailsComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    AngularMaterialModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class AdminModule { }
