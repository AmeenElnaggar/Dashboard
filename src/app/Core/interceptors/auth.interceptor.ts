import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor = function (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const getToken = localStorage.getItem('token');

  if (getToken) {
    request = request.clone({
      setHeaders: {
        token: `
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2IzZWMyZTg5MTk0ZmVlYmZhN2NiMjEiLCJlbWFpbCI6InNiZW5kYXJ5OTc3QGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc0MDU4NTkwMCwiZXhwIjoxNzcyMTIxOTAwfQ.nm7rzNayYeiLbhLr0NvlQnbEG27lu8Pr_klTPNGaC7g`,
      },
    });
  }
  return next(request);
};
