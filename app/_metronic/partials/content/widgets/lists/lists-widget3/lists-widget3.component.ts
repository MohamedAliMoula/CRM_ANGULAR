import { Component, OnInit } from '@angular/core';
import { DashService } from 'src/app/pages/service/dash.service';

@Component({
  selector: 'app-lists-widget3',
  templateUrl: './lists-widget3.component.html',
})
export class ListsWidget3Component implements OnInit {
  event:any;
  constructor(private dash :DashService) {}
  ngOnInit(): void {
    this.dash.getEvent().subscribe((res)=>{
      this.event=res
      console.log(this.event)
        });
  }
}
