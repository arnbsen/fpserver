import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevfpserverSharedModule } from 'app/shared';
import {
  DayTimeTableComponent,
  DayTimeTableDetailComponent,
  DayTimeTableUpdateComponent,
  DayTimeTableDeletePopupComponent,
  DayTimeTableDeleteDialogComponent,
  dayTimeTableRoute,
  dayTimeTablePopupRoute
} from './';

const ENTITY_STATES = [...dayTimeTableRoute, ...dayTimeTablePopupRoute];

@NgModule({
  imports: [DevfpserverSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DayTimeTableComponent,
    DayTimeTableDetailComponent,
    DayTimeTableUpdateComponent,
    DayTimeTableDeleteDialogComponent,
    DayTimeTableDeletePopupComponent
  ],
  entryComponents: [
    DayTimeTableComponent,
    DayTimeTableUpdateComponent,
    DayTimeTableDeleteDialogComponent,
    DayTimeTableDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevfpserverDayTimeTableModule {}
