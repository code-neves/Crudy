import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/model/Login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string = "";
  password: string = "";
  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      user: new FormControl("", [Validators.required, Validators.minLength(4)]),
      password: new FormControl("", [Validators.required, Validators.minLength(4)])
    })
  }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  onSubmit(loginForm: Login) {
    if (this.loginService.verifyCredentials(loginForm.user, loginForm.password)) {
      this.router.navigate(['customer-list'])
      this.toastr.success('Login efetuado com sucesso')
    } else {
      this.toastr.error('Usuário ou senha incorretos')
      this.loginForm.reset();
    }
  }

  ngOnInit(): void { }


}