import { Routes } from '@angular/router';
import { EventClientComponent } from './client/event-client/event-client.component';
import { TableClientComponent } from './client/table-client/table-client.component';
import { AddEventComponent } from './event/add-event/add-event.component';
import { TableComponent } from './event/table/table.component';
import { AjouterProspectComponent } from './prospect/ajouter-prospect/ajouter-prospect.component';
import { EventProspectComponent } from './prospect/event-prospect/event-prospect.component';
import { TableProspectComponent } from './prospect/table-prospect/table-prospect.component';
import { AjouterStockComponent } from './stock/ajouter-stock/ajouter-stock.component';
import { StockComponent } from './stock/stock.component';
import { TableDevisComponent } from './vente/table-devis/table-devis.component';
import { VenteComponent } from './vente/vente.component';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  },
  {
       path: 'vente', // <= Page URL
       component: VenteComponent // <= Page component registration
  },
  {
      path:'liste-devis',
      component:TableDevisComponent
  },
  {
       path: 'stock', // <= Page URL
       component: StockComponent // <= Page component registration
  },
  {
       path: 'ajouterStock', // <= Page URL
       component: AjouterStockComponent // <= Page component registration
  },
  {
       path: 'prospect', // <= Page URL
       component: TableProspectComponent

  },
  {
       path: 'ajouterProspect', // <= Page URL
       component: AjouterProspectComponent

  },

  {
       path: 'event', // <= Page URL
       component: TableComponent // <= Page component registration
  },
  {
       path: 'ajouterevent', // <= Page URL
       component: AddEventComponent // <= Page component registration
  },
  {
    path: 'client',
    component: TableClientComponent
  },
  {
    path: 'client/:TIERS/details', component:EventClientComponent,

  },
  {
    path:'Prospect/:TI/details', component:EventProspectComponent

  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
