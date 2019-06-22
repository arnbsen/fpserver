import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
interface UserParams {
  id?: string;
  role?: string;
}
interface StudentDetails {
  year?: number;
  semester?: number;
  department?: string;
}
@Injectable({ providedIn: 'root' })
export class ToolbarService {
  userParams: UserParams;
  studentParams: StudentDetails;
  userParamsObs = new Subject<UserParams>();
  studentParamsObs = new Subject<StudentDetails>();

  setUserParams(userParam: UserParams) {
    this.userParams = userParam;
    this.userParamsObs.next(userParam);
  }

  getUserParams(): Observable<any> {
    if (this.userParams) {
      return new BehaviorSubject<UserParams>(this.userParams);
    } else {
      return this.userParamsObs.asObservable();
    }
  }

  setstudentDetails(userParam: StudentDetails) {
    this.studentParams = userParam;
    this.studentParamsObs.next(userParam);
  }

  getstudentDetails(): Observable<any> {
    if (this.studentParams) {
      return new BehaviorSubject<StudentDetails>(this.studentParams);
    } else {
      return this.studentParamsObs.asObservable();
    }
  }
}
