import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  db: any;
  items: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.items = db.list('letsgoplaces/Polls').valueChanges();
  }

  ngOnInit() {
  }

}
