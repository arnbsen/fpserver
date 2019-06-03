/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DevfpserverTestModule } from '../../../test.module';
import { SubjectTimeTableComponent } from 'app/entities/subject-time-table/subject-time-table.component';
import { SubjectTimeTableService } from 'app/entities/subject-time-table/subject-time-table.service';
import { SubjectTimeTable } from 'app/shared/model/subject-time-table.model';

describe('Component Tests', () => {
  describe('SubjectTimeTable Management Component', () => {
    let comp: SubjectTimeTableComponent;
    let fixture: ComponentFixture<SubjectTimeTableComponent>;
    let service: SubjectTimeTableService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [SubjectTimeTableComponent],
        providers: []
      })
        .overrideTemplate(SubjectTimeTableComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubjectTimeTableComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubjectTimeTableService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SubjectTimeTable('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.subjectTimeTables[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
