import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7253/api/User/';
  // private baseUrl1:string="https://api.openweathermap.org/data/2.5/weather?q=mumbai&lat=44.34&lon=10.99&appid=aa8ba225e914649778f77d6e2ce41b64";
  private userpayload: any;

  constructor(private http: HttpClient, private route: Router) {
    this.userpayload = this.decodeToken();
  }
  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }
  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }
  updateUser(updateInfo: Array<any>){
    return this.http.post(`${this.baseUrl}UpdateUser`,{
      username: updateInfo[0],
      currentpassword: updateInfo[1],
      newpassword:updateInfo[2]
    } ,{responseType: 'text',});
  }
  signOut() {
    localStorage.clear();
    this.route.navigate(['dashboard']);
  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }
  getToken() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // getAllForeacast(){
  //   return this.http.get<any>('')
  // }
  decodeToken() {
    const jwthelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwthelper.decodeToken(token));
    return jwthelper.decodeToken(token);
  }
  GetFullNameFromToken() {
    if (this.userpayload) return this.userpayload.unique_name;
  }
  GetRoleFromtoken() {
    if (this.userpayload) return this.userpayload.role;
  }
}
