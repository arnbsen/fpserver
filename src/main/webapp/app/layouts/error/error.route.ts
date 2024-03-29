import { Routes } from '@angular/router';

import { ErrorComponent } from './error.component';
import { ActivateComponent } from 'app/account';

export const errorRoute: Routes = [
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'devfpserver'
    }
  },
  {
    path: 'accessdenied',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'Unauthorised',
      error403: true
    }
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: '404',
      error404: true
    }
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
