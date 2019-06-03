import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITimeTable } from 'app/shared/model/time-table.model';
import { TimeTableService } from './time-table.service';

@Component({
  selector: 'jhi-time-table-delete-dialog',
  templateUrl: './time-table-delete-dialog.component.html'
})
export class TimeTableDeleteDialogComponent {
  timeTable: ITimeTable;

  constructor(protected timeTableService: TimeTableService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.timeTableService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'timeTableListModification',
        content: 'Deleted an timeTable'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-time-table-delete-popup',
  template: ''
})
export class TimeTableDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ timeTable }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TimeTableDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.timeTable = timeTable;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/time-table', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/time-table', { outlets: { popup: null } }]);
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
