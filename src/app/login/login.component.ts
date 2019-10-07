import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
UID = "";
pwd = "";
verify = true;
//emails = ["Shweme", "Witchell", "Alien"];
//passwd = ["123", "456", "789"];
  constructor(private router: Router, private data: DataService) {  }


async checkLogin(){
  this.verify = await this.data.getData(this.UID, this.pwd);
  if(this.verify){
    this.router.navigateByUrl("/account");
    localStorage.setItem("valid", "true");
    localStorage.setItem("username", this.UID);
  }
  console.log(this.verify);
    }

/*
A: arrive on page         /login    verify=false
    not logged in
    error not visible
B: fail                   /login    verify=true
    not logged in
    error visible
C: succeed                /account
    logged in
    error not visible

    A --- B --- C
*/

    ngOnInit() {

    
    }
}
