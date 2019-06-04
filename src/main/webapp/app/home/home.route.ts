import { Route, Routes } from '@angular/router';

import { HomeComponent } from './';
import { JhiLoginModalComponent } from 'app/shared';
import { UserRouteAccessService } from 'app/core';

export const HOME_ROUTE: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: JhiLoginModalComponent,
    data: {
      pageTitle: 'STCET AUTOMATED ATTENDANCE '
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      pageTitle: 'STCET AUTOMATED ATTENDANCE ',
      authorities: ['ROLE_USER']
    },
    canActivate: [UserRouteAccessService]
  }
];
