import { Component, OnInit } from '@angular/core';
import { Poll } from '../model/newPoll';

class Options {
  value: string;

  constructor(value: string) {
    this.value = value;
  }
}

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  choices: Object[];

  constructor() {}

  ngOnInit() {
    this.choices = [
      new Options(''),
      new Options(''),
      new Options('')
    ];
  }

  addMore() {
    const choices = new Options('');
    this.choices.push(choices);
  }
}
