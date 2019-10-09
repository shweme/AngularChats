import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

import {Observable} from 'rxjs';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http : HttpClient, private router: Router) { }

  //retrieving data for password validation
  public getData(name:string, pwd:string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/login`, { name, pwd }).subscribe(res =>{
        resolve(res as boolean);
      });
    });
  }

  //retrieiving user's account data
  public userAcc(name:string): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/account`, {name}).subscribe( res => {
        console.log(res);
        resolve(res as Object);
      });
    });
  }

  //user's group list
  public groupData(): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/group`, {}).subscribe(res => {
        console.log(res);
        resolve(res as Object);
      });
    });
  }

  //channel list of user
  public channelData(name:string): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/channel`, {name}).subscribe( res => {
        console.dir(res);
        resolve(res as Object);
      });
    });
  }

  //messages retrieval for diaplaying on chat page
  public messages(CID:string): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/messages`, {CID}).subscribe(res => {
        resolve(res as Object);
      });
    });
  }


  public validateUser(){
    var valid = localStorage.getItem("valid");
    if(!valid){
      this.router.navigate(["/login"]);
    }
    else{
      return true;
    }
  }
}