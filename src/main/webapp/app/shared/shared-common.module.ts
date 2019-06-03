import { NgModule } from '@angular/core';

import { DevfpserverSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [DevfpserverSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [DevfpserverSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class DevfpserverSharedCommonModule {}
