import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: String;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.getData();
  }
  getData(): void {
    this.auth.getData().subscribe(
      result => {
        console.log('HomeComponent::getData');
        console.log(result);
        console.log('result.attributes');
        console.log(result.attributes);
        //this.username = result.username;
        this.username = result.attributes.family_name + ' ' + result.attributes.given_name;
      },
      error => {
        console.log('HomeComponent::getData()');
        console.log(error);
      }
    );
  }
}
