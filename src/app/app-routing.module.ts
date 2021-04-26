import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { DeviceHistoryComponent } from './device-history/device-history.component';
import { HomeComponent } from './home/home.component';
import { LiveDataComponent } from './live-data/live-data.component';
import { HistoryReportComponent } from './history-report/history-report.component';
import { HomeCountViewComponent } from './home-count-view/home-count-view.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { TwoStepAuthComponent } from './two-step-auth/two-step-auth.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { ProfileComponent } from './profile/profile.component';
import {AdminAnalysticsComponent} from './adminAnalystics/admin-analystics/admin-analystics.component'

const routes: Routes = [
  { path: '', component:HomeComponent, canActivate: [AuthGuard], data:{role:['user']}},
  {path:'login' , component:LoginComponent},
  {path:'two-step-auth' , component:TwoStepAuthComponent},
  {path:'set-new-password' , component:SetNewPasswordComponent},
  {path:'dashboard' , component:DashboardComponent , canActivate: [AuthGuard], data:{role:['user']}},
  {path:'history' , component:HistoryComponent , canActivate: [AuthGuard], data:{role:['user']}},
  {path:'settings' , component:SettingsComponent , canActivate: [AuthGuard], data:{role:['user']}},
  {path:'device-history' , component:DeviceHistoryComponent , canActivate: [AuthGuard], data:{role:['user']}},
  {path:'home' , component:HomeComponent, canActivate: [AuthGuard], data:{role:['user']}},
  {path:'live-data' , component:LiveDataComponent, canActivate: [AuthGuard], data:{role:['user']} },
  {path:'history-report' , component:HistoryReportComponent, canActivate: [AuthGuard], data:{role:['user']}},
  {path:'home-count-view' , component:HomeCountViewComponent, canActivate: [AuthGuard], data:{role:['user']}},
  {path:'user-guide' , component:UserGuideComponent, canActivate: [AuthGuard], data:{role:['user']}},
  {path:'profile' , component:ProfileComponent, canActivate: [AuthGuard], data:{role:['user']}},



  {path:'admin-login' , component:AdminLoginComponent},
  {path:'admin-dashboard' , component:AdminDashboardComponent, canActivate: [AuthGuard], data:{role:['admin']}},
  {path:'admin-settings' , component:AdminSettingsComponent, canActivate: [AuthGuard], data:{role:['admin']}},
  {path:'admin-Analystics' , component:AdminAnalysticsComponent, canActivate: [AuthGuard], data:{role:['admin']}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
