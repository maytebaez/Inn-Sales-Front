import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from './Guards/role.guard';
import { LoginComponent } from './Shared/login/login.component';
import { NotFoundComponent } from './Shared/not-found/not-found.component';


const routes: Routes = [
  { path: 'login',
    component: LoginComponent
  },
  // {
  //   path:'olvide-mi-contraseña',
  //   component: PasswordResetComponent
  // },
  {
    path:'404',
    component: NotFoundComponent
  },
  {
    path: 'admin', 
    loadChildren:() => import(`./Roles/Administrator/admin.module`).then(m => m.AdminModule), 
    canActivate:[RoleGuard],
    data: {role: ["ADMINISTRATOR"]}
  },
  {
    path: 'agent', 
    loadChildren:() => import(`./Roles/Agent/agent.module`).then(m => m.AgentModule), 
    canActivate:[RoleGuard],
    data: {role: ["AGENT"]}
  },
  {path: '**', pathMatch: 'full', redirectTo: 'login'},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

