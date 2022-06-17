import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  div1:boolean=false;
  div2:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  div1Function(){
      this.div1=true;
      this.div2=false;
  }
  div2Function(){
    this.div1=false;
    this.div2=true;
}
}
