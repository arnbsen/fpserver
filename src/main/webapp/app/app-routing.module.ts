import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { HOME_ROUTE } from './home';
import { ActivateComponent } from './account';
import { AuthenticationCheckComponent } from './layouts/authentication-check/authentication-check.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'system',
          loadChildren: './admin/admin.module#DevfpserverAdminModule'
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED, useHash: true }
    )
  ],
  exports: [RouterModule]
})
export class DevfpserverAppRoutingModule {}
