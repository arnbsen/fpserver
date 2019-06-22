import { Route, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { SettingsComponent } from './settings.component';
import { HODResolve } from 'app/entities/hod';
import { FacultyResolve } from 'app/entities/faculty';
import { StudentResolve } from 'app/entities/student';

export const settingsRoute: Routes = [
  {
    path: 'settings/student/:id',
    component: SettingsComponent,
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
    component: SettingsComponent,
    resolve: {
      data: HODResolve
    },
    data: {
      authorities: ['ROLE_HOD'],
      pageTitle: 'Account - Settings'
    },
    canActivate: [UserRouteAccessService]
  }
];
