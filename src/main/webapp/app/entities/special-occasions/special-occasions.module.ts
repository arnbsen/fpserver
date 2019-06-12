import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevfpserverSharedModule } from 'app/shared';
import {
  SpecialOccasionsComponent,
  SpecialOccasionsDetailComponent,
  SpecialOccasionsUpdateComponent,
  SpecialOccasionsDeletePopupComponent,
  SpecialOccasionsDeleteDialogComponent,
  specialOccasionsRoute,
  specialOccasionsPopupRoute
} from './';

const ENTITY_STATES = [...specialOccasionsRoute, ...specialOccasionsPopupRoute];

@NgModule({
  imports: [DevfpserverSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SpecialOccasionsComponent,
    SpecialOccasionsDetailComponent,
    SpecialOccasionsUpdateComponent,
    SpecialOccasionsDeleteDialogComponent,
    SpecialOccasionsDeletePopupComponent
  ],
  entryComponents: [
    SpecialOccasionsComponent,
    SpecialOccasionsUpdateComponent,
    SpecialOccasionsDeleteDialogComponent,
    SpecialOccasionsDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevfpserverSpecialOccasionsModule {}
