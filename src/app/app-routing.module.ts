import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerEditComponent } from './pages/customer-edit/customer-edit.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [ 
  { path: '', pathMatch: 'prefix', redirectTo: 'login'},
  { path:"login",component: LoginComponent },
  { path:"customer-list",component: CustomerListComponent },
  {path: "customer-edit/:id", component: CustomerEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
