import { Component, OnInit } from '@angular/core';
import { DashService } from '../service/dash.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  num:any;
  pros:any;
  event:any;
  rea:number;
  arealise:number;
  pas:number;
  load=true;
  Total:any;
  eventdate:any;
  constructor(private dash:DashService) {

  }
  
  ngOnInit(): void {
    this.dash.getclientNum().subscribe((rep)=>{
      this.num=rep;  

    })
    this.dash.getTotal().subscribe((rep)=>{
      this.Total=rep;  
      console.log(rep) 

    })
    this.dash.getEvent().subscribe((res)=>{
      this.eventdate=res
        });
   
    
    this.dash.getCatalogsData().then((data => {
      this.pros=data;
    })); 

    this.dash.getTache().subscribe((rep)=>{
      
      this.event=rep; 
      for(let i=0;i<3;i++){
        if(this.event[i]==null)
          this.event[i]=JSON.parse("0")
        console.log(this.event[i])
      }
      this.rea=this.event[0].TaPer;
      this.arealise=this.event[1].TaPer
      this.pas=this.event[2].TaPer
    })
 }
}
