import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-ajouter-event',
  templateUrl: './ajouter-event.component.html',
  styleUrls: ['./ajouter-event.component.Scss']
})
export class AjouterEventComponent implements OnInit {
  mynumber = 1;

  productForm !: FormGroup;
  actionBtn: string="save"
  constructor(private fromBuilder : FormBuilder,
    private api: ApiService ,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef :MatDialogRef<AjouterEventComponent> ) { }

  ngOnInit(): void {
  }

}
