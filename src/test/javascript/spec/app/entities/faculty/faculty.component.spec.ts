/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DevfpserverTestModule } from '../../../test.module';
import { FacultyComponent } from 'app/entities/faculty/faculty.component';
import { FacultyService } from 'app/entities/faculty/faculty.service';
import { Faculty } from 'app/shared/model/faculty.model';

describe('Component Tests', () => {
  describe('Faculty Management Component', () => {
    let comp: FacultyComponent;
    let fixture: ComponentFixture<FacultyComponent>;
    let service: FacultyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [FacultyComponent],
        providers: []
      })
        .overrideTemplate(FacultyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacultyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacultyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Faculty('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.faculties[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
