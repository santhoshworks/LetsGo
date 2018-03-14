import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md/modals/modal.directive';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  @Input() selectedPoll: any;
  @ViewChild(ModalDirective)
  private modal: ModalDirective;
  private oldSelectedOptions = [];
  private newSelectedOptions = [];
  db: any;
  items: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.items = db.list('letsgoplaces/Polls').valueChanges();
  }

  ngOnInit() {
        // initialize scrollspy
        this.newSelectedOptions = this.oldSelectedOptions;
  }
  showModal() {
    this.modal.show();
  }
  closeModal() {
    this.modal.hide();
  }
  updateCheckedOptions(option, event) {
    if (this.newSelectedOptions.indexOf(option) > -1) {
      this.newSelectedOptions.splice(option, 1);
    } else {
      this.newSelectedOptions.push(option);
    }
  }
  postData() {

  }
}
