import { Route, Routes } from '@angular/router';

import { HomeComponent } from './';
import { JhiLoginModalComponent } from 'app/shared';
import { UserRouteAccessService } from 'app/core';
import { AuthenticationCheckComponent } from 'app/layouts/authentication-check/authentication-check.component';

export const HOME_ROUTE: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AuthenticationCheckComponent,
    data: {
      pageTitle: 'Loading...'
    }
  },
  {
    path: 'login',
    component: JhiLoginModalComponent,
    data: {
      pageTitle: 'LOGIN',
      authorities: []
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
