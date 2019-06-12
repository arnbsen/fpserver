/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DevfpserverTestModule } from '../../../test.module';
import { AcademicSessionComponent } from 'app/entities/academic-session/academic-session.component';
import { AcademicSessionService } from 'app/entities/academic-session/academic-session.service';
import { AcademicSession } from 'app/shared/model/academic-session.model';

describe('Component Tests', () => {
  describe('AcademicSession Management Component', () => {
    let comp: AcademicSessionComponent;
    let fixture: ComponentFixture<AcademicSessionComponent>;
    let service: AcademicSessionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [AcademicSessionComponent],
        providers: []
      })
        .overrideTemplate(AcademicSessionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AcademicSessionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AcademicSessionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AcademicSession('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.academicSessions[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
