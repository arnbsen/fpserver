import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevfpserverSharedModule } from 'app/shared';
import {
  HODComponent,
  HODDetailComponent,
  HODUpdateComponent,
  HODDeletePopupComponent,
  HODDeleteDialogComponent,
  hODRoute,
  hODPopupRoute
} from './';

const ENTITY_STATES = [...hODRoute, ...hODPopupRoute];

@NgModule({
  imports: [DevfpserverSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [HODComponent, HODDetailComponent, HODUpdateComponent, HODDeleteDialogComponent, HODDeletePopupComponent],
  entryComponents: [HODComponent, HODUpdateComponent, HODDeleteDialogComponent, HODDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevfpserverHODModule {}
