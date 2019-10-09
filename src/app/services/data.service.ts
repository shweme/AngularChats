import { Injectable } from '@angular/core';
import { HttpClient}  from '@angular/common/http';
import {Observable} from 'rxjs';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http : HttpClient) { }

  public getData(name:string, pwd:string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/login`, { name, pwd }).subscribe(res =>{
        resolve(res as boolean);
      });
    });
  }


  public userAcc(name:string): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/account`, {name}).subscribe( res => {
        console.log(res);
        resolve(res as Object);
      });
    });
  }

  public groupData(): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/group`, {}).subscribe(res => {
        console.log(res);
        resolve(res as Object);
      });
    });
  }

  public channelData(name:string): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/channel`, {name}).subscribe( res => {
        console.dir(res);
        resolve(res as Object);
      });
    });
  }
}