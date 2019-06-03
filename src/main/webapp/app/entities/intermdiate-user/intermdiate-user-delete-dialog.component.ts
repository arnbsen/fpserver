import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIntermdiateUser } from 'app/shared/model/intermdiate-user.model';
import { IntermdiateUserService } from './intermdiate-user.service';

@Component({
  selector: 'jhi-intermdiate-user-delete-dialog',
  templateUrl: './intermdiate-user-delete-dialog.component.html'
})
export class IntermdiateUserDeleteDialogComponent {
  intermdiateUser: IIntermdiateUser;

  constructor(
    protected intermdiateUserService: IntermdiateUserService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.intermdiateUserService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'intermdiateUserListModification',
        content: 'Deleted an intermdiateUser'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-intermdiate-user-delete-popup',
  template: ''
})
export class IntermdiateUserDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ intermdiateUser }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(IntermdiateUserDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.intermdiateUser = intermdiateUser;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/intermdiate-user', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/intermdiate-user', { outlets: { popup: null } }]);
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
