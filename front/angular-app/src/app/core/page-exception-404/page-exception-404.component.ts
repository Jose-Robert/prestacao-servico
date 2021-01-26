import { Component, OnInit } from '@angular/core';

import { TitleService } from '@app/shared/service/title.service';

@Component({
  selector: 'app-page-exception-404',
  templateUrl: './page-exception-404.component.html'
})
export class PageException404Component implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  get title(): string {
    return 'Página Não Encontrada';
  }
}
