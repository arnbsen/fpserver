/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DevfpserverTestModule } from '../../../test.module';
import { IntermdiateUserComponent } from 'app/entities/intermdiate-user/intermdiate-user.component';
import { IntermdiateUserService } from 'app/entities/intermdiate-user/intermdiate-user.service';
import { IntermdiateUser } from 'app/shared/model/intermdiate-user.model';

describe('Component Tests', () => {
  describe('IntermdiateUser Management Component', () => {
    let comp: IntermdiateUserComponent;
    let fixture: ComponentFixture<IntermdiateUserComponent>;
    let service: IntermdiateUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DevfpserverTestModule],
        declarations: [IntermdiateUserComponent],
        providers: []
      })
        .overrideTemplate(IntermdiateUserComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IntermdiateUserComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IntermdiateUserService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new IntermdiateUser('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.intermdiateUsers[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
