import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAttendance } from 'app/shared/model/attendance.model';
import { AttendanceService } from './attendance.service';

@Component({
  selector: 'jhi-attendance-delete-dialog',
  templateUrl: './attendance-delete-dialog.component.html'
})
export class AttendanceDeleteDialogComponent {
  attendance: IAttendance;

  constructor(
    protected attendanceService: AttendanceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.attendanceService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'attendanceListModification',
        content: 'Deleted an attendance'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-attendance-delete-popup',
  template: ''
})
export class AttendanceDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ attendance }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AttendanceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.attendance = attendance;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/attendance', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/attendance', { outlets: { popup: null } }]);
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
