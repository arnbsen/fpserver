import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IntermdiateUser } from 'app/shared/model/intermdiate-user.model';
import { IntermdiateUserService } from './intermdiate-user.service';
import { IntermdiateUserComponent } from './intermdiate-user.component';
import { IntermdiateUserDetailComponent } from './intermdiate-user-detail.component';
import { IntermdiateUserUpdateComponent } from './intermdiate-user-update.component';
import { IntermdiateUserDeletePopupComponent } from './intermdiate-user-delete-dialog.component';
import { IIntermdiateUser } from 'app/shared/model/intermdiate-user.model';

@Injectable({ providedIn: 'root' })
export class IntermdiateUserResolve implements Resolve<IIntermdiateUser> {
  constructor(private service: IntermdiateUserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IIntermdiateUser> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<IntermdiateUser>) => response.ok),
        map((intermdiateUser: HttpResponse<IntermdiateUser>) => intermdiateUser.body)
      );
    }
    return of(new IntermdiateUser());
  }
}

export const intermdiateUserRoute: Routes = [
  {
    path: '',
    component: IntermdiateUserComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'IntermdiateUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: IntermdiateUserDetailComponent,
    resolve: {
      intermdiateUser: IntermdiateUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'IntermdiateUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: IntermdiateUserUpdateComponent,
    resolve: {
      intermdiateUser: IntermdiateUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'IntermdiateUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: IntermdiateUserUpdateComponent,
    resolve: {
      intermdiateUser: IntermdiateUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'IntermdiateUsers'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const intermdiateUserPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: IntermdiateUserDeletePopupComponent,
    resolve: {
      intermdiateUser: IntermdiateUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'IntermdiateUsers'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
