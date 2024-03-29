import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  signUpForm!:FormGroup;

  constructor(private fb:FormBuilder,private auth:AuthService,private route:Router,
    private toast:NgToastService) { }

  ngOnInit(): void {
    this.signUpForm=this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      username:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  hideShowPass(){
    this.isText=!this.isText;
    this.isText ? this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText?this.type="text":this.type="password";
  }
  onSignUp(){
    if(this.signUpForm.valid){
      // console.log(this.signUpForm.value);

      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          this.toast.success({detail:"SUCCESS",summary:res.message,duration:5000});
          this.signUpForm.reset();
          this.route.navigate(['login']);
        })
        ,error:(err=>{
          this.toast.error({detail:"ERROR",summary:"Use different details",duration:5000});
        })
      })
    }
  else{
    //error
    ValidateForm.validateAllFormFields(this.signUpForm);
  }
}

}
