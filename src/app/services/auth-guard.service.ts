import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public authService: AuthService, private router: Router) {
      // this.authService._user.subscribe( newState => {
      //   console.log(newState);
      //   if (!this.authService.afAuth.auth.currentUser) {
      //       this.router.navigate([ '/login' ]);
      //   } else {
      //     return Observable.of(true);
      //   }
      // });
    }

    canActivate(): Observable<boolean> {
      console.log(this.authService);
      if (this.authService.authenticated) {
        return Observable.of(true);
      } else {
        this.router.navigate([ '/login' ]);
      }
    }
}
