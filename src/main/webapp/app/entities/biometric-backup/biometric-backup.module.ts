import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevfpserverSharedModule } from 'app/shared';
import {
  BiometricBackupComponent,
  BiometricBackupDetailComponent,
  BiometricBackupUpdateComponent,
  BiometricBackupDeletePopupComponent,
  BiometricBackupDeleteDialogComponent,
  biometricBackupRoute,
  biometricBackupPopupRoute
} from './';

const ENTITY_STATES = [...biometricBackupRoute, ...biometricBackupPopupRoute];

@NgModule({
  imports: [DevfpserverSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    BiometricBackupComponent,
    BiometricBackupDetailComponent,
    BiometricBackupUpdateComponent,
    BiometricBackupDeleteDialogComponent,
    BiometricBackupDeletePopupComponent
  ],
  entryComponents: [
    BiometricBackupComponent,
    BiometricBackupUpdateComponent,
    BiometricBackupDeleteDialogComponent,
    BiometricBackupDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevfpserverBiometricBackupModule {}
