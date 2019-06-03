import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HOD } from 'app/shared/model/hod.model';
import { HODService } from './hod.service';
import { HODComponent } from './hod.component';
import { HODDetailComponent } from './hod-detail.component';
import { HODUpdateComponent } from './hod-update.component';
import { HODDeletePopupComponent } from './hod-delete-dialog.component';
import { IHOD } from 'app/shared/model/hod.model';

@Injectable({ providedIn: 'root' })
export class HODResolve implements Resolve<IHOD> {
  constructor(private service: HODService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHOD> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<HOD>) => response.ok),
        map((hOD: HttpResponse<HOD>) => hOD.body)
      );
    }
    return of(new HOD());
  }
}

export const hODRoute: Routes = [
  {
    path: '',
    component: HODComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'HODS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HODDetailComponent,
    resolve: {
      hOD: HODResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'HODS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HODUpdateComponent,
    resolve: {
      hOD: HODResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'HODS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HODUpdateComponent,
    resolve: {
      hOD: HODResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'HODS'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const hODPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: HODDeletePopupComponent,
    resolve: {
      hOD: HODResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'HODS'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
