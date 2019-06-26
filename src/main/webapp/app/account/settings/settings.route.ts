import { Route, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { SettingsComponent } from './settings.component';
import { StudentResolve, FacultyResolve, HODResolve } from './entity.resolver';

export const settingsRoute: Routes = [
  {
    path: 'settings/student/:id',
    component: SettingsComponent,
    pathMatch: 'full',
    resolve: {
      data: StudentResolve
    },
    data: {
      authorities: ['ROLE_STUDENT'],
      pageTitle: 'Account - Settings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'settings/faculty/:id',
    pathMatch: 'full',
    component: SettingsComponent,
    resolve: {
      data: FacultyResolve
    },
    data: {
      authorities: ['ROLE_FACULTY'],
      pageTitle: 'Account - Settings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'settings/hod/:id',
    pathMatch: 'full',
    component: SettingsComponent,
    resolve: {
      data: HODResolve
    },
    data: {
      authorities: ['ROLE_HOD'],
      pageTitle: 'Account - Settings'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'settings/admin',
    component: SettingsComponent,
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'Account - Settings'
    },
    canActivate: [UserRouteAccessService]
  }
];
