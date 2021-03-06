import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication/auth.service';


//used to intercept http requests going out 
//attaches jwt token
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.auth.currentUserValue;
        if(currentUser && currentUser.token) 
        {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            })
        }
        return next.handle(req);

    }
}
