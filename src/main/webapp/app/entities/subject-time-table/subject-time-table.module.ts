import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevfpserverSharedModule } from 'app/shared';
import {
  SubjectTimeTableComponent,
  SubjectTimeTableDetailComponent,
  SubjectTimeTableUpdateComponent,
  SubjectTimeTableDeletePopupComponent,
  SubjectTimeTableDeleteDialogComponent,
  subjectTimeTableRoute,
  subjectTimeTablePopupRoute
} from './';

const ENTITY_STATES = [...subjectTimeTableRoute, ...subjectTimeTablePopupRoute];

@NgModule({
  imports: [DevfpserverSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SubjectTimeTableComponent,
    SubjectTimeTableDetailComponent,
    SubjectTimeTableUpdateComponent,
    SubjectTimeTableDeleteDialogComponent,
    SubjectTimeTableDeletePopupComponent
  ],
  entryComponents: [
    SubjectTimeTableComponent,
    SubjectTimeTableUpdateComponent,
    SubjectTimeTableDeleteDialogComponent,
    SubjectTimeTableDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevfpserverSubjectTimeTableModule {}
