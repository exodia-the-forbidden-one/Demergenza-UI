import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuReaderService {
  constructor(private api: ApiService) { }

  getAllCategories(): Observable<any> {
    return this.api.get("category/getallcategories");
  }

  getCategoryById(id: string): Observable<any> {
    return this.api.get("category/getcategorybyid/" + id);
  }

  getAllMenusByCategoryName(name: string): Observable<any> {
    return this.api.get("menu/getallmenusbycategoryname/" + name);
  }
}
