import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class ToastService {

  constructor(private messageService: MessageService) { }

  /**
   * Display messages in an overlay
   *
   * @param severity Severity level of the message, valid values are "success", "info", "warn" and "error".
   * @param summary Summary text of the message.
   * @param detail Detail text of the message.
   */
  add(severity: string, summary: string, detail?: string) {
    this.messageService.add({ severity, summary, detail });
  }

  addSuccess(summary: string, detail?: string) {
    this.add('success', summary, detail);
  }

  addInfo(summary: string, detail?: string) {
    this.add('info', summary, detail);
  }

  addWarn(summary: string, detail?: string) {
    this.add('warn', summary, detail);
  }

  addError(summary: string, detail?: string) {
    this.add('error', summary, detail);
  }
}
