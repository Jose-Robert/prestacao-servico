import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class ClipboardService {

  private dom: Document;

  constructor(@Inject(DOCUMENT) dom: Document) {
    this.dom = dom;
  }

  public copy(value: string): Promise<any> {
    const promise = new Promise((resolve, reject): void => {
        let textarea = null;
        try {
          textarea = this.dom.createElement('textarea');
          textarea.style.height = '0px';
          textarea.style.left = '-100px';
          textarea.style.opacity = '0';
          textarea.style.position = 'fixed';
          textarea.style.top = '-100px';
          textarea.style.width = '0px';
          this.dom.body.appendChild(textarea);

          textarea.value = value ? value : ' ';
          textarea.select();

          this.dom.execCommand('copy');

          resolve(value);
        } finally {
          if (textarea && textarea.parentNode) {
            textarea.parentNode.removeChild(textarea);
          }
        }
      }
    );

    return (promise);
  }

}
