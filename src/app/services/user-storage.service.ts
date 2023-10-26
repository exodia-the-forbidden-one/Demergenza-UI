import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  public userName$ = new BehaviorSubject<string>("");
  public role$ = new BehaviorSubject<string>("");
  
  constructor() { }
  
    public getRoleFromStore(){
      return this.role$.asObservable();
    }
  
    public setRoleForStore(role:string){
      this.role$.next(role);
    }
  
    public getUserNameFromStore(){
      return this.userName$.asObservable();
    }
  
    public setUserNameForStore(username:string){
      this.userName$.next(username)
    }
  }