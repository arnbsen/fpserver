/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DevfpserverTestModule } from '../../../test.module';
import { DayTimeTableComponent } from 'app/entities/day-time-table/day-time-table.component';
import { DayTimeTableService } from 'app/entities/day-time-table/day-time-table.service';
import { DayTimeTable } from 'app/shared/model/day-time-table.model';

describe('Component Tests', () => {
  describe('DayTimeTable Management Component', () => {
    let comp: DayTimeTableComponent;
    let fixture: ComponentFixture<DayTimeTableComponent>;
    let service: DayTimeTableService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [DayTimeTableComponent],
        providers: []
      })
        .overrideTemplate(DayTimeTableComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DayTimeTableComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DayTimeTableService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DayTimeTable('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.dayTimeTables[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
