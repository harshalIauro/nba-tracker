import { ENVIRONMENT } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  setStorage(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getStorage(key: string): any {
    const data = sessionStorage.getItem(key);
    return data && data !== 'undefined' ? JSON.parse(data) : null;
  }

  callGetApi(apiurl: string): Observable<any> {
    return this.http
      .get(apiurl, {
        headers: ENVIRONMENT.headers,
      })
      .pipe(
        map(
          (data: any) => { return data },
          (error: Error) => { return error }
        )
      );
  }

}
