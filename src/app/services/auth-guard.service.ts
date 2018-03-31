import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public af: AngularFireAuth, private router: Router) {}

    canActivate(): Observable<boolean> {
      console.log(this.af.auth.currentUser);
      if (!this.af.auth.currentUser) {
        this.router.navigate([ '/login' ]);
      } else {
        return Observable.of(true);
      }
    }
}
