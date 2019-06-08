import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { DevfpserverSharedModule } from 'app/shared/shared.module';

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
        path: 'faculty',
        loadChildren: './faculty/faculty.module#DevfpserverFacultyModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [StudentDashboardComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [StudentDashboardComponent]
})
export class DevfpserverEntityModule {}
