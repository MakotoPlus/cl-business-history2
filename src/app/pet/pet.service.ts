import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private Url = environment.apiBaseUrl + '/pets';

  constructor(private http: HttpClient) {}

  public getPets(token: string): Observable<any> {
    const httpOptions = {
      headers: { Authorization: token }
    };
    return this.http.get<any>(this.Url, httpOptions).pipe(
      tap(users => users),
      catchError(this.handleError('getFile', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('petService: ' + message);
  }
}
