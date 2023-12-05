import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogProspectComponent } from '../../prospect/dialog-prospect/dialog-prospect.component';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-modif-client',
  templateUrl: './modif-client.component.html',
  styleUrls: ['./modif-client.component.scss']
})
export class ModifClientComponent implements OnInit {
  constructor(private toastr:ToastrService ,private api :ApiService,
    private fromBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef :MatDialogRef<DialogProspectComponent> ) { }
  clientForm !: FormGroup;
  ngOnInit(): void {
    this.clientForm=this.fromBuilder.group({
      NOM:["",Validators.required],
      ADRCPL2:[""],
      RUE:[""],
      PAY:[""],
      VIL:[""],
      CPOSTAL:[""],
      TEL:[""],
      WEB:[""],
      EMAIL:[""],

    })       
    if(this.editData){

    this.clientForm.controls['NOM'].setValue(this.editData.NOM);
    this.clientForm.controls['ADRCPL2'].setValue(this.editData.ADRCPL2);
    this.clientForm.controls['RUE'].setValue(this.editData.RUE);
    this.clientForm.controls['PAY'].setValue(this.editData.PAY);
    this.clientForm.controls['VIL'].setValue(this.editData.VIL);
    this.clientForm.controls['CPOSTAL'].setValue(this.editData.CPOSTAL);
    this.clientForm.controls['TEL'].setValue(this.editData.TEL);
    this.clientForm.controls['WEB'].setValue(this.editData.WEB);
    this.clientForm.controls['EMAIL'].setValue(this.editData.EMAIL);
    }

    
  }


  public findInvalidControls() {
    let invalid = '';
    const controls = this.clientForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid+='<b><font color="red">*</font>     <font color="black">'+(name)+'</font></b> <br>';
        }
    }
    return invalid;
}
  
  updateProduct(){
    console.log(this.editData.TIERS)
    this.api.updateclient(this.editData.TIERS,this.clientForm.value)
     .subscribe({
       next:(res)=>{
        this.toastr.success('Mise à jour réussie  ','',{
          timeOut:1000,
          progressBar:true
        });
         this.clientForm.reset();
         this.dialogRef.close('update');
       },
       error:()=>{
         alert("Error while updating the record!!");
       },complete:()=>this.ngOnInit()
     })
   }

}
