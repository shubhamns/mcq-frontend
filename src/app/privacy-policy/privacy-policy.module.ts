import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';


@NgModule({
  declarations: [
    ContactComponent,
    FaqComponent,
    TermsConditionsComponent
  ],
  imports: [
    CommonModule,
    PrivacyPolicyRoutingModule
  ]
})
export class PrivacyPolicyModule { }
