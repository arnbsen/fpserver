import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AccountService, IUser } from 'app/core';
import { Account } from 'app/core/user/account.model';
import { HODService } from 'app/entities/hod';
import { FacultyService } from 'app/entities/faculty';
import { StudentService } from 'app/entities/student';
import { HttpResponse } from '@angular/common/http';
import { IHOD, HOD } from 'app/shared/model/hod.model';
import { IFaculty, Faculty } from 'app/shared/model/faculty.model';
import { IStudent, Student } from 'app/shared/model/student.model';
import { IDepartment } from 'app/shared/model/department.model';
import { ActivatedRoute } from '@angular/router';
import { PasswordService } from '../password/password.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'jhi-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  error: string;
  success: string;
  languages: any[];
  isSaving = false;
  mode = '';
  savingMsg = '';
  hod: IHOD;
  id = '';
  doNotMatch = '';
  dept: IDepartment;
  faculty: IFaculty;
  student: IStudent;
  isSavingEntity = false;
  savedEnitity = false;
  user: IUser;
  settingsForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    activated: [false],
    authorities: [[]],
    langKey: ['en'],
    login: [],
    imageUrl: [],
    deviceID: ['', Validators.required]
  });

  passwordForm = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
  });

  hodForm = this.fb.group({
    authCode: ['', Validators.required]
  });

  facultyForm = this.fb.group({
    facultyCode: ['', Validators.required]
  });

  studentForm = this.fb.group({
    yearJoined: ['', Validators.required],
    currentYear: ['', Validators.required],
    currentSem: ['', Validators.required],
    classRollNumber: ['', Validators.required],
    currentSession: ['', Validators.required]
  });

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    protected hodService: HODService,
    protected facultyService: FacultyService,
    protected studentService: StudentService,
    protected activatedRoute: ActivatedRoute,
    private passwordService: PasswordService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.accountService.identity().then(account => {
      this.id = account.id;
      this.updateForm(account);
    });
    this.activatedRoute.data.subscribe(({ data }) => {
      if (data.classRollNumber) {
        this.student = data;
        this.mode = 'student';
        this.patchStudentForm();
      } else if (data.facultyCode) {
        this.faculty = data;
        this.mode = 'faculty';
        this.patchFacultyForm();
      } else if (data.authCode) {
        this.hod = data;
        this.mode = 'hod';
        this.patchHODForm();
      }
    });
  }

  save() {
    const settingsAccount = this.accountFromForm();
    this.accountService.save(settingsAccount).subscribe(
      () => {
        this.resetForm(this.settingsForm);
        this.openSnackBar('Personal Details Updated Sucessfully', 'Done');
        this.accountService.identity(true).then(account => {
          this.updateForm(account);
        });
      },
      () => {
        this.resetForm(this.settingsForm);
        this.openSnackBar('Error while updating', 'Done');
      }
    );
  }

  private accountFromForm(): any {
    const account = {};
    return {
      ...account,
      firstName: this.settingsForm.get('firstName').value,
      lastName: this.settingsForm.get('lastName').value,
      email: this.settingsForm.get('email').value,
      activated: this.settingsForm.get('activated').value,
      authorities: this.settingsForm.get('authorities').value,
      langKey: this.settingsForm.get('langKey').value,
      login: this.settingsForm.get('login').value,
      imageUrl: this.settingsForm.get('imageUrl').value
    };
  }

  updateForm(account: any): void {
    this.settingsForm.patchValue({
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      activated: account.activated,
      authorities: account.authorities,
      langKey: account.langKey,
      login: account.login,
      imageUrl: account.imageUrl,
      deviceID: account.deviceID
    });
  }

  changePassword() {
    const newPassword = this.passwordForm.get(['newPassword']).value;
    if (newPassword !== this.passwordForm.get(['confirmPassword']).value) {
      this.error = null;
      this.success = null;
      this.doNotMatch = 'ERROR';
    } else {
      this.doNotMatch = null;
      this.passwordService.save(newPassword, this.passwordForm.get(['currentPassword']).value).subscribe(
        () => {
          this.resetForm(this.passwordForm);
          this.openSnackBar('Password Updated Sucessfully', 'Done');
        },
        () => {
          this.resetForm(this.passwordForm);
          this.openSnackBar('Password Updated Failed', 'Done');
        }
      );
    }
  }

  resetForm(form: FormGroup) {
    form.reset();
    form.markAsUntouched();
    form.markAsPristine();
    form.markAsPending();
  }

  patchHODForm() {
    this.hodForm = this.fb.group({
      authCode: [this.hod.authCode, Validators.required]
    });
  }

  patchStudentForm() {
    this.studentForm = this.fb.group({
      yearJoined: [this.student.yearJoined, Validators.required],
      currentYear: [this.student.currentYear, Validators.required],
      currentSem: [this.student.currentSem, Validators.required],
      classRollNumber: [this.student.classRollNumber, Validators.required],
      currentSession: [this.student.currentSession, Validators.required]
    });
  }

  patchFacultyForm() {
    this.facultyForm = this.fb.group({
      facultyCode: [this.faculty.facultyCode, Validators.required]
    });
  }

  registerHOD() {
    this.isSavingEntity = true;
    this.savingMsg = 'Saving the details';
    this.hod = {
      userId: this.id,
      authCode: this.hodForm.get('authCode').value,
      id: this.hod.id,
      departmentId: this.hod.departmentId
    };
    this.hodService.update(this.hod).subscribe(
      (res: HttpResponse<IHOD>) => {
        console.log(res.body);
        this.savedEnitity = true;
        this.closeEntityLoader();
      },
      err => {
        console.log(err);
      }
    );
  }

  registerFaculty() {
    this.isSavingEntity = true;
    this.savingMsg = 'Saving the details';
    this.faculty = {
      userId: this.user.id,
      facultyCode: this.facultyForm.get('facultyCode').value,
      departmentId: this.faculty.departmentId,
      id: this.faculty.id
    };
    this.facultyService.update(this.faculty).subscribe(
      (res: HttpResponse<IFaculty>) => {
        console.log(res.body);
        this.savedEnitity = true;
        this.closeEntityLoader();
      },
      err => {
        console.log(err);
      }
    );
  }

  getSemester(val: number): number[] {
    return [val * 2 - 1, val * 2];
  }

  registerStudent() {
    this.isSavingEntity = true;
    this.savingMsg = 'Saving the details';
    this.student = {
      departmentId: this.student.departmentId,
      id: this.student.id,
      classRollNumber: this.studentForm.get('classRollNumber').value,
      currentSession: this.studentForm.get('currentSession').value,
      yearJoined: this.studentForm.get('yearJoined').value,
      currentSem: Number(this.studentForm.get('currentSem').value),
      currentYear: this.studentForm.get('currentYear').value,
      userId: this.id
    };
    this.studentService.update(this.student).subscribe(
      (res: HttpResponse<IStudent>) => {
        console.log(res.body);
        this.savedEnitity = true;
        this.closeEntityLoader();
      },
      err => {
        console.log(err);
      }
    );
  }

  openEnitityLoader() {
    this.isSavingEntity = true;
  }

  closeEntityLoader() {
    this.isSavingEntity = false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500
    });
  }
}
