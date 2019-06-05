import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { HOME_ROUTE } from './home';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        ...LAYOUT_ROUTES,
        {
          path: 'admin',
          loadChildren: './admin/admin.module#DevfpserverAdminModule'
        }
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class DevfpserverAppRoutingModule {}
