import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevfpserverSharedModule } from 'app/shared';
import {
  AttendanceComponent,
  AttendanceDetailComponent,
  AttendanceUpdateComponent,
  AttendanceDeletePopupComponent,
  AttendanceDeleteDialogComponent,
  attendanceRoute,
  attendancePopupRoute
} from './';

const ENTITY_STATES = [...attendanceRoute, ...attendancePopupRoute];

@NgModule({
  imports: [DevfpserverSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AttendanceComponent,
    AttendanceDetailComponent,
    AttendanceUpdateComponent,
    AttendanceDeleteDialogComponent,
    AttendanceDeletePopupComponent
  ],
  entryComponents: [AttendanceComponent, AttendanceUpdateComponent, AttendanceDeleteDialogComponent, AttendanceDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevfpserverAttendanceModule {}
