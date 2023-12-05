import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AjouterEventComponent } from '../../event/ajouter-event/ajouter-event.component';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.scss']
})
export class DetailsClientComponent implements OnInit {

  constructor(private fromBuilder : FormBuilder,
    private api: ApiService ,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef :MatDialogRef<AjouterEventComponent> ) { }

  ngOnInit(): void {
  }

}
