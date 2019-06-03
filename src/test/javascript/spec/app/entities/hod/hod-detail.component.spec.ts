/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DevfpserverTestModule } from '../../../test.module';
import { HODDetailComponent } from 'app/entities/hod/hod-detail.component';
import { HOD } from 'app/shared/model/hod.model';

describe('Component Tests', () => {
  describe('HOD Management Detail Component', () => {
    let comp: HODDetailComponent;
    let fixture: ComponentFixture<HODDetailComponent>;
    const route = ({ data: of({ hOD: new HOD('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [HODDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HODDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HODDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.hOD).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
