import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DevfpserverSharedLibsModule, DevfpserverSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [DevfpserverSharedLibsModule, DevfpserverSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [DevfpserverSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevfpserverSharedModule {
  static forRoot() {
    return {
      ngModule: DevfpserverSharedModule
    };
  }
}
