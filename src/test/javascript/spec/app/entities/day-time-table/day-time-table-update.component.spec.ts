/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { DevfpserverTestModule } from '../../../test.module';
import { DayTimeTableUpdateComponent } from 'app/entities/day-time-table/day-time-table-update.component';
import { DayTimeTableService } from 'app/entities/day-time-table/day-time-table.service';
import { DayTimeTable } from 'app/shared/model/day-time-table.model';

describe('Component Tests', () => {
  describe('DayTimeTable Management Update Component', () => {
    let comp: DayTimeTableUpdateComponent;
    let fixture: ComponentFixture<DayTimeTableUpdateComponent>;
    let service: DayTimeTableService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [DayTimeTableUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DayTimeTableUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DayTimeTableUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DayTimeTableService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DayTimeTable('123');
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
        const entity = new DayTimeTable();
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
