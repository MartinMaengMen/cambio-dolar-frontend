import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Divisa } from '../_model/divisa.response';
@Injectable({
  providedIn: 'root',
})
export class DivisaService {
  private url = 'https://jlwl9p6pxd.execute-api.us-east-1.amazonaws.com';
  constructor(private http: HttpClient) {}

  getDivisa() {
    return this.http.get<Divisa>(this.url);
  }
}
