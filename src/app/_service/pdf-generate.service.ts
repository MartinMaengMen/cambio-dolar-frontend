import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfGenerateService {
  constructor(private http: HttpClient) {}

  createPdf(dataPdf: any) {
    let header = new HttpHeaders().set('Content-type', 'application/pdf');
    const { name, monto, cod_operacion, message } = dataPdf;
    return this.http
      .get(
        `https://57bsw1dx64.execute-api.us-east-2.amazonaws.com/dev/?name=${name}&monto=${monto}&cod_operacion=${cod_operacion}&message=${message}`,
        { headers: header }
      )
      .pipe(
        map((resp) => resp),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}
