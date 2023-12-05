import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { ApiService } from '../../service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detaildevis',
  templateUrl: './detaildevis.component.html',
  styleUrls: ['./detaildevis.component.scss']
})
export class DetaildevisComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;

  dev:any;
  art:any;
  client:any;
  loading=true;
  constructor(private api:ApiService ,private toastr:ToastrService  
    ,@Inject(MAT_DIALOG_DATA) public editData : any,
  private dialogRef :MatDialogRef<DetaildevisComponent>) { }

  ngOnInit(): void {
    this.api.getDevisart(this.editData.devId).subscribe((res)=>{
      this.dev=res[0]
      this.art=res[1]
      
    });
    this.api.getclientTiers(this.editData.Tiers).subscribe((res)=>{
      this.client=res[0]
    })
  }
  getTotal() {
    let total = 0;
    for (var i = 0; i < this.art?.length; i++) {
        if (this.art[i].PrixAR) {
            total += this.art[i].PrixAR;
        }
    }
    return total;
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
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('devis'+this.editData.devId+'.pdf');
    });
  }
}
