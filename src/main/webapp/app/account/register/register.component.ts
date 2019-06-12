import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared';
import { LoginModalService, UserService } from 'app/core';
import { Register } from './register.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  isSaving = true;
  savingMsg = '';

  registerForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*$')]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
  });

  constructor(
    private loginModalService: LoginModalService,
    private registerService: Register,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private fb: FormBuilder,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected userService: UserService
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
    if (password !== this.registerForm.get(['confirmPassword']).value) {
      this.doNotMatch = 'ERROR';
      this.isSaving = false;
      this.savingMsg = 'Passwords Do not match';
    } else {
      registerAccount = { ...registerAccount, login, email, password };
      this.doNotMatch = null;
      this.error = null;
      this.errorUserExists = null;
      this.errorEmailExists = null;
      registerAccount = { ...registerAccount, langKey: 'en' };

      this.registerService.save(registerAccount).subscribe(
        (res: HttpResponse<any>) => {
          this.success = true;
          console.log(res.body);
          this.savingMsg = 'Saved Basic Account. Activating...';
        },
        response => this.processError(response)
      );
    }
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
}
