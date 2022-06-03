import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  div1: boolean = false;
  constructor() { }
  onClick(){
    this.div1=true;
  }
  ngOnInit(): void {
  }

}
