import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevfpserverSharedModule } from 'app/shared';
import {
  AcademicSessionComponent,
  AcademicSessionDetailComponent,
  AcademicSessionUpdateComponent,
  AcademicSessionDeletePopupComponent,
  AcademicSessionDeleteDialogComponent,
  academicSessionRoute,
  academicSessionPopupRoute
} from './';

const ENTITY_STATES = [...academicSessionRoute, ...academicSessionPopupRoute];

@NgModule({
  imports: [DevfpserverSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AcademicSessionComponent,
    AcademicSessionDetailComponent,
    AcademicSessionUpdateComponent,
    AcademicSessionDeleteDialogComponent,
    AcademicSessionDeletePopupComponent
  ],
  entryComponents: [
    AcademicSessionComponent,
    AcademicSessionUpdateComponent,
    AcademicSessionDeleteDialogComponent,
    AcademicSessionDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevfpserverAcademicSessionModule {}
