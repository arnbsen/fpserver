import { Component, AfterViewInit, Renderer, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';

@Component({
  selector: 'jhi-login-modal',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class JhiLoginModalComponent implements OnInit, AfterViewInit {
  authenticationError: boolean;
  displayLoader = false;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  constructor(
    private eventManager: JhiEventManager,
    private loginService: LoginService,
    private stateStorageService: StateStorageService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private router: Router,
    // public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {}
  ngAfterViewInit() {
    // setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 0);
  }

  cancel() {
    this.authenticationError = false;
    this.loginForm.patchValue({
      username: '',
      password: ''
    });
    // this.activeModal.dismiss('cancel');
  }

  login() {
    this.displayLoader = true;
    this.loginService
      .login({
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value,
        rememberMe: this.loginForm.get('rememberMe').value
      })
      .then(() => {
        this.authenticationError = false;
        // this.activeModal.dismiss('login success');
        if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
          this.router.navigate(['']);
        }

        this.eventManager.broadcast({
          name: 'authenticationSuccess',
          content: 'Sending Authentication Success'
        });

        // previousState was set in the authExpiredInterceptor before being redirected to login modal.
        // since login is successful, go to stored previousState and clear previousState
        const redirect = this.stateStorageService.getUrl();
        if (redirect && redirect !== '/') {
          this.stateStorageService.storeUrl(null);
          this.router.navigateByUrl(redirect);
        } else {
          this.router.navigateByUrl('/home');
        }
      })
      .catch(() => {
        this.authenticationError = true;
        this.displayLoader = false;
      });
  }

  register() {
    // this.activeModal.dismiss('to state register');
    this.router.navigate(['/register']);
  }

  requestResetPassword() {
    // this.activeModal.dismiss('to state requestReset');
    this.router.navigate(['/reset', 'request']);
  }
}
