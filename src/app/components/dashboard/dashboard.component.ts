import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


    ForecastData!:any;
    cityval:       string='delhi';


    city:          string='';
    country:       string='';
    lat:           string='';
    lon:           string='';
    description:   string='';
    humidity:      string='';
    tempFeelsLike: string='';
    temp:          string='';
    tempMax:       string='';
    tempMin:       string='';
    weatherIcon:   string='';


    logot:boolean=false;

    public fullName:string='';
  constructor(private auth:AuthService,private userStore:UserStoreService) { }

  ngOnInit(): void {
    this.ForecastData={
      main:{},
      isDay:true
    };
    this.getAllForecast(this.cityval);
    this.userStore.getFullNamefromStore()
    .subscribe((val:any)=>{
      let fullnamefrom =this.auth.GetFullNameFromToken();
      this.fullName=val || fullnamefrom
    })
  }
  logout(){
    this.auth.signOut();
  }
  getCity(val:string){
    this.cityval=val;
    console.log(this.cityval)
  }
  getAllForecast(vall:string){
    let host="http://localhost:5189/api/Weather?City=";
    fetch(`${host}${vall}`)
    .then(response=>response.json())
    .then(data=>{this.setAllforecastData(data);})
  }
  setAllforecastData(Data:any){
    this.ForecastData=Data;
    console.log(this.ForecastData)
    this.temp=this.ForecastData[0].temp;
    this.city=this.ForecastData[0].city;
    this.country=this.ForecastData[0].country;
    this.lat=this.ForecastData[0].lat;
    this.lon=this.ForecastData[0].lon;
    this.description=this.ForecastData[0].description;
    this.tempMax=this.ForecastData[0].tempMax;
    this.tempMin=this.ForecastData[0].tempMin;
    this.tempFeelsLike=this.ForecastData[0].tempFeelsLike;
    this.weatherIcon=`http://openweathermap.org/img/wn/${this.ForecastData[0].weatherIcon}@4x.png`;
    this.humidity=this.ForecastData[0].humidity;
  }

  checkLogout(){
    return this.auth.isLoggedIn();
  }

}

