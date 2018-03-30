import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;
  error: any;
  constructor(public authService: AuthService) {
  }

  signup() {
    this.authService.emailSignUp(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.emailLogin(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.signOut();
  }

}
