import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { UserLoginService } from './user-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn: boolean = false;
  private userId: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private loginService: UserLoginService
  ) { }

  public logout(): void {
    this.router.navigate(['/login']);
  }

  getUserId(userEmail: string): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log(userEmail);
  
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(`https://swwao.orbit.au.dk/grp-13/api-gateway/${userEmail}/id`, { headers })
        .subscribe(
          response => {
            const userId = response;
            resolve(userId);
          },
          error => {
            console.error('Failed to get the UserId:', error);
            reject(error);
          }
        );
    });
  }

  login(email: string, password: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log(email + ' ' + password);

    this.http.post<any>('https://swwao.orbit.au.dk/grp-13/api-gateway/login', { email, password }, { headers }).subscribe(
      response => {
        const userId: number = response.userId;
        this.loginService.setUserID(userId);
        console.log(userId);
        if(userId == 0){
          this.router.navigate(['/login']);
        }
        else{
          this.router.navigate(['/homepage']);
        }
      },
      error => {
        console.error('Failed at login:', error);
      }
    );
  }
  
  signup(email: string, password: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log(email + ' ' + password);

    this.http.post<any>('https://swwao.orbit.au.dk/grp-13/api-gateway/signup', { email, password }, { headers }).subscribe(
      response => {
        const userId = response.userId;
        console.log(userId + ' signup');
        this.loginService.setUserID(userId);
        this.router.navigate(['/homepage']);
      },
      error => {
        console.error('Failed at signup', error);
      }
    );
  }
  
}
