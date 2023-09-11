import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private loginService: UserLoginService) { }

  ngOnInit(): void {
    console.log("login page");
  }

  login(): void {
    this.router.navigate(["/homepage"]);
    //this.authService.login(this.email, this.password);
    //this.loginService.setGlobalEmail(this.email);
    //this.authService.getUserId(this.email);
  }

  getEmail(): string {
    return this.email;
  }

  goToSignup(): void {
    this.router.navigate(['/register']);
  }
}
