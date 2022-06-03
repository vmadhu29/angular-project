import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { RegistrationComponent } from './registration/registration.component'; 
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { AuthGuard } from './guards/auth.guard';  

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'about', component: AboutComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate : [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
