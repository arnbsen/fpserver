import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AcademicSession } from 'app/shared/model/academic-session.model';
import { AcademicSessionService } from './academic-session.service';
import { AcademicSessionComponent } from './academic-session.component';
import { AcademicSessionDetailComponent } from './academic-session-detail.component';
import { AcademicSessionUpdateComponent } from './academic-session-update.component';
import { AcademicSessionDeletePopupComponent } from './academic-session-delete-dialog.component';
import { IAcademicSession } from 'app/shared/model/academic-session.model';

@Injectable({ providedIn: 'root' })
export class AcademicSessionResolve implements Resolve<IAcademicSession> {
  constructor(private service: AcademicSessionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAcademicSession> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AcademicSession>) => response.ok),
        map((academicSession: HttpResponse<AcademicSession>) => academicSession.body)
      );
    }
    return of(new AcademicSession());
  }
}

export const academicSessionRoute: Routes = [
  {
    path: '',
    component: AcademicSessionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AcademicSessions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AcademicSessionDetailComponent,
    resolve: {
      academicSession: AcademicSessionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AcademicSessions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AcademicSessionUpdateComponent,
    resolve: {
      academicSession: AcademicSessionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AcademicSessions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AcademicSessionUpdateComponent,
    resolve: {
      academicSession: AcademicSessionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AcademicSessions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const academicSessionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AcademicSessionDeletePopupComponent,
    resolve: {
      academicSession: AcademicSessionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AcademicSessions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
