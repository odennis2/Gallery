import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService) { }

  signup(): void {
    // Implement the signup logic using authService.signup() method
    this.authService.signup(this.email,this.password);
  }
}
