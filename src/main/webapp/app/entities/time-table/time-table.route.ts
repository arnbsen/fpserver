import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TimeTable } from 'app/shared/model/time-table.model';
import { TimeTableService } from './time-table.service';
import { TimeTableComponent } from './time-table.component';
import { TimeTableDetailComponent } from './time-table-detail.component';
import { TimeTableUpdateComponent } from './time-table-update.component';
import { TimeTableDeletePopupComponent } from './time-table-delete-dialog.component';
import { ITimeTable } from 'app/shared/model/time-table.model';
import { DepartmentResolve } from '../department';

@Injectable({ providedIn: 'root' })
export class TimeTableResolve implements Resolve<ITimeTable> {
  constructor(private service: TimeTableService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITimeTable> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TimeTable>) => response.ok),
        map((timeTable: HttpResponse<TimeTable>) => timeTable.body)
      );
    }
    return of(new TimeTable());
  }
}

export const timeTableRoute: Routes = [
  {
    path: '',
    component: TimeTableComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TimeTables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TimeTableDetailComponent,
    resolve: {
      timeTable: TimeTableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TimeTables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TimeTableUpdateComponent,
    resolve: {
      timeTable: TimeTableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TimeTables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TimeTableUpdateComponent,
    resolve: {
      timeTable: TimeTableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TimeTables'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/:year/:sem/view',
    component: TimeTableComponent,
    resolve: {
      department: DepartmentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Time Table - View'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const timeTablePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TimeTableDeletePopupComponent,
    resolve: {
      timeTable: TimeTableResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TimeTables'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
