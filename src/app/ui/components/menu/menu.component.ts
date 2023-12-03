import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Menu } from "src/app/models/menu.model"
import { MenuReaderService } from 'src/app/services/Repositories/menu-reader.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private route: ActivatedRoute, private menuRead: MenuReaderService) { }
  Menus: Menu[];
  categoryName: string;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('categoryName');
    });

    this.menuRead.getAllMenusByCategoryName(this.categoryName).subscribe({
      next: (data) => {
        this.Menus = data;
      },
      error: (err) => {
        console.error(err.message)
      }
    })
  }
}
