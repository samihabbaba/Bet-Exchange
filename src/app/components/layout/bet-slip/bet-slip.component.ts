import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.css']
})
export class BetSlipComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fontAwesomeIcons = {
    exit: faTimes
  }
}
