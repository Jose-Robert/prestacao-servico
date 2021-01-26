import { Component, OnInit } from '@angular/core';

import { TitleService } from '@app/shared/service/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  get title(): string {
    return 'Home';
  }
}
