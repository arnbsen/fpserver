import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevfpserverSharedModule } from 'app/shared';
import { RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { DevfpserverEntityModule } from '../entity.module';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { IDepartment, Department } from 'app/shared/model/department.model';
import { DepartmentService } from '../department';
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
@NgModule({
  declarations: [DashboardComponent, EditComponent, HomeComponent],
  imports: [
    CommonModule,
    DevfpserverSharedModule,
    DevfpserverEntityModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        data: {
          pageTitle: 'Adminstrator - Home',
          authorities: ['ROLE_ADMIN']
        },
        canActivate: [UserRouteAccessService],
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: DashboardComponent,
            data: {
              pageTitle: 'Adminstrator - Home',
              authorities: ['ROLE_ADMIN']
            }
          },
          {
            path: ':id/edit',
            component: EditComponent,
            resolve: {
              department: DepartmentResolve
            },
            data: {
              pageTitle: 'Department Adminstration',
              authorities: ['ROLE_ADMIN']
            },
            canActivate: [UserRouteAccessService]
          }
        ]
      }
    ])
  ]
})
export class CreatorModule {}
