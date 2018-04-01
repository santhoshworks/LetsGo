import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  private _user: firebase.User;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    afAuth.authState.subscribe(user => this.user = user);
  }

  get user(): firebase.User {
    return this._user;
  }

  set user(value: firebase.User) {
    this._user = value;
  }

  get authenticated(): boolean {
    return this._user !== null;
  }

  get id(): string {
    return this.authenticated ? this.user.uid : '';
  }

  signInWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => {
        // this.db. object(`/users/${response.user.uid}`)
        //   .subscribe(user => {
        //     if (!user.$exists()) {
        //       const {displayName, email, emailVerified, photoURL, uid} = response.user;
        //       this.db.object(`/users/${response.user.uid}`).set({
        //         displayName,
        //         email,
        //         emailVerified,
        //         photoURL,
        //         uid
        //       });
        //     }
        //   });
      })
      .catch(err => console.log('ERRROR @ AuthService#signIn() :', err));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((logeduser) => {
        // this.notify.update('Welcome to Firestarter!!!', 'success');
        this.user = logeduser;
        if (!logeduser.isAnonymous) {
              this.router.navigateByUrl('/dashboard');
        }
        // return this.updateUserData(user); // if using firestore
      })
      .catch((error) => console.log(error) );
      // this.af.auth
      // .signInAndRetrieveDataWithEmailAndPassword(formData.value.email, formData.value.password)
      // .then(data => {
      //   console.log('log after signin' ,  data);
      //   if (!data.user.isAnonymous) {
      //     this.router.navigateByUrl('/dashboard');
      //   }
      // })
      // .catch(err =>  console.log(err));
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }
}

// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

// import * as firebase from 'firebase/app';
// import { AngularFireAuth } from 'angularfire2/auth';
// // import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
// import { NotifyService } from './notify.service';

// import { Observable } from 'rxjs/Observable';
// import { switchMap } from 'rxjs/operators';

// interface User {
//   uid: string;
//   email?: string | null;
//   photoURL?: string;
//   displayName?: string;
// }

// @Injectable()
// export class AuthService {

//   user: Observable<User | null>;

//   constructor(private afAuth: AngularFireAuth,
//               private router: Router,
//               private notify: NotifyService) {

//     this.user = this.afAuth.authState
//       .switchMap((user) => {
//         if (user) {
//           // return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
//         } else {
//           return Observable.of(null);
//         }
//       });
//   }

//   ////// OAuth Methods /////
//   googleLogin() {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     return this.oAuthLogin(provider);
//   }

//   githubLogin() {
//     const provider = new firebase.auth.GithubAuthProvider();
//     return this.oAuthLogin(provider);
//   }

//   facebookLogin() {
//     const provider = new firebase.auth.FacebookAuthProvider();
//     return this.oAuthLogin(provider);
//   }

//   twitterLogin() {
//     const provider = new firebase.auth.TwitterAuthProvider();
//     return this.oAuthLogin(provider);
//   }

//   private oAuthLogin(provider: firebase.auth.AuthProvider) {
//     return this.afAuth.auth.signInWithPopup(provider)
//       .then((credential) => {
//         this.notify.update('Welcome to Firestarter!!!', 'success');
//         return this.updateUserData(credential.user);
//       })
//       .catch((error) => this.handleError(error) );
//   }

//   //// Anonymous Auth ////
//   anonymousLogin() {
//     return this.afAuth.auth.signInAnonymously()
//       .then((user) => {
//         this.notify.update('Welcome to Firestarter!!!', 'success');
//         return this.updateUserData(user); // if using firestore
//       })
//       .catch((error) => {
//         console.error(error.code);
//         console.error(error.message);
//         this.handleError(error);
//       });
//   }

//   //// Email/Password Auth ////
//   emailSignUp(email: string, password: string) {
//     return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
//       .then((user) => {
//         this.notify.update('Welcome to Firestarter!!!', 'success');
//         return this.updateUserData(user); // if using firestore
//       })
//       .catch((error) => this.handleError(error) );
//   }

//   emailLogin(email: string, password: string) {
//     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
//       .then((user) => {
//         this.notify.update('Welcome to Firestarter!!!', 'success');
//         return this.updateUserData(user); // if using firestore
//       })
//       .catch((error) => this.handleError(error) );
//   }

//   // Sends email allowing user to reset password
//   resetPassword(email: string) {
//     const fbAuth = firebase.auth();

