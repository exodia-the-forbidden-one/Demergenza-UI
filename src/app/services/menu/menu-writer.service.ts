import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, Subscribable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuWriterService {

  constructor(private api: ApiService) { }


  addCategory(formData: FormData): Observable<any> {
    return this.api.post("menu/addcategory", formData);
  }

  updateCategory(id: string, formData: FormData): Observable<any> {
    return this.api.post("menu/updatecategory/" + id, formData);
  }

  deleteCategory(id: string): Observable<any> {
    return this.api.delete("menu/deletecategory/" + id);
  }

  addMenu(formData: FormData): Observable<any> {
    return this.api.post("menu/addmenu", formData);
  }

  deleteMenu(id: string): Observable<any> {
    return this.api.delete("menu/deletemenu/" + id);
  }

  updateMenu(formData: FormData): Observable<any> {
    return this.api.post("menu/updatemenu", formData);
  }
}
