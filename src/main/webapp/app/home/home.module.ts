import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevfpserverSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { DevfpserverEntityModule } from 'app/entities/entity.module';
import { DevfpserverFacultyModule } from 'app/entities/faculty/faculty.module';
import { DevfpserverHODModule } from 'app/entities/hod/hod.module';

@NgModule({
  imports: [
    DevfpserverSharedModule,
    DevfpserverEntityModule,
    DevfpserverFacultyModule,
    DevfpserverHODModule,
    RouterModule.forChild(HOME_ROUTE)
  ],
  declarations: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevfpserverHomeModule {}
