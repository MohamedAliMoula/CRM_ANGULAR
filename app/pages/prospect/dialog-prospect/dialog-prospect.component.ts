import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-dialog-prospect',
  templateUrl: './dialog-prospect.component.html',
  styleUrls: ['./dialog-prospect.component.scss']
})
export class DialogProspectComponent implements OnInit {

  constructor(private toastr:ToastrService ,private api :ApiService,
    private fromBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef :MatDialogRef<DialogProspectComponent> ) { }
  ProspectForm !: FormGroup;
  ngOnInit(): void {
    this.ProspectForm=this.fromBuilder.group({
      TIERS:[this.editData,Validators.required],
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
    if(this.editData){

    this.ProspectForm.controls[this.editData.TIERS]
    this.ProspectForm.controls[1]
    this.ProspectForm.controls['NOM'].setValue(this.editData.NOM);
    this.ProspectForm.controls['ADRCPL1'].setValue(this.editData.ADRCPL1);
    this.ProspectForm.controls['RUE'].setValue(this.editData.RUE);
    this.ProspectForm.controls['PAY'].setValue(this.editData.PAY);
    this.ProspectForm.controls['VIL'].setValue(this.editData.VIL);
    this.ProspectForm.controls['CPOSTAL'].setValue(this.editData.CPOSTAL);
    this.ProspectForm.controls['TEL'].setValue(this.editData.TEL);
    this.ProspectForm.controls['WEB'].setValue(this.editData.WEB);
    this.ProspectForm.controls['EMAIL'].setValue(this.editData.EMAIL);
    }

    
  }


  public findInvalidControls() {
    let invalid = '';
    const controls = this.ProspectForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid+='<b><font color="red">*</font>     <font color="black">'+(name)+'</font></b> <br>';
        }
    }
    return invalid;
}
  
  updateProduct(){
    this.api.putProspect(this.editData.TIERS,this.ProspectForm.value)
     .subscribe({
       next:(res)=>{
        this.toastr.success('Mise à jour réussie  ','',{
          timeOut:1000,
          progressBar:true
        });
         this.ProspectForm.reset();
         this.dialogRef.close('update');
       },
       error:()=>{
         alert("Error while updating the record!!");
       },complete:()=>this.ngOnInit()
     })
   }
}


