import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private fullName$=new BehaviorSubject<string>("");
  private role$=new BehaviorSubject<string>("");
  private username$=new BehaviorSubject<string>("");



  constructor() { }

  public getRolesfromstore(){
    return this.role$.asObservable();
  }
  public setRolesfromStore(role:string){
    this.role$.next(role);
  }
  public getFullNamefromStore(){
    return this.fullName$.asObservable();
  }
  public setfullNamefromStore(fullName:string){
    this.fullName$.next(fullName);
  }

   public getUserNamefromStore(){
    return this.username$.asObservable();
  }
  public setUsernameNamefromStore(username:string){
    this.username$.next(username);
  }
}
