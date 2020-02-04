import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { AccountService } from 'app/core';
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

  constructor(private accountService: AccountService) {}

  setUserParams(userParam: UserParams) {
    sessionStorage.setItem('userParam', JSON.stringify(userParam));
  }

  getUserParams(): UserParams {
    return JSON.parse(sessionStorage.getItem('userParam'));
  }

  setstudentDetails(userParam: StudentDetails) {
    sessionStorage.setItem('studentParam', JSON.stringify(userParam));
  }

  getstudentDetails(): StudentDetails {
    return JSON.parse(sessionStorage.getItem('studentParam'));
  }
}
