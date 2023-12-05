import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../../service/api.service';
import { DetaildevisComponent } from '../detaildevis/detaildevis.component';
export interface User {
  name: string;
}

export interface Use {
  na: string;
}
@Component({
  selector: 'app-modif-devis',
  templateUrl: './modif-devis.component.html',
  styleUrls: ['./modif-devis.component.scss']
})
export class ModifDevisComponent implements OnInit {
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
  newart:any;
  dev:any;
  ar:any;
  client:any;
  loading=true;
  constructor(private api:ApiService ,private toastr:ToastrService ,private fb:FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
  private dialogRef :MatDialogRef<DetaildevisComponent>) {
    this.newart=[],this.total=0;
   }

  ngOnInit(): void {
    this.api.getDevisart(this.editData.devId).subscribe((res)=>{
      this.dev=res[0]
      this.ar=res[1]
      
    });
    this.api.getclientTiers(this.editData.Tiers).subscribe((res)=>{
      this.client=res[0]
    })
    this.api.getArtNP().subscribe((rep)=>{
      this.art=rep;
      this.api.getCli().subscribe((res)=>{
        this.cli=res;
      })

    });
    this.aricleform=this.fb.group({

      qte:['',Validators.required],
      remise:['',Validators.required],
    })
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
  updatedevis(){
    
    let b={
      Devis:[{
        devId:this.dev.devId,     
         Tiers:this.dev.Tiers,
        DEVDT:"",
        PrixTotal:this.total}
      ],
      
      articles:this.ar,
      newArticles:this.newart,
     }
     if(b!=null){
     this.api.updateDev(b)
     .subscribe({
       next:(res)=>{
        this.toastr.success('Mise à jour Devis réussie  ','',{
          timeOut:1000,
          progressBar:true
        });
       },
       error:()=>{
       }
     })
    }}
  reset(){
    this.aricleform.reset()
    this.Control.reset()
  }
  getTotal(){
    let total = 0;
    for (var i = 0; i < this.ar?.length; i++) {
        if (this.ar[i].PrixAR) {
            total += this.ar[i].PrixAR;
        }
    }
    return total;
}
addItem(){
  let  a={
    devId:this.dev.devId,
    Article:this.Control.value.DES.trim(),
    Quantite:this.aricleform.value.qte,
    Prix:this.Control.value.PRIX,
    Remise:this.aricleform.value.remise,
   }
   this.Total=(this.Control.value.PRIX-(this.Control.value.PRIX*this.aricleform.value.remise/100))*this.aricleform.value.qte;
   this.total=this.total+this.Total
   console.log(this.total)

   this.newart.push(a);
   this.ngOnInit()

 }
 

 removenew(element:any){
  this.newart.forEach((value: any,index: any)=>{
    if(value==element)
    this.newart.splice(index,1);
  })
}
  deleteArticle(id:number){
    this.api.deleteArticle(id)
    .subscribe({
      next:(res)=>{
        this.toastr.success('Article supprimer avec succès','',{
          timeOut:3000,
          progressBar:false
        });
  
       },
      error:()=>{
  
      },complete:()=>this.ngOnInit()
    })
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

}
