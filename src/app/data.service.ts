import { Injectable } from '@angular/core';
import { HttpClient}  from '@angular/common/http';
import {Observable} from 'rxjs';

const SERVER_URL = '../../server/auth/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  

  constructor( private http : HttpClient) { }

  public getData(UID:string, pwd:string): any {
    this.http.get(SERVER_URL).subscribe(res =>{
      console.log(res);
    });
  return(true);
  }
}
