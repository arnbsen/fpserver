/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DevfpserverTestModule } from '../../../test.module';
import { TimeTableDeleteDialogComponent } from 'app/entities/time-table/time-table-delete-dialog.component';
import { TimeTableService } from 'app/entities/time-table/time-table.service';

describe('Component Tests', () => {
  describe('TimeTable Management Delete Component', () => {
    let comp: TimeTableDeleteDialogComponent;
    let fixture: ComponentFixture<TimeTableDeleteDialogComponent>;
    let service: TimeTableService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [TimeTableDeleteDialogComponent]
      })
        .overrideTemplate(TimeTableDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TimeTableDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TimeTableService);
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
