import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-loader',
  templateUrl: './dialog-loader.component.html',
  styleUrls: ['./dialog-loader.component.scss']
})
export class DialogLoaderComponent {

  @Input() visible = false;
}
