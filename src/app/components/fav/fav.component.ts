import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
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
  userData: any=[];


  constructor(private userStore:UserStoreService,private auth:AuthService,
    private toast:NgToastService) {

    }

  ngOnInit(): void {
    this.userStore.getFullNamefromStore()
    .subscribe((val:any)=>{
      let usernamefrom =this.auth.GetUsernameFromtoken();
      this.username=val || usernamefrom
    })


  }
  showdata(){
    this.auth.getUserData(this.username)
    .subscribe((res:any)=>{
      this.userData=res;
      this.country=this.userData.city;
    })
  }

  getTemp(val:string){
    this.country=val;
    let host="http://localhost:5189/api/Weather?City="; 
    fetch(`${host}${this.country}`)
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
  // showwatch(){
  //   this.auth.getwatchlist(this.username)
  //   .subscribe(res=>{
  //     console.log(res)
  //   })

  // }




}
