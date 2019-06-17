import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BiometricBackup } from 'app/shared/model/biometric-backup.model';
import { BiometricBackupService } from './biometric-backup.service';
import { BiometricBackupComponent } from './biometric-backup.component';
import { BiometricBackupDetailComponent } from './biometric-backup-detail.component';
import { BiometricBackupUpdateComponent } from './biometric-backup-update.component';
import { BiometricBackupDeletePopupComponent } from './biometric-backup-delete-dialog.component';
import { IBiometricBackup } from 'app/shared/model/biometric-backup.model';

@Injectable({ providedIn: 'root' })
export class BiometricBackupResolve implements Resolve<IBiometricBackup> {
  constructor(private service: BiometricBackupService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBiometricBackup> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<BiometricBackup>) => response.ok),
        map((biometricBackup: HttpResponse<BiometricBackup>) => biometricBackup.body)
      );
    }
    return of(new BiometricBackup());
  }
}

export const biometricBackupRoute: Routes = [
  {
    path: '',
    component: BiometricBackupComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BiometricBackups'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BiometricBackupDetailComponent,
    resolve: {
      biometricBackup: BiometricBackupResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BiometricBackups'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BiometricBackupUpdateComponent,
    resolve: {
      biometricBackup: BiometricBackupResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BiometricBackups'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BiometricBackupUpdateComponent,
    resolve: {
      biometricBackup: BiometricBackupResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BiometricBackups'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const biometricBackupPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: BiometricBackupDeletePopupComponent,
    resolve: {
      biometricBackup: BiometricBackupResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BiometricBackups'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
