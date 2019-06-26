import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { IHOD, HOD } from 'app/shared/model/hod.model';

import { HODService } from 'app/entities/hod';

import { Observable, of } from 'rxjs';

import { filter, map } from 'rxjs/operators';

import { HttpResponse } from '@angular/common/http';
import { IFaculty, Faculty } from 'app/shared/model/faculty.model';
import { FacultyService } from 'app/entities/faculty';
import { IStudent, Student } from 'app/shared/model/student.model';
import { StudentService } from 'app/entities/student';

@Injectable({ providedIn: 'root' })
export class HODResolve implements Resolve<IHOD> {
  constructor(private service: HODService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHOD> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<HOD>) => response.ok),
        map((hOD: HttpResponse<HOD>) => hOD.body)
      );
    }
    return of(new HOD());
  }
}
@Injectable({ providedIn: 'root' })
export class FacultyResolve implements Resolve<IFaculty> {
  constructor(private service: FacultyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFaculty> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Faculty>) => response.ok),
        map((faculty: HttpResponse<Faculty>) => faculty.body)
      );
    }
    return of(new Faculty());
  }
}
@Injectable({ providedIn: 'root' })
export class StudentResolve implements Resolve<IStudent> {
  constructor(private service: StudentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStudent> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Student>) => response.ok),
        map((student: HttpResponse<Student>) => student.body)
      );
    }
    return of(new Student());
  }
}
