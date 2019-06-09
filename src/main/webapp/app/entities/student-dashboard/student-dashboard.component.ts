import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from '../student/student.service';
import { HttpResponse } from '@angular/common/http';
import { DepartmentService } from '../department';
import { IDepartment } from 'app/shared/model/department.model';
import { getNumberOfCurrencyDigits } from '@angular/common';

@Component({
  selector: 'jhi-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student.dashboard.scss']
})
export class StudentDashboardComponent implements OnInit {
  account: Account;
  student: IStudent;
  department: IDepartment;
  subject = [
    { subjectName: 'Subject 1', percentage: 70 },
    { subjectName: 'Subject 2', percentage: 80 },
    { subjectName: 'Subject 3', percentage: 50 },
    { subjectName: 'Subject 4', percentage: 20 }
  ];

  constructor(
    private accountService: AccountService,
    private studentService: StudentService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
      console.log(this.account);
    });
    this.studentService.find('5cfc17782a70bd0004f848c0').subscribe((res: HttpResponse<IStudent>) => {
      this.student = res.body;
    });
    this.departmentService.find('	5cf522559c6dc500048c8d28').subscribe((res: HttpResponse<IDepartment>) => {
      this.department = res.body;
    });
  }
  getNumber(num: string): number {
    return Number(num);
  }
  getColor(num: string): string {
    const check = Number(num);
    return check <= 30 ? 'warn' : check <= 50 ? 'accent' : 'primary';
  }
}
