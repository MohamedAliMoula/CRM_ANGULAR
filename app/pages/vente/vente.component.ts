import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../service/api.service';
export interface User {
  name: string;
}
export interface Use {
  na: string;
}
@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss']
})
export class VenteComponent implements OnInit {
  myControl = new FormControl();
  options: any[];
  filteredOptions: Observable<User[]>;
  filteredCli:Observable<any[]>;
  cli :any[];
  aricleform:FormGroup;
  listData:any;
  p:boolean;
  art:any[];
  filteredArt:Observable<any[]>;
  Control = new FormControl();
  opt: any[];
  Total:number;
  total:number;
  filteredOption: Observable<Use[]>;
  constructor(private   api:ApiService,private dialog : MatDialog,private fb:FormBuilder, private toastr :ToastrService) {
    this.listData=[];  this.p=false; this.total=0;

    this.aricleform=this.fb.group({

      qte:['',Validators.required],
      remise:['',Validators.required],
    })
  }

    ngOnInit(): void {
    this.api.getArtNP().subscribe((rep)=>{
      this.art=rep;
      
      this.api.getCli().subscribe((res)=>{
        this.cli=res;
      })

    });
    this.filteredCli = this.myControl.valueChanges
    .pipe(
      startWith(''),  
      map(value => typeof value === 'string' ? value : value.NOM),
      map(nom => nom ? this._filter(nom) : this.cli)
    );
    this.filteredArt = this.Control.valueChanges
    .pipe(
      startWith(''),
      map(val => typeof val === 'string' ? val : val.NOM),
      map(no => no ? this.filter(no) : this.art)
    );


  }
  addItem(){
   let  a={
     Article:this.Control.value.DES.trim(),
     Quantite:this.aricleform.value.qte,
     Prix:this.Control.value.PRIX,
     Remise:this.aricleform.value.remise,

    }
    this.Total=(this.Control.value.PRIX-(this.Control.value.PRIX*this.aricleform.value.remise/100))*this.aricleform.value.qte;
    this.total=this.total+this.Total
    
    
    this.listData.push(a);
    this.p=this.listData.lenght>0
    console.log(this.listData)
    this.ngOnInit()

  }
  savedevis(){
   let b={
     Tiers:this.myControl.value.TIERS,
     PrixTotal:this.total,
     articles:this.listData,
    }
    

        if(b!=null){
          this.api.addDevis(b)
          .subscribe({
            next:(res)=>{
              this.toastr.success('Devis ajouté avec succès','',{
                timeOut:1000,
                progressBar:false
              });
  
              this.reset()
              
            },
            error:(err)=>{

            },complete:()=>(this.listData=[],this.total=0,this.myControl.reset())
          })
        }
  
      
    
  }
  remove(element:any){
    this.listData.forEach((value: any,index: any)=>{
      if(value==element)
      this.listData.splice(index,1);
    })
  }
  reset(){
    this.aricleform.reset()
    this.Control.reset()
  }
  displayFn(cli:any): string {
    return cli && cli.NOM ? cli.NOM.trim() : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.cli.filter(option => option.NOM.toLowerCase().includes(filterValue));
  }

  dispaly(art:any):string {
    return art && art.DES ? art.DES.trim() : '';
  }

  private  filter(na: string): Use[] {
    const fitterVa = na.toLowerCase();

    return this.art.filter(opt => opt.DES.toLowerCase().includes(fitterVa));
  }
  getitem(){
    for(let i=0;i<this.aricleform.value.lenght;i++){

    }
  }

}
