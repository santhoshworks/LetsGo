import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo: any = null;
  constructor(public authService: AuthService, private router: Router) {
    // if(this.af.auth.currentUser) {
    //   console.log(this.af.auth.currentUser.email);
    // } else {
    //   this.router.navigateByUrl('/login');
    // }
    // this.af.authState.
    // subscribe(auth => {
    //   if (auth.isAnonymous) {
    //     this.router.navigateByUrl('/login');
    //   }
    // });
    authService.afAuth.authState.subscribe(user => this.userInfo = user);
  }

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
    this.router.navigateByUrl('/login');
  }
}
