import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md/modals/modal.directive';
@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  @Input() selectedPoll: any;
  @ViewChild(ModalDirective)
  private modal: ModalDirective;
  constructor(
  ) {
  }

  ngOnInit() {
        // initialize scrollspy
  }
  showModal() {
    this.modal.show();
  }
}
