import { Component } from '@angular/core';
import { Category } from './category.model';
import { MenuReaderService } from 'src/app/services/menu/menu-reader.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  public Categories: Category[];

  constructor(private menuReader: MenuReaderService) {
  }

  ngOnInit() {
    this.menuReader.getAllCategories().subscribe({
      next: (data) => {
        this.Categories = data
      }
    })
  }
}
