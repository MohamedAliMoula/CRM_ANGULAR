import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AjouterEventComponent } from '../../event/ajouter-event/ajouter-event.component';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-event-prospect',
  templateUrl: './event-prospect.component.html',
  styleUrls: ['./event-prospect.component.scss']
})
export class EventProspectComponent implements OnInit {

  displayedColumns: string[] = ['eventId','eventTitle', 'eventDescription','startDate' ,'endDate','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  constructor(private toastr :ToastrService,
    private fromBuilder : FormBuilder,private  activatedRoute :ActivatedRoute,private api:ApiService,
    private dialog : MatDialog) { }
  client:any;
  etb:any;
  editData:any;
  eventForm !: FormGroup;
  x:string;
  Tier:string;
  ngOnInit(): void {

    this.api.getEtb().subscribe((rep)=>{
      this.etb=rep;

    });

    this.activatedRoute.params.subscribe(params => {
      let TI = params['TI'];
      this.x=TI;

    });
      this.Tier=this.x;
      this.api.geteventTiers(this.x).subscribe((result) => {

        this.editData=result[0];
        this.dataSource= new MatTableDataSource(result);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator=this.paginator;
    });


      this.api.getprospectTiers(this.x).subscribe((res)=>{
        this.client=res[0];
      });

      this.eventForm=this.fromBuilder.group({


        ETB :['1',Validators.required],
        EVENEMENT :['',Validators.required],
        TIERSINDIVIDU :[this.x,Validators.required],
        CONTACT :['',Validators.required],
        EVTUSER :['',Validators.required],
        EVTDT :['',Validators.required],
        EVTFINDH :['',Validators.required],
        LIB80:['',Validators.required],
        RDVOK:['',Validators.required],
        REALISEOK:['',Validators.required]
   })

  }
  geterror(n:any,t:Array<any>){
    for (let i=0;i<t.length;i++){
      console.log(t[i])
      if (n==t[i][0])
      return t[i][1]

    }return 'ff'


  }
  public findInvalidControls() {
    let invalid = '';
    let gg=[
      ["CONTACT","Contact"],
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
  addProduct(){


      if(this.eventForm.valid){
        this.eventForm.value.ETB=this.eventForm.value.ETB.substr(0,2)
        this.api.postProduct(this.eventForm.value)
        .subscribe({
          next:(res)=>{
            console.log(res)
            this.toastr.success('Événement ajouté avec succès','',{
              timeOut:1000,
              progressBar:false
            });

            this.eventForm.reset();
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

    }
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
  }
  openDetails(row:any) {
     this.dialog.open(AjouterEventComponent , {

      panelClass: 'fullscreen-dialog',
      height: '90vh',
      width: '60%',
      data:row

     });

   }


}
