import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiService } from '../../service/api.service';
export interface User {
  name: string;
}
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
 

  etb :any;
  client :any;
  eventForm !: FormGroup;
  actionBtn: string="save"
  cli :any;
  pros:any;


  selected :string='select item'

  constructor( private _formBuilder: FormBuilder,private toastr :ToastrService,private fromBuilder : FormBuilder,
    private api: ApiService ,
    ) {
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
      console.log(this.cli)
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
      ["TIERSINDIVIDU","Client"],
      ["LIB80","Description"],
      ["ETB","Etablissement"],
      ["EVTUSER","UserName"],
      ["RDVOK","Rendez-vous"],
      ["REALISEOK","Tache"],
      ["EVENEMENT","Titre Evenement"],
      ["EVTDT","Date Debut"],
      ["EVTFINDH","Date Fin"],
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
 reset(){
   this.eventForm.reset()
 }

  
// POUR AJOUTER UN EVENEMENT

  addEvent(){

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

    }
  }


