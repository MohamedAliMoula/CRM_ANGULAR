import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogeventComponent } from '../dialogevent/dialogevent.component';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AjouterEventComponent } from '../ajouter-event/ajouter-event.component';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  events:any;

  displayedColumns: string[] = ['eventId','eventTitle', 'eventDescription','startDate' ,'endDate','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  constructor(private toastr :ToastrService, private api:ApiService,private dialog : MatDialog) { }

  ngOnInit(): void {
    this.api.getProduct().subscribe((res)=>{
    this.dataSource= new MatTableDataSource(res);
    this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    console.log(res)
      });
}
//afficher detailes d'un evenement
openDetails(row:any) {
  this.dialog.open(AjouterEventComponent , {

   panelClass: 'fullscreen-dialog',
   height: '90vh',
   width: '60%',
   data:row

  });

}
//supp un event
deleteProduct(EVTNO:number){
  this.api.deleteProduct(EVTNO)
  .subscribe({
    next:(res)=>{
      this.toastr.success('Événement supprimer avec succès','',{
        timeOut:3000,
        progressBar:false
      });

     },
    error:()=>{

    },complete:()=>this.ngOnInit()
  })
}
// pour ouvrir l'interface de add event
  openDialog() {
    this.dialog.open(DialogeventComponent , {
     width:'60%',


    });

  }
// get event
  getProduct(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{

        console.log(this.events=res);

      },
      error:(err)=>{

        alert("Error while fetching the Records !!")
      }

    })
  }
  //modifier un evenement
  editProduct(row : any){

    this.dialog.open(DialogeventComponent,{
      width :'60%',
      data:row
    }).afterClosed().subscribe(
      {next:val=>{
      if(val==='update'){
        this.getProduct();
      }
    },complete:()=>this.ngOnInit()})


  }
  //filter le tab
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
