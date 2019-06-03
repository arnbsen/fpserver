/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DevfpserverTestModule } from '../../../test.module';
import { TimeTableDetailComponent } from 'app/entities/time-table/time-table-detail.component';
import { TimeTable } from 'app/shared/model/time-table.model';

describe('Component Tests', () => {
  describe('TimeTable Management Detail Component', () => {
    let comp: TimeTableDetailComponent;
    let fixture: ComponentFixture<TimeTableDetailComponent>;
    const route = ({ data: of({ timeTable: new TimeTable('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [TimeTableDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TimeTableDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TimeTableDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.timeTable).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
