import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub01tab-ctl',
  templateUrl: './sub01tab-ctl.component.html',
  styleUrls: ['./sub01tab-ctl.component.css']
})
export class Sub01tabCtlComponent implements OnInit {
  activeTab = "tab-history";

  constructor() { }

  ngOnInit(): void {
  }

}
