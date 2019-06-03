/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DevfpserverTestModule } from '../../../test.module';
import { IntermdiateUserDetailComponent } from 'app/entities/intermdiate-user/intermdiate-user-detail.component';
import { IntermdiateUser } from 'app/shared/model/intermdiate-user.model';

describe('Component Tests', () => {
  describe('IntermdiateUser Management Detail Component', () => {
    let comp: IntermdiateUserDetailComponent;
    let fixture: ComponentFixture<IntermdiateUserDetailComponent>;
    const route = ({ data: of({ intermdiateUser: new IntermdiateUser('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [IntermdiateUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(IntermdiateUserDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(IntermdiateUserDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.intermdiateUser).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
