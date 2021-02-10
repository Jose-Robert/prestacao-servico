import { Component } from '@angular/core';

import { applicationName } from '@app/shared/service/title.service';

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html'
})
export class PageFooterComponent {

  get applicationName(): string {
    return applicationName;
  }

  get today(): Date {
    return new Date();
  }
}
