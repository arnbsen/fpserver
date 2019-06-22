import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SpecialOccasions } from 'app/shared/model/special-occasions.model';
import { SpecialOccasionsService } from './special-occasions.service';
import { SpecialOccasionsComponent } from './special-occasions.component';
import { SpecialOccasionsDetailComponent } from './special-occasions-detail.component';
import { SpecialOccasionsUpdateComponent } from './special-occasions-update.component';
import { SpecialOccasionsDeletePopupComponent } from './special-occasions-delete-dialog.component';
import { ISpecialOccasions } from 'app/shared/model/special-occasions.model';
import { AcademicSessionResolve } from '../academic-session';

@Injectable({ providedIn: 'root' })
export class SpecialOccasionsResolve implements Resolve<ISpecialOccasions> {
  constructor(private service: SpecialOccasionsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISpecialOccasions> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SpecialOccasions>) => response.ok),
        map((specialOccasions: HttpResponse<SpecialOccasions>) => specialOccasions.body)
      );
    }
    return of(new SpecialOccasions());
  }
}

export const specialOccasionsRoute: Routes = [
  {
    path: '',
    component: SpecialOccasionsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SpecialOccasions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'view',
    component: SpecialOccasionsDetailComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SpecialOccasions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SpecialOccasionsUpdateComponent,
    resolve: {
      specialOccasions: SpecialOccasionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SpecialOccasions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SpecialOccasionsUpdateComponent,
    resolve: {
      specialOccasions: SpecialOccasionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SpecialOccasions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'admin/:id/edit',
    component: SpecialOccasionsComponent,
    resolve: {
      academicSession: AcademicSessionResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'Administrator - Special Occasions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const specialOccasionsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SpecialOccasionsDeletePopupComponent,
    resolve: {
      specialOccasions: SpecialOccasionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SpecialOccasions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
