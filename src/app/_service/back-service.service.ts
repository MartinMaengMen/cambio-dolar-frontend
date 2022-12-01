import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../_model/card.response';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BackServiceService {
  private url: string = `https://0i2exyy104.execute-api.us-east-2.amazonaws.com/card`;
  constructor(private http: HttpClient) {}

  getCard(accountNumber: string) {
    return this.http.get<Card>(`${this.url}/${accountNumber}`).pipe(
      map((resp) => resp),
      catchError(this.handleError)
    );
  }

  updateCard(accountNumber: string, availableMoney: any) {
    return this.http
      .put<Card>(`${this.url}/${accountNumber}`, availableMoney)
      .pipe(
        map((resp) => resp),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}
