import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', loadChildren: ()=> import('./home-module/home-module.module').then(m => m.HomeModuleModule)},
  { path: 'authenticate', loadChildren: ()=> import('./authenticate/authenticate.module').then(m => m.AuthenticateModule)},
  { path: 'user', loadChildren: ()=> import('./user-profile/user-profile.module').then(m => m.UserProfileModule)},
  { path: 'material', loadChildren: ()=> import('./add-material/add-material.module').then(m => m.AddMaterialModule)},
  { path: 'policy', loadChildren: ()=> import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
