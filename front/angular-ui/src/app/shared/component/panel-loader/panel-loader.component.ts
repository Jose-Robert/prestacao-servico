import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-panel-loader',
  templateUrl: './panel-loader.component.html'
})
export class PanelLoaderComponent {

  @Input() visible = false;
}
