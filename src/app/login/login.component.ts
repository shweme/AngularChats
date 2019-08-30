import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {  }

checkLogin(){
      for (var i = 0; i < this.emails.length; i++){
        if( (this.UID == this.emails[i]) && (this.pwd == this.passwd[i])){
          this.router.navigateByUrl("/account");
        }
      }
    }


    ngOnInit() {

    
    }
}
