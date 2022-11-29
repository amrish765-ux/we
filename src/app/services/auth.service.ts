import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string="https://localhost:7161/api/User/";
  // private baseUrl1:string="https://api.openweathermap.org/data/2.5/weather?q=mumbai&lat=44.34&lon=10.99&appid=aa8ba225e914649778f77d6e2ce41b64";

  constructor(private http:HttpClient,private route:Router) { }
  signUp(userObj:any){
   return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }
  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
  }
  signOut(){
    localStorage.clear();
    this.route.navigate(['dashboard']);
  }
  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  // getAllForeacast(){
  //   return this.http.get<any>('')
  // }
  
} 
