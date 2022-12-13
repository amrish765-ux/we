import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {


  constructor(private updateAuth: AuthService,private router: Router,
    private toast:NgToastService,
    private auth:AuthService) { }

  ngOnInit(): void {
  }
  isUserValid: boolean= false;

  updateSubmited(){
    
    this.updateAuth.updateUser([this.updateForm.value.username,
    this.updateForm.value.currentpassword,
    this.updateForm.value.newpassword]).subscribe(res =>{
      if (res=='Failure'){
        this.isUserValid= false;
        this.toast.success({detail:"success",summary:"check again",duration:5000})
      }else{
        this.isUserValid=true;
        this.toast.success({detail:"success",summary:"password changed successfully",duration:5000})
        this.auth.signOut();
        this.router.navigate(['login']);
      }

    });
}
updateForm = new FormGroup({
  username: new FormControl("",[Validators.required]),
  currentpassword: new FormControl("",[Validators.required]),
  newpassword: new FormControl("",[Validators.required,Validators.pattern(/(?=.*[a-z]+.*)(?=.*[A-Z]+.*)(?=.*\d+.*)(?=.*[-[!“#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+.*)(?!.*(.)\1\1\1.*)(?!.*(.{3}).*\2.*).{8,256}$/)]),
});
get username(): FormControl{
  return this.updateForm.get('username') as FormControl;

}
get currentpassword(): FormControl{
  return this.updateForm.get('currentpassword') as FormControl;

}
get newpassword(): FormControl{
  return this.updateForm.get('newpassword') as FormControl;

}


}
