import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuReaderService {
  constructor(private api: ApiService) { }

  getAllCategories(): Observable<any> {
    return this.api.get("menu/getallcategories");
  }

  getCategoryById(id: string): Observable<any> {
    return this.api.get("menu/getcategorybyid/" + id);
  }
}
