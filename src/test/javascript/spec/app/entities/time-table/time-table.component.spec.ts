/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DevfpserverTestModule } from '../../../test.module';
import { TimeTableComponent } from 'app/entities/time-table/time-table.component';
import { TimeTableService } from 'app/entities/time-table/time-table.service';
import { TimeTable } from 'app/shared/model/time-table.model';

describe('Component Tests', () => {
  describe('TimeTable Management Component', () => {
    let comp: TimeTableComponent;
    let fixture: ComponentFixture<TimeTableComponent>;
    let service: TimeTableService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [TimeTableComponent],
        providers: []
      })
        .overrideTemplate(TimeTableComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TimeTableComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TimeTableService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TimeTable('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.timeTables[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
