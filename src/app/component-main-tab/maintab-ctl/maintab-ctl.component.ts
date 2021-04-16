import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintab-ctl',
  templateUrl: './maintab-ctl.component.html',
  styleUrls: ['./maintab-ctl.component.css']
})
export class MaintabCtlComponent implements OnInit {
  activeTab = "tab-history";
  eventData : String;

  constructor() { }
  ngOnInit(): void {
  }
  onReceiveEventFromChild(eventData: String) {
    console.debug('onReceiveEventFromChild---------[' + eventData + ']');
    this.eventData = eventData;
    this.activeTab = eventData.toString();
  }
//  activeId():void{
//    console.log('MaintabCtlComponent::activeId');
//  }

}
