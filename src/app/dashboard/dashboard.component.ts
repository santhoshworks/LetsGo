import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { VoteComponent } from '../vote/vote.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  db: any;
  items: Observable<any[]>;
  selectedPoll: any;
  @ViewChild(VoteComponent)
  private voteComponent: VoteComponent;

  constructor(db: AngularFireDatabase) {
    this.items = db.list('letsgoplaces/Polls').valueChanges();
  }

  ngOnInit() {
  }
  setSelectedPoll(poll) {
    this.selectedPoll = poll;
    this.voteComponent.showModal();
  }
}
