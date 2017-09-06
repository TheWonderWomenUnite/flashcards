import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-make-start',
  templateUrl: './make-start.component.html',
  styleUrls: ['./make-start.component.css']
})
export class MakeStartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	console.log("Hi from MakeStartComponent");
  }

}
