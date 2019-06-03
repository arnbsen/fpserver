/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { DevfpserverTestModule } from '../../../test.module';
import { TimeTableUpdateComponent } from 'app/entities/time-table/time-table-update.component';
import { TimeTableService } from 'app/entities/time-table/time-table.service';
import { TimeTable } from 'app/shared/model/time-table.model';

describe('Component Tests', () => {
  describe('TimeTable Management Update Component', () => {
    let comp: TimeTableUpdateComponent;
    let fixture: ComponentFixture<TimeTableUpdateComponent>;
    let service: TimeTableService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [TimeTableUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TimeTableUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TimeTableUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TimeTableService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TimeTable('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TimeTable();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
