import { Routes } from '@angular/router';

import { ErrorComponent } from './error.component';

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
    redirectTo: 'login',
    data: {
      authorities: [],
      pageTitle: 'devfpserver',
      error403: true
    }
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'devfpserver',
      error404: true
    }
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
