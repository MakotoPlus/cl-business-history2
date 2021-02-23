import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintab-ctl',
  templateUrl: './maintab-ctl.component.html',
  styleUrls: ['./maintab-ctl.component.css']
})
export class MaintabCtlComponent implements OnInit {
  activeTab = "tab-history";

  constructor() { }
  ngOnInit(): void {
  }

//  activeId():void{
//    console.log('MaintabCtlComponent::activeId');
//  }

}
