import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../service/api.service';
import { DialogProspectComponent } from '../dialog-prospect/dialog-prospect.component';

@Component({
  selector: 'app-table-prospect',
  templateUrl: './table-prospect.component.html',
  styleUrls: ['./table-prospect.component.scss']
})
export class TableProspectComponent implements OnInit {
  displayedColumns: string[] = ['TIERS','DOS', 'NOM','action'];
  dataSource!: MatTableDataSource<any>;
  loading:boolean;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

constructor(private dialog : MatDialog,private api :ApiService,private toastr:ToastrService){


}

ngOnInit(): void {
    this.api.getProspects().subscribe((res)=>{
    this.dataSource= new MatTableDataSource(res);
    this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
      console.log(res)
      });
}

ajoutprospect() {
  this.dialog.open(DialogProspectComponent, {

    height: '90vh',
    width: '60%',

  })
}
deleteProspect(TIERS:String){
  this.api.deleteProspect(TIERS)
  .subscribe({
    next:(res)=>{
      this.toastr.success('Prospect supprimer avec succès','',{
        timeOut:3000,
        progressBar:false
      });

     },
    error:()=>{

    },complete:()=>this.ngOnInit()
  })
}


getProspect(){
  this.api.getProspects()
  .subscribe({
    next:(res)=>{

     console.log( this.dataSource= new MatTableDataSource(res["http://localhost:8080/api/prospects"]));
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },
    error:(err)=>{

      alert("Error while fetching the Records !!")
    }

  })
}
editProspect(row : any){

  this.dialog.open(DialogProspectComponent,{
    width :'60%',
    data:row
  }).afterClosed().subscribe(
    {next:val=>{
    if(val==='update'){
      this.getProspect();
    }
  },complete:()=>this.ngOnInit()})


}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
