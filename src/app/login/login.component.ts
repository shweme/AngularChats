import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
UID = "";
pwd = "";
emails = ["Shweme", "Witchell", "Alien"];
passwd = ["123", "456", "789"];
  constructor(private router: Router, private data: DataService) {  }

checkLogin(){
  let test = this.data.getData(this.UID, this.pwd);
  if(test){
    this.router.navigateByUrl("/account");
    localStorage.setItem("valid", "true");
    localStorage.setItem("username", this.UID);
  }
  console.log(test);
    }


    ngOnInit() {

    
    }
}
