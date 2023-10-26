import { Component, OnInit } from '@angular/core';

import { ConfirmationService, ConfirmEventType } from 'primeng/api';

import { UserStorageService } from 'src/app/services/user-storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sidebarVisible: boolean = false;
  admin: string = "";

  constructor(private authService: AuthService, private userStorage: UserStorageService, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.userStorage.getUserNameFromStore().subscribe(
      admin => {
        const adminFromAuth = this.authService.getUserName();
        this.admin = admin || adminFromAuth;
      }
    )

  }

  logoutDialog() {
    this.confirmationService.confirm({
      message: 'Oturumu kapatmak istiyor musun?',
      header: 'Çıkış yap',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'Çıkış yap!',
      rejectLabel:'İptal',
      dismissableMask:true,
      accept: () => {
        this.logout();
      }
    })
  }

  logout() {
    this.authService.signOut();
  }

}
