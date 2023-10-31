import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerEditComponent } from './pages/customer-edit/customer-edit.component';
/* import { ToastComponent } from './shared/toast/toast.component'; */
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CustomerListComponent,
    CustomerEditComponent, 
    LoginComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      progressBar: true
  }) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
