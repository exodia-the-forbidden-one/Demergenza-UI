import { Component, OnInit, ViewChild, ViewRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'

import { FileUpload } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Category, Menu } from '../../../models/menu.model';
import { AuthService } from 'src/app/services/auth.service';
import { MenuReaderService } from '../../../services/menu/menu-reader.service';
import { MenuWriterService } from '../../../services/menu/menu-writer.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  @ViewChild('addCategoryImageUploadElement') addCategoryImageUploadElement: FileUpload;
  @ViewChild('updateCategoryImageUploadElement') updateCategoryImageUploadElement: FileUpload;
  @ViewChild('addMenuImageUploadElement') addMenuImageUploadElement: FileUpload;
  @ViewChild('updateMenuImageUploadElement') updateMenuImageUploadElement: FileUpload;
  category: Category;
  categories: Category[];
  menu: Menu;
  addCategoryDialogVisible: boolean = false;
  updateCategoryDialogVisible: boolean = false;
  addMenuDialogVisible: boolean = false;
  updateMenuDialogVisible: boolean = false;
  addCategoryForm: FormGroup;
  addMenuForm: FormGroup;
  updateCategoryForm: FormGroup;
  updateMenuForm: FormGroup;
  isImageChanged: boolean = false
  categoryId: string;

  constructor(
    private fb: FormBuilder,
    private menuReader: MenuReaderService,
    private menuWriter: MenuWriterService,
    private auth: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {

    this.getCategories();

    this.addCategoryForm = this.fb.group({
      addCategoryName: ['', Validators.required],
      addCategoryImage: new FormControl()
    });

    this.updateCategoryForm = this.fb.group({
      updateCategoryName: ['', Validators.required],
      updateCategoryImage: new FormControl()
    });

    this.addMenuForm = this.fb.group({
      addMenuName: ['', Validators.required],
      addMenuIngredients: ['', Validators.required],
      addMenuPriceInput: ['', Validators.required],
      addMenuImage: new FormControl(),
    });

    this.updateMenuForm = this.fb.group({
      updateMenuName: ['', Validators.required],
      updateMenuIngredients: ['', Validators.required],
      updateMenuPriceInput: ['', Validators.required],
      updateMenuImage: new FormControl(),
    });
  }

  hideDialogHandler() {
    this.addCategoryImageUploadElement.clear();
    this.updateCategoryImageUploadElement.clear();
    this.addMenuImageUploadElement.clear();
    this.updateMenuImageUploadElement.clear();
  }

  getCategories() {
    this.menuReader.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data
      }
    })
  }

  showUpdateCategoryDialog(category: Category): void {
    this.category = category
    this.updateCategoryForm.patchValue({ updateCategoryName: this.category.name });
    this.updateCategoryForm.get('updateCategoryName').updateValueAndValidity();
    this.updateCategoryDialogVisible = true;
  }

  showAddCategoryDialog(): void {
    this.addCategoryDialogVisible = true;
  }

  updateCategoryImageUploadEvent(event) {
    for (let file of event.files) {
      this.updateCategoryForm.patchValue({ updateCategoryImage: file });
      this.updateCategoryForm.get('updateCategoryImage').updateValueAndValidity();
    }
  }

  addCategoryImageUploadEvent(event) {
    for (let file of event.files) {
      this.addCategoryForm.patchValue({ addCategoryImage: file });
      this.addCategoryForm.get('addCategoryImage').updateValueAndValidity();
    }
  }
  addMenuImageUploadEvent(event) {
    for (let file of event.files) {
      this.addMenuForm.patchValue({ addMenuImage: file });
      this.addMenuForm.get('addMenuImage').updateValueAndValidity();
    }
  }

  updateMenuImageUploadEvent(event) {
    for (let file of event.files) {
      this.updateMenuForm.patchValue({ updateMenuImage: file });
      this.updateMenuForm.get('updateMenuImage').updateValueAndValidity();
    }
  }

  addCategory() {
    if (this.addCategoryForm.valid) {
      this.addCategoryImageUploadElement.upload()

      const formData = new FormData();
      formData.append('CategoryName', this.addCategoryForm.value.addCategoryName);
      formData.append('CategoryImage', this.addCategoryForm.value.addCategoryImage, this.addCategoryForm.value.addCategoryImage.name);
      formData.append("adminUsername", this.auth.getUserName())

      this.menuWriter.addCategory(formData).subscribe({
        next: () => {
          this.getCategories();
        },
        error: (error) => {
          this.messageService.add({
            severity: "warn",
            summary: "Hata",
            detail: error.message,
          })
        }
      })
      this.addCategoryDialogVisible = false;
    } else {
      this.messageService.add({
        severity: "warn",
        summary: "Hata",
        detail: "Tüm alanları doldurun!",
      })
    }
  }

  updateCategory() {
    if (this.updateCategoryForm.valid) {
      const formData = new FormData();
      if (this.isImageChanged) {
        this.updateCategoryImageUploadElement.upload()
        formData.append('categoryImage', this.updateCategoryForm.value.updateCategoryImage, this.updateCategoryForm.value.updateCategoryImage.name);
      }
      formData.append('CategoryName', this.updateCategoryForm.value.updateCategoryName);
      formData.append("adminUsername", this.auth.getUserName())
      this.menuWriter.updateCategory(this.category.id, formData).subscribe({
        next: () => {
          this.getCategories();
        },
        error: (error) => {
          this.messageService.add({
            severity: "warn",
            summary: "Hata",
            detail: error.messag,
          })
        }
      })
      this.updateCategoryImageUploadElement.clear();
      this.updateCategoryDialogVisible = false;
    } else {
      this.messageService.add({
        severity: "warn",
        summary: "Hata",
        detail: "Tüm alanları doldurun!",
      })
    }
  }

  addMenu() {
    if (this.addMenuForm.valid) {

      this.addMenuImageUploadElement.upload();

      const formData = new FormData();
      formData.append('MenuName', this.addMenuForm.value.addMenuName);
      formData.append('MenuImage', this.addMenuForm.value.addMenuImage, this.addMenuForm.value.addMenuImage.name);
      formData.append("adminUsername", this.auth.getUserName());
      formData.append("menuIngredients", this.addMenuForm.value.addMenuIngredients);
      formData.append('MenuPrice', this.addMenuForm.value.addMenuPriceInput);
      formData.append('CategoryId', this.categoryId);

      this.menuWriter.addMenu(formData).subscribe({
        next: () => {
          this.getCategories();
        },
        error: (error) => {
          this.messageService.add({
            severity: "warn",
            summary: "Hata",
            detail: error.message,
          })
        }
      })
      this.addMenuDialogVisible = false;
    } else {
      this.messageService.add({
        severity: "warn",
        summary: "Hata",
        detail: "Tüm alanları doldurun!",
      })
    }
  }

  updateMenu(menuId: string) {
    if (this.updateMenuForm.valid) {
      this.updateMenuImageUploadElement.upload();

      const formData = new FormData();
      formData.append('MenuName', this.updateMenuForm.value.updateMenuName);
      formData.append('MenuImage', this.updateMenuForm.value.updateMenuImage);
      formData.append("adminUsername", this.auth.getUserName());
      formData.append("menuIngredients", this.updateMenuForm.value.updateMenuIngredients);
      formData.append('MenuPrice', this.updateMenuForm.value.updateMenuPriceInput);
      formData.append('CategoryId', this.categoryId);
      formData.append('id',menuId);

      this.menuWriter.updateMenu(formData).subscribe({
        next: () => {
          this.getCategories();
        },
        error: (error) => {
          this.messageService.add({
            severity: "warn",
            summary: "Hata",
            detail: error.message,
          })
        }
      })
      this.updateMenuDialogVisible = false;
    } else {
      this.messageService.add({
        severity: "warn",
        summary: "Hata",
        detail: "Tüm alanları doldurun!",
      })
    }
  }





  removeCategoryDialog(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Kategoriyi kalıcı olarak silmek istiyor musunuz?',
      header: 'Sil?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sil!',

      acceptButtonStyleClass: "p-button-danger",
      rejectLabel: 'İptal',
      dismissableMask: true,
      accept: () => {
        this.menuWriter.deleteCategory(categoryId).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Başarılı!', detail: 'Kategori silme işlemi başarılı!' })
            this.getCategories();
          },
          error: (err) => {
            this.messageService.add({
              severity: "warn",
              summary: "Hata",
              detail: err.message,
            })
          }
        })
      }
    })
  }

  removeMenuDialog(menuId: string) {
    this.confirmationService.confirm({
      message: 'Menüyü kalıcı olarak silmek istiyor musunuz?',
      header: 'Sil?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sil!',

      acceptButtonStyleClass: "p-button-danger",
      rejectLabel: 'İptal',
      dismissableMask: true,
      accept: () => {
        this.menuWriter.deleteMenu(menuId).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Başarılı!', detail: 'Menü silme işlemi başarılı!' })
            this.getCategories();
          },
          error: (err) => {
            this.messageService.add({
              severity: "warn",
              summary: "Hata",
              detail: err.message,
            })
          }
        })
      }
    })
  }


  showAddMenuDialog(categoryId: string) {
    this.addMenuDialogVisible = true;
    this.categoryId = categoryId
  }

  showUpdateMenuDialog(menu: Menu): void {
    this.menu = menu;
    var ingredientslist = menu.ingredients.split(',');
    this.updateMenuForm.patchValue({ updateMenuName: this.menu.name });
    this.updateMenuForm.get('updateMenuName').updateValueAndValidity();
    this.updateMenuForm.patchValue({ updateMenuIngredients: ingredientslist })
    this.updateMenuForm.get('updateMenuIngredients').updateValueAndValidity();
    this.updateMenuForm.patchValue({ updateMenuImage: this.menu.image });
    this.updateMenuForm.get('updateMenuImage').updateValueAndValidity();
    this.updateMenuForm.patchValue({ updateMenuPriceInput: this.menu.price });
    this.updateMenuForm.get('updateMenuPriceInput').updateValueAndValidity();
    this.updateMenuDialogVisible = true;
  }
}