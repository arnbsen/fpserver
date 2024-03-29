import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IBiometricBackup } from 'app/shared/model/biometric-backup.model';
import { AccountService } from 'app/core';
import { BiometricBackupService } from './biometric-backup.service';

@Component({
  selector: 'jhi-biometric-backup',
  templateUrl: './biometric-backup.component.html'
})
export class BiometricBackupComponent implements OnInit, OnDestroy {
  biometricBackups: IBiometricBackup[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected biometricBackupService: BiometricBackupService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.biometricBackupService
      .query()
      .pipe(
        filter((res: HttpResponse<IBiometricBackup[]>) => res.ok),
        map((res: HttpResponse<IBiometricBackup[]>) => res.body)
      )
      .subscribe(
        (res: IBiometricBackup[]) => {
          this.biometricBackups = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInBiometricBackups();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBiometricBackup) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInBiometricBackups() {
    this.eventSubscriber = this.eventManager.subscribe('biometricBackupListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
