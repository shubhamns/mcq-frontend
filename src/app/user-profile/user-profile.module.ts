import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../angular_material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AddMaterialComponent } from './add-material/add-material.component';


@NgModule({
  declarations: [
    ProfileComponent,
    AddMaterialComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserProfileModule { }
