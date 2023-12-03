import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentWriterService {

  constructor(private api: ApiService) { }
  SetAboutUsContent(data: FormData): Observable<any> {
    return this.api.post("set-content/about-us", data);
  }
}
