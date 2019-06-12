import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevfpserverSharedModule } from 'app/shared';
import { RouterModule } from '@angular/router';
import { UserRouteAccessService } from 'app/core';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DevfpserverSharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        data: {
          pageTitle: 'ADMINISTRATOR',
          authorities: ['ROLE_ADMIN']
        },
        canActivate: [UserRouteAccessService],
        canActivateChild: [UserRouteAccessService]
      }
    ])
  ]
})
export class CreatorModule {}
