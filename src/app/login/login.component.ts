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

async checkLogin(){
  let verify = await this.data.getData(this.UID, this.pwd);
  if(verify){
    this.router.navigateByUrl("/account");
    localStorage.setItem("valid", "true");
    localStorage.setItem("username", this.UID);
  }
  console.log(verify);
    }


    ngOnInit() {

    
    }
}
