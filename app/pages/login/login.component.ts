import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hasError: boolean;

  constructor(private toastr:ToastrService,
     private service:AuthService,
     private route: Router
     ) {
       //INITALISATION DE LOCAL STORAGE
    localStorage.clear()}
    login = new FormGroup({
      name:new FormControl("",Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(320),
      ])),
      password:new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ])),

    })
  ngOnInit(): void {
   this.hasError=!this.hasError;
  }

//find err  form
  public findInvalidControls() {
    let invalid = '';
    const controls = this.login.controls;
    for (const user in controls) {
        if (controls[user].invalid) {
            invalid+='<b><font color="red">*</font>     <font color="black">'+(user)+'</font></b> <br>';
        }
    }
    return invalid;
  }
  //fonction success
  showSuccess() {
    this.toastr.success('', 'connectez-vous avec succès!');
  }
  //envoyer les coordonnées d'un collaborateur
  ProceedLogin(){
   this.hasError=false  ;
    if(this.login.valid){
      this.service.proceedLogin(this.login.value).subscribe({
        next:(result)=>{
          localStorage.setItem('users',this.login.value.name);
          localStorage.setItem('Token',(JSON.stringify(result)));
          if(result=!null){
            
            this.showSuccess()
            this.route.navigate(['/dashboard'])

          }
        },error:(result)=>{
          this.hasError=true;
//mdp ou username incorrects
          if(result['error']){
            this.toastr.error(this.findInvalidControls(),''+ result["error"],{
              timeOut:3000,
              progressBar:false,
              enableHtml: true,
            });}
        }


      })

  }
  }

}
