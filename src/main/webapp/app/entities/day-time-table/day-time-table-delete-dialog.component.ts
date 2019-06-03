import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDayTimeTable } from 'app/shared/model/day-time-table.model';
import { DayTimeTableService } from './day-time-table.service';

@Component({
  selector: 'jhi-day-time-table-delete-dialog',
  templateUrl: './day-time-table-delete-dialog.component.html'
})
export class DayTimeTableDeleteDialogComponent {
  dayTimeTable: IDayTimeTable;

  constructor(
    protected dayTimeTableService: DayTimeTableService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.dayTimeTableService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'dayTimeTableListModification',
        content: 'Deleted an dayTimeTable'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-day-time-table-delete-popup',
  template: ''
})
export class DayTimeTableDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dayTimeTable }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DayTimeTableDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.dayTimeTable = dayTimeTable;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/day-time-table', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/day-time-table', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
