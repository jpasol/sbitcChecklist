import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/authentication/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

//intercepts httprequests coming in and reads the status code
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            if(err.status === 400) {
                this.authService.logout();
                location.reload(true);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
    

}
