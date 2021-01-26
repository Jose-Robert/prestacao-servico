import { Component, OnInit } from '@angular/core';

import { TitleService } from '@app/shared/service/title.service';

@Component({
  selector: 'app-page-exception-401',
  templateUrl: './page-exception-401.component.html'
})
export class PageException401Component implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  get title(): string {
    return 'Acesso Não Autorizado';
  }
}
