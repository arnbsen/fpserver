/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DevfpserverTestModule } from '../../../test.module';
import { SubjectTimeTableDetailComponent } from 'app/entities/subject-time-table/subject-time-table-detail.component';
import { SubjectTimeTable } from 'app/shared/model/subject-time-table.model';

describe('Component Tests', () => {
  describe('SubjectTimeTable Management Detail Component', () => {
    let comp: SubjectTimeTableDetailComponent;
    let fixture: ComponentFixture<SubjectTimeTableDetailComponent>;
    const route = ({ data: of({ subjectTimeTable: new SubjectTimeTable('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [SubjectTimeTableDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SubjectTimeTableDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubjectTimeTableDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.subjectTimeTable).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
