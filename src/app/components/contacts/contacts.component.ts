import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  public users:any=[]
  constructor(private api:ApiService) { }

  ngOnInit(){
    this.api.getAllUsers()
    .subscribe(res=>{
      return this.users=res;
    })
  }

}
