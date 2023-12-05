import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DialogProspectComponent } from '../../prospect/dialog-prospect/dialog-prospect.component';
import { ApiService } from '../../service/api.service';
import { DetailsClientComponent } from '../details-client/details-client.component';
import { ModifClientComponent } from '../modif-client/modif-client.component';

@Component({
  selector: 'app-table-client',
  templateUrl: './table-client.component.html',
  styleUrls: ['./table-client.component.scss']
})
export class TableClientComponent implements OnInit {

  displayedColumns: string[] = ['TIERS','DOS', 'NOM','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

constructor( private dialog : MatDialog,private api :ApiService,private toastr:ToastrService){


}

ngOnInit(): void {
    this.api.getClient().subscribe((res)=>{
    this.dataSource= new MatTableDataSource(res);
    this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
      });
}


openDetails(row:any) {
  this.dialog.open(DetailsClientComponent , {
   width:'50%',
   data:row
  })
}
getClient(){
  this.api.getClient()
  .subscribe({
    next:(res)=>{

    this.dataSource= new MatTableDataSource(res);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },
    error:(err)=>{

      alert("Error while fetching the Records !!")
    }

  })
}



applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
editProspect(row : any){

  this.dialog.open(ModifClientComponent,{
    width :'60%',
    data:row
  }).afterClosed().subscribe(
    {next:val=>{
    if(val==='update'){
      ;
    }
  },complete:()=>this.ngOnInit()})


}
deleteClient(TIERS:String){
  this.api.deleteclient(TIERS)
  .subscribe({
    next:(res)=>{
      this.toastr.success('Client supprimer avec succès','',{
        timeOut:3000,
        progressBar:false
      });

     },
    error:()=>{

    },complete:()=>this.ngOnInit()
  })
}

}
