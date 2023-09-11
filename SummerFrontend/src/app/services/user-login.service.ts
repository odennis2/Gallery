import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor() { }

  private globalEmail: string = '';
  private userID: number = 0;

  setUserID(id: number): void {
    this.userID = id;
  }

  getUserID(): number {
    return this.userID;
  }

  setGlobalEmail(email: string): void {
    this.globalEmail = email;
  }

  getGlobalEmail(): string {
    return this.globalEmail;
  }
}