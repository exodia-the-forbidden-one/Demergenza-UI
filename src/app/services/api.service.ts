import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = "https://demergenza.com/api";

  constructor(private http: HttpClient) { }

  get(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get(url);
  }

  post(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.post<any>(url, data);
  }

  delete(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.delete<any>(url);
  }
}
