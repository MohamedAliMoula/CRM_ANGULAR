import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';





@Component({
  selector: 'app-dialogevent',
  templateUrl: './dialogevent.component.html',
  styleUrls: ['./dialogevent.component.scss']
})
export class DialogeventComponent implements OnInit {
  etb :any;
  client :any;
  eventForm !: FormGroup;
  actionBtn: string="save"
  cli :any;
  pros:any;


  selected :string='select item'

  constructor( private _formBuilder: FormBuilder,private toastr :ToastrService,private fromBuilder : FormBuilder,
    private api: ApiService ,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef :MatDialogRef<DialogeventComponent> ) {
    }

    x = 0;


    @ViewChild('myDropDownList') myDropDownList: ElementRef;

  ngOnInit(): void {
   //BCH TJIB L ETABLISSEMENT LEL EVENT
    this.api.getEtb().subscribe((rep)=>{
      this.etb=rep;

    });
    // BCH TJIB CLIENT (nom et code)
    this.api.getCli().subscribe((res)=>{
      this.cli=res;
    })
    //BCH TJIB pros (nom et code)
    this.api.getProspet().subscribe((res)=>{
      this.pros=res;
    })

  // intialisation de form d'events
    this.eventForm=this.fromBuilder.group({


      ETB :['',Validators.required],
      EVENEMENT :['',Validators.required],
      TIERSINDIVIDU :['',Validators.required],
      CONTACT :['',Validators.required],
      EVTUSER :['',Validators.required],
      EVTDT :['',Validators.required],
      EVTFINDH :['',Validators.required],
      LIB80:['',Validators.required],
      RDVOK:['',Validators.required],
      REALISEOK:['',Validators.required]
 })
    if(this.editData){
      this.actionBtn="Mise à jour ";

      this.eventForm.controls['ETB' ].setValue(this.editData.ETB);
      this.eventForm.controls['EVENEMENT'].setValue(this.editData.EVENEMENT);
      this.eventForm.controls['TIERSINDIVIDU'].setValue(this.editData.TIERSINDIVIDU);
      this.eventForm.controls['CONTACT'].setValue(this.editData.CONTACT);
      this.eventForm.controls['EVTUSER'].setValue(this.editData.EVTUSER);
      this.eventForm.controls['EVTDT']. setValue(this.editData.EVTDT);
      this.eventForm.controls['EVTFINDH'].setValue(this.editData.EVTFINDH);
      this.eventForm.controls['LIB80'].setValue(this.editData.LIB80);
      this.eventForm.controls['RDVOK'].setValue(this.editData.RDVOK);
      this.eventForm.controls['REALISEOK'].setValue(this.editData.REALISEOK);


     }

  }
  // POUR CHANGR LES  CHAMP DE TAB
  geterror(n:any,t:Array<any>){
    for (let i=0;i<t.length;i++){
      console.log(t[i])
      if (n==t[i][0])
      return t[i][1]

    }return 'ff'


  }
  // BCH TJIB L ERREUR FIL DESIGN TCHOUF LES CHAMP FAR4EN
  public findInvalidControls() {
    let invalid = '';
    let gg=[
      ["CONTACT","Contact"],
      ["TIERSINDIVIDU","Code tiers"],
      ["LIB80","Description"],
      ["ETB","Etablissement"],
      ["EVTUSER","UserName"],
      ["RDVOK","Rendez-vous"],
    ]
    const controls = this.eventForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid+='<b><font color="red">*</font>     <font color="black">'+(this.geterror(name,gg))+'</font></b> <br>';
        }
    }
    return invalid;
}
  div1:boolean=true;
  div2:boolean=true;

 gettiers(){
  const e = this.myDropDownList.nativeElement.option.value;

console.log(e);
  return e;
 }

  div1Function(){
      this.div1=true;
      this.div2=false;

  }

  div2Function(){
      this.div2=true;
      this.div1=false;

  }
// POUR AJOUTER UN EVENEMENT

  addProduct(){

    if(!this.editData){
      if(this.eventForm.valid){
        this.eventForm.value.ETB=this.eventForm.value.ETB.substr(0,2)
        this.api.postProduct(this.eventForm.value )
        .subscribe({
          next:(res)=>{
            this.toastr.success('Événement ajouté avec succès','',{
              timeOut:1000,
              progressBar:false
            });

            this.eventForm.reset();
            this.dialogRef.close('save');
            window.location.reload();

          },
          error:()=>{

          },complete:()=>this.ngOnInit()
        })
      }else{
        this.toastr.warning(this.findInvalidControls(),'ce(s) champ(s) obligatoire(s)',{
          timeOut:3000,
          progressBar:false,
          enableHtml: true,
        });
      }

    }else {
      this.updateProduct()
    }
  }
  // POURR MODIFIER  UN EVENEMENT
  updateProduct(){
    this.api.putProduct( this.editData.EVTNO,this.eventForm.value)
     .subscribe({
       next:(res)=>{
        this.toastr.success('Mise à jour réussie  ','',{
          timeOut:1000,
          progressBar:true
        });
         this.eventForm.reset();
         this.dialogRef.close('update');
       },
       error:()=>{
       },complete:()=>this.ngOnInit()
     })
   }


}
