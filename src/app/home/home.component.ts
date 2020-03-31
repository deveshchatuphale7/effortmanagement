import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedView:string;
  username:string;
  password:string;
  constructor(private router:Router) { }
  
  public login():void{
    if(this.username == "user1" && this.password == "user1")
    {
      switch(this.selectedView){
        case "state":{
          this.router.navigate(["/state-level"]);
  
          break;
        }
        case "district":{
          this.router.navigate(["/district-level"]);
          break;
        }
        case "mo":{
          this.router.navigate(["/mo-level"]);
          break;
        }
      }
    }
  }

  ngOnInit() {
  }

}
