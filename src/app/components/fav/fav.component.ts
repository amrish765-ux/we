import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { NgToastComponent } from 'ng-angular-popup';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css']
})
export class FavComponent implements OnInit {

  username:string='';
  country:string=''
  temp:string=''
  ForecastData: any;
  constructor(private userStore:UserStoreService,private auth:AuthService,
    private toast:NgToastComponent) { }

  ngOnInit(): void {
    this.userStore.getFullNamefromStore()
    .subscribe((val:any)=>{
      let usernamefrom =this.auth.GetUsernameFromtoken();
      this.username=val || usernamefrom
    })
  }
  getCity(val:string){
    this.country=val
  }

  getTemp(vall:string){
    let host="http://localhost:5189/api/Weather?City=";
    fetch(`${host}${vall}`)
    .then(response=>response.json())
    .then(data=>{this.setTemp(data);})
  }
  setTemp(Data:any){
    this.ForecastData=Data;
    this.temp=this.ForecastData[0].temp;
  }

  addWatch(){
    this.auth.addToWatchList([
      this.username,
      this.country,
      this.temp
   ]).subscribe(res => {
    console.log(res);
    
   });

  }


}
