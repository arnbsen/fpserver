import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SubjectTimeTable } from 'app/shared/model/subject-time-table.model';
import { SubjectTimeTableService } from './subject-time-table.service';
import { SubjectTimeTableComponent } from './subject-time-table.component';
import { SubjectTimeTableDetailComponent } from './subject-time-table-detail.component';
import { SubjectTimeTableUpdateComponent } from './subject-time-table-update.component';
import { SubjectTimeTableDeletePopupComponent } from './subject-time-table-delete-dialog.component';
import { ISubjectTimeTable } from 'app/shared/model/subject-time-table.model';

@Injectable({ providedIn: 'root' })
export class SubjectTimeTableResolve implements Resolve<ISubjectTimeTable> {
  constructor(private service: SubjectTimeTableService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISubjectTimeTable> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SubjectTimeTable>) => response.ok),
        map((subjectTimeTable: HttpResponse<SubjectTimeTable>) => subjectTimeTable.body)
      );
    }
    return of(new SubjectTimeTable());
  }
}

export const subjectTimeTableRoute: Routes = [
  {
    path: '',
    component: SubjectTimeTableComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SubjectTimeTables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SubjectTimeTableDetailComponent,
    resolve: {
      subjectTimeTable: SubjectTimeTableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SubjectTimeTables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SubjectTimeTableUpdateComponent,
    resolve: {
      subjectTimeTable: SubjectTimeTableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SubjectTimeTables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SubjectTimeTableUpdateComponent,
    resolve: {
      subjectTimeTable: SubjectTimeTableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SubjectTimeTables'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const subjectTimeTablePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SubjectTimeTableDeletePopupComponent,
    resolve: {
      subjectTimeTable: SubjectTimeTableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SubjectTimeTables'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
