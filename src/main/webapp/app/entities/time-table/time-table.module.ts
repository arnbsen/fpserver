import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevfpserverSharedModule } from 'app/shared';
import {
  TimeTableComponent,
  TimeTableDetailComponent,
  TimeTableUpdateComponent,
  TimeTableDeletePopupComponent,
  TimeTableDeleteDialogComponent,
  timeTableRoute,
  timeTablePopupRoute
} from './';

const ENTITY_STATES = [...timeTableRoute, ...timeTablePopupRoute];

@NgModule({
  imports: [DevfpserverSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TimeTableComponent,
    TimeTableDetailComponent,
    TimeTableUpdateComponent,
    TimeTableDeleteDialogComponent,
    TimeTableDeletePopupComponent
  ],
  entryComponents: [TimeTableComponent, TimeTableUpdateComponent, TimeTableDeleteDialogComponent, TimeTableDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevfpserverTimeTableModule {}
