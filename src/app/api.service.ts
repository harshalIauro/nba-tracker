import { ENVIRONMENT } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { GlobalUrl } from './utils/global-urls';
import { GameDetails, TeamDetails, TeamList } from './utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  setStorage(key: string, value: TeamDetails[]): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getStorage(key: string): TeamDetails[] {
    const data: string | null = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  getAllTeams(): Observable<TeamList> {
    return this.http
      .get<TeamList>(GlobalUrl.getAllTeams, {
        headers: ENVIRONMENT.headers,
      })
      .pipe(
        tap(
          (data: TeamList) => { return data },
          (error: Error) => { return error }
        )
      );
  }

  getGameDetails(params: string): Observable<GameDetails> {
    return this.http
      .get<GameDetails>(GlobalUrl.getGameDetails.replace('{params}', params), {
        headers: ENVIRONMENT.headers,
      })
      .pipe(
        tap(
          (data: GameDetails) => { return data },
          (error: Error) => { return error }
        )
      );
  }

}
