import { Component, OnInit } from '@angular/core';
import { ContentReaderService } from 'src/app/services/Repositories/content-reader.service';
import { AboutUsModel } from 'src/app/models/about-us.model';
import { HttpErrorResponse } from '@angular/common/http';

import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  constructor(private contentReader: ContentReaderService,) { }
  aboutUsContent: AboutUsModel;
  items: MenuItem[];

  ngOnInit(): void {
    this.contentReader.GetAboutUsContent().subscribe({
      next: (data: AboutUsModel) => {
        this.aboutUsContent = data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    })

    this.items = [
      { label: "Ana Sayfa", url: "/" },
      { label: "Hakkımızda", url: "hakkimizda" }
    ];

  }
}
