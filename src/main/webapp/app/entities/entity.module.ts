import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { DevfpserverSharedModule } from 'app/shared/shared.module';
import { TimeTableWizardComponent } from './time-table-wizard/time-table-wizard.component';
import { UserRouteAccessService } from 'app/core';
import { DepartmentResolve } from './department';
import { TimeTableMetaDataDialogComponent } from './time-table-wizard/time-table-wizard.metadata';
import { SubjectChooserDialogComponent } from './time-table-wizard/subject.chooser.dialog.component';
import { DeviceIdDialogComponent } from './device-id-dialog/device-id-dialog.component';

@NgModule({
  imports: [
    DevfpserverSharedModule,
    RouterModule.forChild([
      // {
      //   path: 'intermdiate-user',
      //   loadChildren: './intermdiate-user/intermdiate-user.module#DevfpserverIntermdiateUserModule'
      // },
      // {
      //   path: 'department',
      //   loadChildren: './department/department.module#DevfpserverDepartmentModule'
      // },
      // {
      //   path: 'device',
      //   loadChildren: './device/device.module#DevfpserverDeviceModule'
      // },
      {
        path: 'hod',
        loadChildren: './hod/hod.module#DevfpserverHODModule'
      },
      // {
      //   path: 'subject',
      //   loadChildren: './subject/subject.module#DevfpserverSubjectModule'
      // },
      {
        path: 'faculty',
        loadChildren: './faculty/faculty.module#DevfpserverFacultyModule'
      },
      // {
      //   path: 'student',
      //   loadChildren: './student/student.module#DevfpserverStudentModule'
      // },
      // {
      //   path: 'subject-time-table',
      //   loadChildren: './subject-time-table/subject-time-table.module#DevfpserverSubjectTimeTableModule'
      // },
      // {
      //   path: 'day-time-table',
      //   loadChildren: './day-time-table/day-time-table.module#DevfpserverDayTimeTableModule'
      // },
      {
        path: 'time-table',
        loadChildren: './time-table/time-table.module#DevfpserverTimeTableModule'
      },
      {
        path: 'admin/:id/timetable/edit',
        component: TimeTableWizardComponent,
        resolve: {
          department: DepartmentResolve
        },
        data: {
          pageTitle: 'STCET AUTOMATED ATTENDANCE ',
          authorities: ['ROLE_ADMIN']
        },
        canActivate: [UserRouteAccessService]
      },
      // {
      //   path: 'faculty',
      //   loadChildren: './faculty/faculty.module#DevfpserverFacultyModule'
      // },
      // {
      //   path: 'day-time-table',
      //   loadChildren: './day-time-table/day-time-table.module#DevfpserverDayTimeTableModule'
      // },
      // {
      //   path: 'attendance',
      //   loadChildren: './attendance/attendance.module#DevfpserverAttendanceModule'
      // },
      // {
      //   path: 'day',
      //   loadChildren: './day/day.module#DevfpserverDayModule'
      // },
      {
        path: 'admin',
        loadChildren: './creator/creator.module#CreatorModule'
      },
      // {
      //   path: 'academic-session',
      //   loadChildren: './academic-session/academic-session.module#DevfpserverAcademicSessionModule'
      // },
      // {
      //   path: 'special-occasions',
      //   loadChildren: './special-occasions/special-occasions.module#DevfpserverSpecialOccasionsModule'
      // },
      // {
      //   path: 'subject',
      //   loadChildren: './subject/subject.module#DevfpserverSubjectModule'
      // },
      // {
      //   path: 'hod',
      //   loadChildren: './hod/hod.module#DevfpserverHODModule'
      // },
      // {
      //   path: 'subject',
      //   loadChildren: './subject/subject.module#DevfpserverSubjectModule'
      // },
      // {
      //   path: 'attendance',
      //   loadChildren: './attendance/attendance.module#DevfpserverAttendanceModule'
      // },
      // {
      //   path: 'subject',
      //   loadChildren: './subject/subject.module#DevfpserverSubjectModule'
      // },
      // {
      //   path: 'hod',
      //   loadChildren: './hod/hod.module#DevfpserverHODModule'
      // },
      // {
      //   path: 'subject',
      //   loadChildren: './subject/subject.module#DevfpserverSubjectModule'
      // },
      // {
      //   path: 'faculty',
      //   loadChildren: './faculty/faculty.module#DevfpserverFacultyModule'
      // },
      // {
      //   path: 'subject',
      //   loadChildren: './subject/subject.module#DevfpserverSubjectModule'
      // },
      // {
      //   path: 'faculty',
      //   loadChildren: './faculty/faculty.module#DevfpserverFacultyModule'
      // },
      // {
      //   path: 'subject',
      //   loadChildren: './subject/subject.module#DevfpserverSubjectModule'
      // },
      // {
      //   path: 'faculty',
      //   loadChildren: './faculty/faculty.module#DevfpserverFacultyModule'
      // },
      // {
      //   path: 'faculty',
      //   loadChildren: './faculty/faculty.module#DevfpserverFacultyModule'
      // },
      // {
      //   path: 'subject-time-table',
      //   loadChildren: './subject-time-table/subject-time-table.module#DevfpserverSubjectTimeTableModule'
      // },
      // {
      //   path: 'day-time-table',
      //   loadChildren: './day-time-table/day-time-table.module#DevfpserverDayTimeTableModule'
      // },
      // {
      //   path: 'subject',
      //   loadChildren: './subject/subject.module#DevfpserverSubjectModule'
      // },
      // {
      //   path: 'device',
      //   loadChildren: './device/device.module#DevfpserverDeviceModule'
      // },
      // {
      //   path: 'device',
      //   loadChildren: './device/device.module#DevfpserverDeviceModule'
      // },
      // {
      //   path: 'location',
      //   loadChildren: './location/location.module#DevfpserverLocationModule'
      // },
      // {
      //   path: 'subject-time-table',
      //   loadChildren: './subject-time-table/subject-time-table.module#DevfpserverSubjectTimeTableModule'
      // },
      // {
      //   path: 'biometric-backup',
      //   loadChildren: './biometric-backup/biometric-backup.module#DevfpserverBiometricBackupModule'
      // },
      // {
      //   path: 'device',
      //   loadChildren: './device/device.module#DevfpserverDeviceModule'
      // },
      // {
      //   path: 'location',
      //   loadChildren: './location/location.module#DevfpserverLocationModule'
      // },
      // {
      //   path: 'device',
      //   loadChildren: './device/device.module#DevfpserverDeviceModule'
      // },
      // {
      //   path: 'location',
      //   loadChildren: './location/location.module#DevfpserverLocationModule'
      // },
      // {
      //   path: 'attendance',
      //   loadChildren: './attendance/attendance.module#DevfpserverAttendanceModule'
      // },
      // {
      //   path: 'attendance',
      //   loadChildren: './attendance/attendance.module#DevfpserverAttendanceModule'
      // },
      {
        path: 'special-occasions',
        loadChildren: './special-occasions/special-occasions.module#DevfpserverSpecialOccasionsModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [
    StudentDashboardComponent,
    TimeTableWizardComponent,
    TimeTableMetaDataDialogComponent,
    SubjectChooserDialogComponent,
    DeviceIdDialogComponent
  ],
  entryComponents: [TimeTableMetaDataDialogComponent, SubjectChooserDialogComponent, DeviceIdDialogComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [StudentDashboardComponent, TimeTableWizardComponent]
})
export class DevfpserverEntityModule {}
