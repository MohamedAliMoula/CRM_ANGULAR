import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../service/api.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DetaildevisComponent } from '../detaildevis/detaildevis.component';
import { ModifDevisComponent } from '../modif-devis/modif-devis.component';

@Component({
  selector: 'app-table-devis',
  templateUrl: './table-devis.component.html',
  styleUrls: ['./table-devis.component.scss']
})
export class TableDevisComponent implements OnInit {

 
  displayedColumns: string[] = ['devId','NOM','TIERS', 'DEVDT','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

constructor(
  private dialog:MatDialog,
  private toastr:ToastrService,
   private api :ApiService){


}

ngOnInit(): void {
    this.api.getDevis().subscribe((res)=>{
    this.dataSource= new MatTableDataSource(res);
    this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
      });
}
deleteDevis(id:number){
  this.api.deleteDevis(id)
  .subscribe({
    next:(res)=>{
      this.toastr.success('Devis supprimer avec succès','',{
        timeOut:3000,
        progressBar:false
      });

     },
    error:()=>{

    },complete:()=>this.ngOnInit()
  })
}
openDetails(row:any) {
  this.dialog.open(DetaildevisComponent, {
   width:'70%',
   height:'80%',
   data:row
  })
}
modifermodal(row:any) {
  this.dialog.open(ModifDevisComponent, {
   width:'85%',
   height:'90%',
   data:row
  })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
  

}
