import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevfpserverSharedModule } from 'app/shared';
import {
  IntermdiateUserComponent,
  IntermdiateUserDetailComponent,
  IntermdiateUserUpdateComponent,
  IntermdiateUserDeletePopupComponent,
  IntermdiateUserDeleteDialogComponent,
  intermdiateUserRoute,
  intermdiateUserPopupRoute
} from './';

const ENTITY_STATES = [...intermdiateUserRoute, ...intermdiateUserPopupRoute];

@NgModule({
  imports: [DevfpserverSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    IntermdiateUserComponent,
    IntermdiateUserDetailComponent,
    IntermdiateUserUpdateComponent,
    IntermdiateUserDeleteDialogComponent,
    IntermdiateUserDeletePopupComponent
  ],
  entryComponents: [
    IntermdiateUserComponent,
    IntermdiateUserUpdateComponent,
    IntermdiateUserDeleteDialogComponent,
    IntermdiateUserDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevfpserverIntermdiateUserModule {}
