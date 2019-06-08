import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DevfpserverSharedLibsModule, DevfpserverSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [DevfpserverSharedLibsModule, DevfpserverSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective, ToolbarComponent],
  entryComponents: [JhiLoginModalComponent],
  exports: [DevfpserverSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, ToolbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevfpserverSharedModule {
  static forRoot() {
    return {
      ngModule: DevfpserverSharedModule
    };
  }
}
