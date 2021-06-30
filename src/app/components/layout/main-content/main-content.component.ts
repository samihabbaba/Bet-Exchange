import { Component, OnInit } from '@angular/core';
import { faFutbol, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
  host: {
    class: 'main-content'
  }
})
export class MainContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fontAwesomeIcons = {
    footBall : faFutbol,
    exit: faTimes,

  }

}
