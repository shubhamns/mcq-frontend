import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../angular_material/material.module';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyComponent } from './verify/verify.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerifyComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AuthenticateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FontAwesomeModule
  ]
})
export class AuthenticateModule { }
