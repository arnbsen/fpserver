/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DevfpserverTestModule } from '../../../test.module';
import { DayTimeTableDeleteDialogComponent } from 'app/entities/day-time-table/day-time-table-delete-dialog.component';
import { DayTimeTableService } from 'app/entities/day-time-table/day-time-table.service';

describe('Component Tests', () => {
  describe('DayTimeTable Management Delete Component', () => {
    let comp: DayTimeTableDeleteDialogComponent;
    let fixture: ComponentFixture<DayTimeTableDeleteDialogComponent>;
    let service: DayTimeTableService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [DayTimeTableDeleteDialogComponent]
      })
        .overrideTemplate(DayTimeTableDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DayTimeTableDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DayTimeTableService);
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
