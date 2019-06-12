/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DevfpserverTestModule } from '../../../test.module';
import { AcademicSessionDetailComponent } from 'app/entities/academic-session/academic-session-detail.component';
import { AcademicSession } from 'app/shared/model/academic-session.model';

describe('Component Tests', () => {
  describe('AcademicSession Management Detail Component', () => {
    let comp: AcademicSessionDetailComponent;
    let fixture: ComponentFixture<AcademicSessionDetailComponent>;
    const route = ({ data: of({ academicSession: new AcademicSession('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [AcademicSessionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AcademicSessionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AcademicSessionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.academicSession).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
