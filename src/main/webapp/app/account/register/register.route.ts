import { Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { RegisterComponent } from './register.component';
import { Injectable } from '@angular/core';
import { IDepartment, Department } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class DepartmentResolve implements Resolve<IDepartment> {
  constructor(private service: DepartmentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDepartment> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Department>) => response.ok),
        map((department: HttpResponse<Department>) => department.body)
      );
    }
    return of(new Department());
  }
}
export const registerRoute: Routes = [
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
    data: {
      authorities: [],
      pageTitle: 'Registration'
    }
  },
  {
    path: 'register/:id/hod',
    component: RegisterComponent,
    resolve: {
      data: DepartmentResolve
    },
    data: {
      authorities: [],
      pageTitle: 'Registration - HOD'
    }
  },
  {
    path: 'register/:id/student',
    component: RegisterComponent,
    resolve: {
      data: DepartmentResolve
    },
    data: {
      authorities: [],
      pageTitle: 'Registration - Student'
    }
  },
  {
    path: 'register/:id/faculty',
    component: RegisterComponent,
    resolve: {
      data: DepartmentResolve
    },
    data: {
      authorities: [],
      pageTitle: 'Registration - Faculty'
    }
  }
];
