import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared';
import { LoginModalService, UserService, IUser } from 'app/core';
import { Register } from './register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivateService } from '../activate/activate.service';
import { HODService } from 'app/entities/hod';
import { IHOD } from 'app/shared/model/hod.model';
import { IDepartment, Department } from 'app/shared/model/department.model';
import { IFaculty } from 'app/shared/model/faculty.model';
import { FacultyService } from 'app/entities/faculty';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/entities/student';

@Component({
  selector: 'jhi-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {
  doNotMatch: string;
  error: string;
  errorEmailExists: string;
  errorUserExists: string;
  success: boolean;
  modalRef: NgbModalRef;
  data: any;
  mode: string;
  step = 0;
  isSaving = false;
  savingMsg = '';
  activationKey: any;
  user: IUser;
  isActivating = false;
  activated = false;
  hod: IHOD;
  dept: Department;
  faculty: IFaculty;
  student: IStudent;
  isSavingEntity = false;
  savedEnitity = false;

  registerForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*$')]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]]
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
    private loginModalService: LoginModalService,
    private registerService: Register,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private fb: FormBuilder,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected userService: UserService,
    protected activateService: ActivateService,
    protected hodService: HODService,
    protected facultyService: FacultyService,
    protected studentService: StudentService
  ) {}

  ngOnInit() {
    this.success = false;
    this.activatedRoute.data.subscribe(({ data }) => {
      this.data = data;
      this.mode = this.router.url.split('/')[3];
    });
  }

  ngAfterViewInit() {}

  register() {
    this.isSaving = true;
    this.savingMsg = 'Creating Yor Account';
    let registerAccount = {};
    const login = this.registerForm.get(['login']).value;
    const email = this.registerForm.get(['email']).value;
    const password = this.registerForm.get(['password']).value;
    const firstName = this.registerForm.get(['firstName']).value;
    const lastName = this.registerForm.get(['lastName']).value;
    if (password !== this.registerForm.get(['confirmPassword']).value) {
      this.doNotMatch = 'ERROR';
      this.isSaving = false;
      this.savingMsg = 'Passwords Do not match';
    } else {
      registerAccount = { ...registerAccount, login, email, password, firstName, lastName };
      this.doNotMatch = null;
      this.error = null;
      this.errorUserExists = null;
      this.errorEmailExists = null;
      registerAccount = { ...registerAccount, langKey: 'en' };

      this.registerService.save(registerAccount).subscribe(
        (res: HttpResponse<any>) => {
          console.log(res.body);
          this.savingMsg = 'Saved Basic Account.';
          this.user = res.body;
          this.nextStep();
        },
        response => this.processError(response)
      );
    }
  }

  activateAccount(key: string) {
    this.isActivating = true;
    this.savingMsg = 'Activating';
    this.activateService.get(key).subscribe(
      (res: HttpResponse<any>) => {
        console.log(res.body);
        this.activated = true;
        this.isActivating = false;
      },
      err => {
        console.log(this.error);
        this.isActivating = false;
      }
    );
  }

  openLogin() {
    this.modalRef = this.loginModalService.open();
  }

  private processError(response: HttpErrorResponse) {
    this.success = null;
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = 'ERROR';
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = 'ERROR';
    } else {
      this.error = 'ERROR';
    }
  }

  // Accordian Tools
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  // Specfic User kind Registration
  registerHOD() {
    this.isSavingEntity = true;
    this.savingMsg = 'Saving the details';
    this.hod = {
      departmentId: this.data.id,
      userId: this.user.id,
      authCode: this.hodForm.get('authCode').value
    };
    this.hodService.create(this.hod).subscribe(
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
      departmentId: this.data.id,
      facultyCode: this.facultyForm.get('facultyCode').value
    };
    this.facultyService.create(this.faculty).subscribe(
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
      departmentId: this.data.id,
      classRollNumber: this.studentForm.get('classRollNumber').value,
      currentSession: this.studentForm.get('currentSession').value,
      yearJoined: this.studentForm.get('yearJoined').value,
      currentSem: Number(this.studentForm.get('currentSem').value),
      currentYear: this.studentForm.get('currentYear').value,
      userId: this.user.id
    };
    this.studentService.create(this.student).subscribe(
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
    this.nextStep();
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
