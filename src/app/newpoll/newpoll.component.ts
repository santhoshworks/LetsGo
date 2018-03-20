import { Component, OnInit } from '@angular/core';
import { Poll } from '../model/newPoll';
// import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-newpoll',
  templateUrl: './newpoll.component.html',
  styleUrls: ['./newpoll.component.scss']
})
export class NewpollComponent {

  // newPoll: Poll;
  // newPoll = {};
  polls: AngularFireList<any>;
  constructor(db: AngularFireDatabase) {
    this.polls = db.list('letsgoplaces/Polls');
  }

  onSubmit(newPoll) {
    console.log(newPoll);
    const dbObj = {
      options: []
    };
    for (const key in newPoll.value) {
      if (newPoll.value[key]) {
        if (key.indexOf('option') >= 0) {
          dbObj.options.push(newPoll.value[key]);
        } else {
          dbObj[key] = newPoll.value[key];
        }
      }
    }
    this.polls.push(dbObj).then((data) => {console.log('return items', data); });
    return;
  }

}
