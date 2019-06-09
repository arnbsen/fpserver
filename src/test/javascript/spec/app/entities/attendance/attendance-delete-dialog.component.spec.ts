/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DevfpserverTestModule } from '../../../test.module';
import { AttendanceDeleteDialogComponent } from 'app/entities/attendance/attendance-delete-dialog.component';
import { AttendanceService } from 'app/entities/attendance/attendance.service';

describe('Component Tests', () => {
  describe('Attendance Management Delete Component', () => {
    let comp: AttendanceDeleteDialogComponent;
    let fixture: ComponentFixture<AttendanceDeleteDialogComponent>;
    let service: AttendanceService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [AttendanceDeleteDialogComponent]
      })
        .overrideTemplate(AttendanceDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AttendanceDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AttendanceService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
