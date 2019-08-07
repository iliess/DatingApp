import { catchError, tap } from 'rxjs/operators';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/User.service';
import { User } from 'src/app/_models/User';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable()
export class MemberListResolver implements Resolve<User[]>{
    pageNumber = 1;
    pageSize = 5;

    constructor(private userService: UserService, private route: Router,
        private alertify: AlertifyService ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.route.navigate(['/home']);
                return of(null);
            })
        );
    }

}