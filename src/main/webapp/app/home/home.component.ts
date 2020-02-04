import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { LoginModalService, AccountService, Account } from 'app/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'app/shared/toolbar/toolbar.service';
interface User {
  fullName: string;
  rollNo: number;
  dept: string;
  year: number;
  sem: number;
  deviceID: string;
}
@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
  account: Account;
  modalRef: NgbModalRef;
  showFilter = false;
  enableStudent = false;
  enableFaculty = false;
  enableHod = false;
  userParams: any;
  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private router: Router,
    private toolbarService: ToolbarService
  ) {}

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
      this.accountService.hasAuthority('ROLE_ADMIN').then((res: boolean) => {
        if (res) {
          this.router.navigateByUrl('/admin');
        } else {
          this.accountService.hasAuthority('ROLE_FACULTY').then((resf: boolean) => {
            if (resf) {
              this.enableFaculty = true;
              this.setValuesForToolbarService(this.account.id, 'faculty');
            } else {
              this.accountService.hasAuthority('ROLE_STUDENT').then((resu: boolean) => {
                if (resu) {
                  this.enableStudent = true;
                  this.setValuesForToolbarService(this.account.id, 'student');
                } else {
                  this.accountService.hasAuthority('ROLE_HOD').then((resh: boolean) => {
                    if (resh) {
                      this.enableHod = true;
                      this.setValuesForToolbarService(this.account.id, 'hod');
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
    this.registerAuthenticationSuccess();
  }

  setValuesForToolbarService(id: string, role: string) {
    this.toolbarService.setUserParams({
      id,
      role
    });
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  setShowFilter(event: boolean) {
    console.log(event);
    this.showFilter = event;
  }
}
