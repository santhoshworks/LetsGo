import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  state = '';
  error: any;
  credential: firebase.auth.AuthCredential;

  constructor(public af: AngularFireAuth, private router: Router) {}


  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.credential = firebase.auth.EmailAuthProvider.credential(formData.value.email, formData.value.password);
      console.log(this.credential);
      this.af.auth
      .signInAndRetrieveDataWithEmailAndPassword(formData.value.email, formData.value.password)
      .then(data => {
        console.log('log after signin' ,  data);
        if (!data.user.isAnonymous) {
          this.router.navigateByUrl('/dashboard');
        }
      })
      .catch(err =>  console.log(err));
    }
  }
  ngOnInit() {
  }

}
