import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DayTimeTable } from 'app/shared/model/day-time-table.model';
import { DayTimeTableService } from './day-time-table.service';
import { DayTimeTableComponent } from './day-time-table.component';
import { DayTimeTableDetailComponent } from './day-time-table-detail.component';
import { DayTimeTableUpdateComponent } from './day-time-table-update.component';
import { DayTimeTableDeletePopupComponent } from './day-time-table-delete-dialog.component';
import { IDayTimeTable } from 'app/shared/model/day-time-table.model';

@Injectable({ providedIn: 'root' })
export class DayTimeTableResolve implements Resolve<IDayTimeTable> {
  constructor(private service: DayTimeTableService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDayTimeTable> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DayTimeTable>) => response.ok),
        map((dayTimeTable: HttpResponse<DayTimeTable>) => dayTimeTable.body)
      );
    }
    return of(new DayTimeTable());
  }
}

export const dayTimeTableRoute: Routes = [
  {
    path: '',
    component: DayTimeTableComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DayTimeTables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DayTimeTableDetailComponent,
    resolve: {
      dayTimeTable: DayTimeTableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DayTimeTables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DayTimeTableUpdateComponent,
    resolve: {
      dayTimeTable: DayTimeTableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DayTimeTables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DayTimeTableUpdateComponent,
    resolve: {
      dayTimeTable: DayTimeTableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DayTimeTables'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const dayTimeTablePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DayTimeTableDeletePopupComponent,
    resolve: {
      dayTimeTable: DayTimeTableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'DayTimeTables'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
