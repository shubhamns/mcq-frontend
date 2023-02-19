import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMaterialRoutingModule } from './add-material-routing.module';
import { ScienceComponent } from './science/science.component';
import { MCQSComponent } from './mcqs/mcqs.component';
import { MaterialModule } from '../angular_material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { TrueFalseComponent } from './true-false/true-false.component';
import { OpenEndedComponent } from './open-ended/open-ended.component';
@NgModule({
  declarations: [
    ScienceComponent,
    MCQSComponent,
    AddTopicComponent,
    TrueFalseComponent,
    OpenEndedComponent
  ],
  imports: [
    CommonModule,
    AddMaterialRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddMaterialModule { }
