import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      { label: "Ana Sayfa", url: "/" },
      { label: "İletişim", url: "iletisim" }
    ];
  }


}
