import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('🚨 Custom Error:', error.message || error);
    // ممكن تضيف هنا أي logic إضافي، زي إرسال الخطأ لسيرفر الـ logging
  }
}
