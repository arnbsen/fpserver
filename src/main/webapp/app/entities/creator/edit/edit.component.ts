import { Component, OnInit } from '@angular/core';
import { IDepartment } from 'app/shared/model/department.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from 'app/entities/subject';
import { filter, map } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FacultyService } from 'app/entities/faculty';
import { IFaculty } from 'app/shared/model/faculty.model';
import { DepartmentService } from 'app/entities/department';
import { Observable } from 'rxjs';

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
  isSubjectCreationSaving = false;

  subjectForm: FormGroup;
  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    protected subjectService: SubjectService,
    protected facultyService: FacultyService,
    protected departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.department = department;
    });
    this.loadAllDepartment();
    this.loadAllFaculty();
    this.loadAllSubjects();
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
      subjectName: this.subjectForm.get('subjectName').value
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

  protected onSaveSuccess() {
    this.isSubjectCreationSaving = false;
    this.subjectForm = null;
    this.loadAllSubjects();
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
}