//     return fbAuth.sendPasswordResetEmail(email)
//       .then(() => this.notify.update('Password update email sent', 'info'))
//       .catch((error) => this.handleError(error));
//   }

//   signOut() {
//     this.afAuth.auth.signOut().then(() => {
//         this.router.navigate(['/']);
//     });
//   }

//   // If error, console log and notify user
//   private handleError(error: Error) {
//     console.error(error);
//     this.notify.update(error.message, 'error');
//   }

//   // Sets user data to firestore after succesful login
//   private updateUserData(user: User) {

//     // const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

//     // const data: User = {
//     //   uid: user.uid,
//     //   email: user.email || null,
//     //   displayName: user.displayName || 'nameless user',
//     //   photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
//     // };
//     // return userRef.set(data);
//   }

//   // Returns true if user is logged in
//   // get authenticated(): boolean {
//   //   return this.authState !== null;
//   // }

//   // // Returns current user data
//   // get currentUser(): any {
//   //   return this.authenticated ? this.authState : null;
//   // }

//   // Returns
//   // get currentUserObservable(): any {
//   //   return this.af.authState;
//   // }

//   // // Returns current user UID
//   // get currentUserId(): string {
//   //   return this.authenticated ? this.authState.uid : '';
//   // }

//   // // Anonymous User
//   // get currentUserAnonymous(): boolean {
//   //   return this.authenticated ? this.authState.isAnonymous : false;
//   // }

//   // Returns current user display name or Guest
//   // get currentUserDisplayName(): string {
//   //   if (!this.authState) { return 'Guest' }
//   //   else if (this.currentUserAnonymous) { return 'Anonymous' }
//   //   else { return this.authState['displayName'] || 'User without a Name' }
//   // }

//   //// Social Auth ////
//   // githubLogin() {
//   //   const provider = new firebase.auth.GithubAuthProvider()
//   //   return this.socialSignIn(provider);
//   // }

//   // googleLogin() {
//   //   const provider = new firebase.auth.GoogleAuthProvider()
//   //   return this.socialSignIn(provider);
//   // }

//   // facebookLogin() {
//   //   const provider = new firebase.auth.FacebookAuthProvider()
//   //   return this.socialSignIn(provider);
//   // }

//   // twitterLogin(){
//   //   const provider = new firebase.auth.TwitterAuthProvider()
//   //   return this.socialSignIn(provider);
//   // }

//   // private socialSignIn(provider) {
//   //   return this.afAuth.auth.signInWithPopup(provider)
//   //     .then((credential) =>  {
//   //         this.authState = credential.user
//   //         this.updateUserData()
//   //     })
//   //     .catch(error => console.log(error));
//   // }


//   //// Anonymous Auth ////
//   // anonymousLogin() {
//   //   return this.afAuth.auth.signInAnonymously()
//   //   .then((user) => {
//   //     this.authState = user
//   //     this.updateUserData()
//   //   })
//   //   .catch(error => console.log(error));
//   // }

//   //// Email/Password Auth ////
//   // emailSignUp(email:string, password:string) {
//   //   return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
//   //     .then((user) => {
//   //       this.authState = user
//   //       this.updateUserData()
//   //     })
//   //     .catch(error => console.log(error));
//   // }

//   // emailLogin(email:string, password:string) {
//   //    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
//   //      .then((user) => {
//   //        this.authState = user
//   //        this.updateUserData()
//   //      })
//   //      .catch(error => console.log(error));
//   // }

//   // Sends email allowing user to reset password
//   // resetPassword(email: string) {
//   //   var auth = firebase.auth();

//   //   return auth.sendPasswordResetEmail(email)
//   //     .then(() => console.log("email sent"))
//   //     .catch((error) => console.log(error))
//   // }


//   //// Sign Out ////
//   // signOut(): void {
//   //   this.afAuth.auth.signOut();
//   //   this.router.navigate(['/'])
//   // }


//   //// Helpers ////
//   // private updateUserData(): void {
//   // // Writes user name and email to realtime db
//   // // useful if your app displays information about users or for admin features
//   //   let path = `users/${this.currentUserId}`; // Endpoint on firebase
//   //   let data = {
//   //                 email: this.authState.email,
//   //                 name: this.authState.displayName
//   //               }

//   //   this.db.object(path).update(data)
//   //   .catch(error => console.log(error));

//   // }
// }
