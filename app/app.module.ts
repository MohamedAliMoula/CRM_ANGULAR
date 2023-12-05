import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// #fake-start#
import { VenteComponent } from './pages/vente/vente.component';
import { StockComponent } from './pages/stock/stock.component';
// #fake-end#
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './pages/service/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { TableProspectComponent } from './pages/prospect/table-prospect/table-prospect.component';
import { DialogProspectComponent } from './pages/prospect/dialog-prospect/dialog-prospect.component';
import { TableComponent } from './pages/event/table/table.component';
import { DialogeventComponent } from './pages/event/dialogevent/dialogevent.component';
import { AjouterEventComponent } from './pages/event/ajouter-event/ajouter-event.component';
import { TableClientComponent } from './pages/client/table-client/table-client.component';
import { EventProspectComponent } from './pages/prospect/event-prospect/event-prospect.component';
import { EventClientComponent } from './pages/client/event-client/event-client.component';
import { AjouterProspectComponent } from './pages/prospect/ajouter-prospect/ajouter-prospect.component';
import { TableDevisComponent } from './pages/vente/table-devis/table-devis.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AjouterStockComponent } from './pages/stock/ajouter-stock/ajouter-stock.component';
import { DetaildevisComponent } from './pages/vente/detaildevis/detaildevis.component';
import { AddEventComponent } from './pages/event/add-event/add-event.component';
import {MatSelectModule} from '@angular/material/select';
import { ModifDevisComponent } from './pages/vente/modif-devis/modif-devis.component';
import { ModifClientComponent } from './pages/client/modif-client/modif-client.component';
import {  NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [AppComponent, VenteComponent, StockComponent,LoginComponent,
    TableProspectComponent,DialogProspectComponent,
    TableComponent,DialogeventComponent,AjouterEventComponent,TableClientComponent
  ,EventProspectComponent,EventClientComponent, AjouterProspectComponent, TableDevisComponent, AjouterStockComponent, DetaildevisComponent, DetaildevisComponent, AddEventComponent, ModifDevisComponent, ModifClientComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    // #fake-start#

    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    MatDialogModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut:3000,
      progressBar:true,
      progressAnimation:'increasing',
      preventDuplicates :true,
      enableHtml: true,
    }),
    MatAutocompleteModule,
    MatSelectModule,
    NgChartsModule

  ],
  providers: [AuthService,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
