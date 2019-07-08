import { Component, OnInit } from '@angular/core';
import { IDepartment } from 'app/shared/model/department.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from 'app/entities/subject';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FacultyService } from 'app/entities/faculty';
import { IFaculty, OFaculty } from 'app/shared/model/faculty.model';
import { DepartmentService } from 'app/entities/department';
import { Observable, Subscription } from 'rxjs';
import { HODService } from 'app/entities/hod';
import { IHOD } from 'app/shared/model/hod.model';
import { MatSnackBar } from '@angular/material';
import { IAttendance } from 'app/shared/model/attendance.model';
import { IStudentCalc } from 'app/shared/model/studentcalc.model';
import { IStudent } from 'app/shared/model/student.model';
import { ToolbarService } from 'app/shared/toolbar/toolbar.service';
import { CalcService } from 'app/shared/calculator.service';
import { StudentService } from 'app/entities/student';
import { ActivateService } from 'app/account';
import { UserService } from 'app/core';

@Component({
  selector: 'jhi-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent implements OnInit {
  department: IDepartment;
  subjects: ISubject[];
  faculties: IFaculty[];
  departments: IDepartment[];
  subject: ISubject;
  hod: IHOD;
  isSubjectCreationSaving = false;

  // Department Specific Actions - Variables
  oFaculties: OFaculty[];
  attendances: IAttendance[];
  subd: any;
  sub: IStudentCalc;
  faculty: IFaculty;
  hODS: any;
  currentAccount: Account;
  eventSubscriber: Subscription;
  userParams: { id?: string; role?: string } = {};
  choosenSubject: ISubject;
  students: IStudent[];
  choosenStudent: IStudent;
  studd: any;
  studSubject: any[] = [];
  choosenSubBool = false;
  choosenStudBool = false;
  loadOver = false;
  year: number;
  sem: number;
  loadOverSelf = false;
  selectedRollNo = false;

  choosenFaculty: OFaculty | IHOD;
  facAttendance: IStudentCalc;
  facAttendanceDisplay: any;
  loadOverFac = false;
  choosenFacBool = false;

  subjectForm: FormGroup;
  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    protected subjectService: SubjectService,
    protected facultyService: FacultyService,
    protected departmentService: DepartmentService,
    protected hodService: HODService,
    private _snackBar: MatSnackBar,
    private toolbarService: ToolbarService,
    private calcService: CalcService,
    private studentService: StudentService,
    private activateService: ActivateService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.department = department;
      this.loadHodbyDepartment();
      this.loadAllDepartment();
      this.loadAllFaculty();
      this.loadAllSubjects();
      this.loadAllOFaculty();
    });
  }

  loadAllSubjects() {
    this.subjectService
      .query({
        ofDeptId: this.department.id
      })
      .pipe(
        filter((res: HttpResponse<ISubject[]>) => res.ok),
        map((res: HttpResponse<ISubject[]>) => res.body)
      )
      .subscribe(
        (res: ISubject[]) => {
          this.subjects = res;
          this.subjects = this.subjects.filter(val => val.ofDeptId === this.department.id);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadAllFaculty() {
    this.facultyService
      .query({
        departmentId: this.department.id
      })
      .pipe(
        filter((res: HttpResponse<IFaculty[]>) => res.ok),
        map((res: HttpResponse<IFaculty[]>) => res.body)
      )
      .subscribe(
        (res: IFaculty[]) => {
          this.faculties = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadAllDepartment() {
    this.departmentService
      .query()
      .pipe(
        filter((res: HttpResponse<IDepartment[]>) => res.ok),
        map((res: HttpResponse<IDepartment[]>) => res.body)
      )
      .subscribe(
        (res: IDepartment[]) => {
          this.departments = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadHodbyDepartment() {
    this.hodService.filterByDept(this.department.id).subscribe((res: HttpResponse<IHOD>) => {
      this.hod = res.body;
      console.log(this.hod);
    });
  }

  onError(msg: any) {}
  previousState() {
    window.history.back();
  }
  goToRegisterHod() {
    this.router.navigate(['/register', this.department.id, 'hod']);
  }

  createSubjectForm() {
    this.subjectForm = this.fb.group({
      subjectCode: ['', [Validators.required]],
      subjectName: ['', [Validators.required]],
      year: ['', [Validators.required]],
      semester: ['', [Validators.required]],
      ofDeptId: ['', Validators.required],
      facultyId: ['', Validators.required]
    });
  }

  patchSubjectForm(subject: ISubject) {
    this.subjectForm = this.fb.group({
      subjectCode: [subject.subjectCode, [Validators.required]],
      subjectName: [subject.subjectName, [Validators.required]],
      year: [subject.year, [Validators.required]],
      semester: [subject.semester, [Validators.required]],
      ofDeptId: [subject.ofDeptId, Validators.required],
      facultyId: [subject.faculty, Validators.required],
      id: [subject.id]
    });
  }

  getSemester(val: number): number[] {
    return [val * 2 - 1, val * 2];
  }

  saveSubject() {
    console.log(this.subjectForm.get('semester').value);
    this.isSubjectCreationSaving = true;
    this.subject = {
      faculty: this.subjectForm.get('facultyId').value,
      ofDeptId: this.subjectForm.get('ofDeptId').value,
      semester: this.subjectForm.get('semester').value,
      year: this.subjectForm.get('year').value,
      subjectCode: this.subjectForm.get('subjectCode').value,
      subjectName: this.subjectForm.get('subjectName').value,
      id: this.subjectForm.value.id
    };
    if (this.subject.id !== undefined) {
      this.subscribeToSubjectSaveResponse(this.subjectService.update(this.subject));
    } else {
      this.subscribeToSubjectSaveResponse(this.subjectService.create(this.subject));
    }
  }

  protected subscribeToSubjectSaveResponse(result: Observable<HttpResponse<ISubject>>) {
    result.subscribe(
      (res: HttpResponse<ISubject>) => {
        console.log(res.body), this.onSaveSuccess();
      },
      (res: HttpErrorResponse) => this.onSaveError()
    );
  }

  deteteSubject(subject: ISubject) {
    this.subjectService.delete(subject.id).subscribe(
      (res: any) => {
        this.onSaveSuccess();
      },
      err => this.onSaveError()
    );
  }

  protected onSaveSuccess() {
    this.isSubjectCreationSaving = false;
    this.subjectForm = null;
    this.loadAllSubjects();
    this.openSnackBar('Action Successful', 'Done');
  }

  getDepartmentName(id: string): IDepartment {
    this.departmentService.find(id).subscribe(
      (res: HttpResponse<IDepartment>) => {
        return res.body;
      },
      err => {
        return null;
      }
    );
    return null;
  }

  protected onSaveError() {
    this.isSubjectCreationSaving = false;
  }

  openTimeTableWizard() {
    this.router.navigate(['/admin', this.department.id, 'timetable', 'edit']);
  }

  // Department Specific Actions - Variables

  loadAllOFaculty() {
    this.oFaculties = [];
    this.facultyService.filterByDept(this.department.id).subscribe(
      (res: HttpResponse<OFaculty[]>) => {
        this.oFaculties = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  fetchAllStudents() {
    const student: IStudent = {
      currentSem: this.sem,
      currentYear: this.year,
      departmentId: this.department.deptCode
    };
    this.studentService.customfilter1(student).subscribe((res: HttpResponse<IStudent[]>) => {
      this.students = res.body;
      this.choosenStudBool = true;
    });
  }

  getNumber(num: string): number {
    return Number(num);
  }
  getColor(num: string): string {
    const check = Number(num);
    return check <= 30 ? 'warn' : check <= 50 ? 'accent' : 'primary';
  }
  findAttendance() {
    this.loadOverSelf = false;
    this.subd = null;
    this.calcService.findByFaculty(this.hod.id).subscribe(
      (res: HttpResponse<IStudentCalc>) => {
        this.sub = res.body;
        this.subd = {
          subjectName: 'Requested Attendance',
          percentage: Math.floor((this.sub.attendance / this.sub.totalAttendance) * 100),
          attendance: Number(this.sub.attendance),
          totalAttendance: Number(this.sub.totalAttendance)
        };
        this.loadOverSelf = true;
      },
      err => (this.loadOverSelf = true)
    );
  }

  findAttendanceStudent(student: IStudent) {
    this.loadOver = false;
    this.selectedRollNo = true;
    this.studSubject = [];
    this.calcService.findByStudent(student.id).subscribe(
      (res: HttpResponse<IStudentCalc[]>) => {
        if (res.body) {
          res.body.forEach((val: IStudentCalc) => {
            this.studSubject.push({
              subjectName: val.subjectName,
              percentage: Math.floor((val.attendance / val.totalAttendance) * 100),
              attendance: Number(val.attendance),
              totalAttendance: Number(val.totalAttendance)
            });
          });
        }
        this.loadOver = true;
      },
      err => (this.loadOver = true)
    );
  }
  onSubjectChoose() {
    this.loadOver = false;
    const req: IStudent = {
      currentSem: this.choosenSubject.semester,
      currentYear: this.choosenSubject.year,
      departmentId: this.choosenSubject.ofDeptId
    };
    this.studentService.customfilter1(req).subscribe((res: HttpResponse<IStudent[]>) => {
      this.students = res.body.filter(val => val.departmentId === this.choosenSubject.ofDeptId);
      this.choosenStudBool = true;
    });
  }

  activateFaculty(id: string) {
    this.activateService.get(id).subscribe(
      (res: HttpResponse<any>) => {
        this.loadAllOFaculty();
      },
      err => this.loadAllOFaculty()
    );
  }

  findFacultyAttendance(id: string) {
    this.choosenFacBool = true;
    this.facAttendanceDisplay = null;
    this.calcService.findByFaculty(id).subscribe(
      (res: HttpResponse<IStudentCalc>) => {
        this.facAttendance = res.body;
        if (res.body) {
          this.facAttendanceDisplay = {
            subjectName: 'Your Requested Attendance',
            percentage: Math.floor((this.facAttendance.attendance / this.facAttendance.totalAttendance) * 100),
            attendance: Number(this.facAttendance.attendance),
            totalAttendance: Number(this.facAttendance.totalAttendance)
          };
        }
        this.loadOverFac = true;
      },
      err => (this.loadOverFac = true)
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
