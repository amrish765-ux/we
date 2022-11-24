import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl='https://localhost:7161/api/User';
  constructor(private http:HttpClient) { }
  getAllUsers(){
    return this.http.get<any>(this.baseUrl);
  }

}
