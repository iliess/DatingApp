import { AuthService } from './../_services/auth.service';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/User.service';
import { User } from 'src/app/_models/User';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable()
export class MemberEditResolver implements Resolve<User>{
    constructor(private userService: UserService, private route: Router,
        private alertify: AlertifyService, private authservice: AuthService ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authservice.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.route.navigate(['/members']);
                return of(null);
            })
        );
    }

}