import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { UserLoginService } from './services/user-login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SummerFrontend';
  isLoginPage: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private loginService: UserLoginService
  ){
    this.isLoginPage = this.router.url === '/login'; // Set the initial value based on the current route
  }

  listProduct() {
    this.router.navigate(['/listproduct']);
  }

  isCurrentRouteLoginPage() {
    return this.router.url === '/login';
  }
  logout() {
    this.authService.logout();
  }
}
