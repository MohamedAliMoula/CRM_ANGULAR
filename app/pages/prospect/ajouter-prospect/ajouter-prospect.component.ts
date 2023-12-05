import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-ajouter-prospect',
  templateUrl: './ajouter-prospect.component.html',
  styleUrls: ['./ajouter-prospect.component.scss']
})
export class AjouterProspectComponent implements OnInit {
  constructor(private toastr:ToastrService ,private api :ApiService,
    private fromBuilder : FormBuilder) { }
  ProspectForm !: FormGroup;
  ngOnInit(): void {
    this.ProspectForm=this.fromBuilder.group({
      DOS:["1",Validators.required],
      NOM:["",Validators.required],
      ADRCPL1:[""],
      RUE:[""],
      PAY:[""],
      VIL:[""],
      CPOSTAL:[""],
      TEL:[""],
      WEB:[""],
      EMAIL:[""],

    })
  }
  resetform(){
    this.ProspectForm.reset();

  }
// trouver l err
  public findInvalidControls() {
    let invalid = '';
    let na='code Tier'
    const controls = this.ProspectForm.controls; 
    for (const name in controls) {
        if (controls[name].invalid) {
            if (name=='TIERS'){
            }else               invalid+='<b><font color="red">*</font>     <font color="black">Nom</font></b> <br>';


        }
    }
    return invalid;
}
//ajouter pros
  saveProspect(){
    this.ProspectForm.value.DOS='1';
    if(this.ProspectForm.valid){

      this.api.postProspect(this.ProspectForm.value )
      .subscribe({
        next:(res)=>{

          this.toastr.success('Prospect ajouté avec succès','',{
            timeOut:1000,
            progressBar:false
          });
          console.log(this.ProspectForm.value)
          this.ProspectForm.reset();

        },
        error:(err)=>{

        }
      })
    }else{
      this.toastr.warning(this.findInvalidControls(),'ce(s) champ(s) obligatoire(s)',{
        timeOut:3000,
        progressBar:false,
        enableHtml: true,
      });
    }


  }


}
