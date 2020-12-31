import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageFindsComponent } from './manage-finds/manage-finds.component';
import { HistoryComponent } from './history/history.component';
import { AddFindComponent } from './add-find/add-find.component';
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { ManageGatewaysComponent } from './manage-gateways/manage-gateways.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { SettingsComponent } from './settings/settings.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DeviceHistoryComponent } from './device-history/device-history.component';
import { EditDeviceComponent } from './edit-device/edit-device.component';
import { HomeComponent } from './home/home.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { LiveDataComponent } from './live-data/live-data.component';
import { HistoryReportComponent } from './history-report/history-report.component';
import { HomeCountViewComponent } from './home-count-view/home-count-view.component';
import { EditSettingShiftComponent } from './edit-setting-shift/edit-setting-shift.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminAddBleIdComponent } from './admin-add-ble-id/admin-add-ble-id.component';
import { OrderContactComponent } from './order-contact/order-contact.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { InternationalPhoneNumber2Module  } from 'ngx-international-phone-number2';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { TwoStepAuthComponent } from './two-step-auth/two-step-auth.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BnNgIdleService } from 'bn-ng-idle';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ManageFindsComponent,
    HistoryComponent,
    AddFindComponent,
    ManageGatewaysComponent,
    ManageUsersComponent,
    SettingsComponent,
    SideBarComponent,
    DeviceHistoryComponent,
    EditDeviceComponent,
    HomeComponent,
    LiveDataComponent,
    HistoryReportComponent,
    HomeCountViewComponent,
    EditSettingShiftComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminAddBleIdComponent,
    OrderContactComponent,
    AdminSettingsComponent,
    UserGuideComponent,
    TwoStepAuthComponent,
    SetNewPasswordComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    InternationalPhoneNumber2Module,
    NgxIntlTelInputModule,
    NgCircleProgressModule.forRoot({}),
    MDBBootstrapModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthGuard,BnNgIdleService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
