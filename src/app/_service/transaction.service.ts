import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Transaction } from '../_model/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private url: string = `https://40d4o8ldn3.execute-api.us-east-1.amazonaws.com/transaction`;
  constructor(private http: HttpClient) {}

  createTransaction(dataTransaction: Transaction) {
    return this.http.post(this.url, dataTransaction).pipe(
      map((resp) => resp),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}
