import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentReaderService {

  constructor(private api: ApiService) { }

  GetAboutUsContent(): Observable<any> {
    return this.api.get("get-content/about-us");
  }

  
}
