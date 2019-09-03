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
}