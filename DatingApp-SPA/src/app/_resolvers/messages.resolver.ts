import { AuthService } from './../_services/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/User.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Message } from '../_models/Message';


@Injectable()
export class MessagesResolver implements Resolve<Message[]>{
    pageNumber = 1;
    pageSize = 12;
    messageContainer = 'Unread';

    constructor(private userService: UserService, private route: Router, private authService: AuthService,
        private alertify: AlertifyService ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userService.getMessages(this.authService.decodedToken.nameid,
            this.pageNumber, this.pageSize, this.messageContainer).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving messages');
                this.route.navigate(['/home']);
                return of(null);
            })
        );
    }

}