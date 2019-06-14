import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { DevfpserverSharedModule } from 'app/shared/shared.module';
import { TimeTableWizardComponent } from './time-table-wizard/time-table-wizard.component';
import { TimeTableMetaDataDialogComponent } from './time-table-wizard/time-table-wizard.metadata';
import { UserRouteAccessService } from 'app/core';

@NgModule({
  imports: [
    DevfpserverSharedModule,
    RouterModule.forChild([
      {
        path: 'intermdiate-user',
        loadChildren: './intermdiate-user/intermdiate-user.module#DevfpserverIntermdiateUserModule'
      },
      {
        path: 'department',
        loadChildren: './department/department.module#DevfpserverDepartmentModule'
      },
      {
        path: 'device',
        loadChildren: './device/device.module#DevfpserverDeviceModule'
      },
      {
        path: 'hod',
        loadChildren: './hod/hod.module#DevfpserverHODModule'
      },
      {
        path: 'subject',
        loadChildren: './subject/subject.module#DevfpserverSubjectModule'
      },
      {
        path: 'faculty',
        loadChildren: './faculty/faculty.module#DevfpserverFacultyModule'
      },
      {
        path: 'student',
        loadChildren: './student/student.module#DevfpserverStudentModule'
      },
      {
        path: 'subject-time-table',
        loadChildren: './subject-time-table/subject-time-table.module#DevfpserverSubjectTimeTableModule'
      },
      {
        path: 'day-time-table',
        loadChildren: './day-time-table/day-time-table.module#DevfpserverDayTimeTableModule'
      },
      {
        path: 'time-table',
        loadChildren: './time-table/time-table.module#DevfpserverTimeTableModule'
      },
      {
        path: 'timetable',
        component: TimeTableWizardComponent,
        data: {
          pageTitle: 'STCET AUTOMATED ATTENDANCE ',
          authorities: ['ROLE_ADMIN']
        },
        canActivate: [UserRouteAccessService]
      },
      {
        path: 'faculty',
        loadChildren: './faculty/faculty.module#DevfpserverFacultyModule'
      },
      {
        path: 'day-time-table',
        loadChildren: './day-time-table/day-time-table.module#DevfpserverDayTimeTableModule'
      },
      {
        path: 'attendance',
        loadChildren: './attendance/attendance.module#DevfpserverAttendanceModule'
      },
      {
        path: 'day',
        loadChildren: './day/day.module#DevfpserverDayModule'
      },
      {
        path: 'admin',
        loadChildren: './creator/creator.module#CreatorModule'
      },
      {
        path: 'academic-session',
        loadChildren: './academic-session/academic-session.module#DevfpserverAcademicSessionModule'
      },
      {
        path: 'special-occasions',
        loadChildren: './special-occasions/special-occasions.module#DevfpserverSpecialOccasionsModule'
      },
      {
        path: 'subject',
        loadChildren: './subject/subject.module#DevfpserverSubjectModule'
      },
      {
        path: 'hod',
        loadChildren: './hod/hod.module#DevfpserverHODModule'
      },
      {
        path: 'subject',
        loadChildren: './subject/subject.module#DevfpserverSubjectModule'
      },
      {
        path: 'attendance',
        loadChildren: './attendance/attendance.module#DevfpserverAttendanceModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [StudentDashboardComponent, TimeTableWizardComponent, TimeTableMetaDataDialogComponent],
  entryComponents: [TimeTableMetaDataDialogComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [StudentDashboardComponent, TimeTableWizardComponent]
})
export class DevfpserverEntityModule {}
