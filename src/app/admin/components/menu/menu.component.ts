import { Component, OnInit, ViewChild } from '@angular/core';
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
  category: Category;
  categories: Category[];
  addCategoryDialogVisible: boolean = false;
  updateCategoryDialogVisible: boolean = false;
  addCategoryForm: FormGroup;
  updateCategoryForm: FormGroup;
  isImageChanged: boolean = false;

  constructor(
    private fb: FormBuilder,
    private menuReaer: MenuReaderService,
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
    })

    this.updateCategoryForm = this.fb.group({
      updateCategoryName: ['', Validators.required],
      updateCategoryImage: new FormControl()
    })
  }

  hideDialogHandler(){
    this.addCategoryImageUploadElement.clear();
    this.updateCategoryImageUploadElement.clear();
  }

  getCategories() {
    this.menuReaer.getAllCategories().subscribe({
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
    console.log(this.updateCategoryForm.value)
  }
  addCategoryImageUploadEvent(event) {
    for (let file of event.files) {
      this.addCategoryForm.patchValue({ addCategoryImage: file });
      this.addCategoryForm.get('addCategoryImage').updateValueAndValidity();
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
          console.warn(error.message)
        }
      })
      this.addCategoryDialogVisible = false;
    } else {
      console.warn("tüm alanları doldurun")
    }
  }


  updateCategory() {
    if (this.updateCategoryForm.valid) {
      const formData = new FormData();
      if (this.isImageChanged) {
        console.log("imagechangedwork")
        this.updateCategoryImageUploadElement.upload()
        formData.append('categoryImage', this.updateCategoryForm.value.updateCategoryImage, this.updateCategoryForm.value.updateCategoryImage.name);
      }
      formData.append('CategoryName', this.updateCategoryForm.value.updateCategoryName);
      formData.append("adminUsername", this.auth.getUserName())
      console.log(this.updateCategoryForm.value)
      this.menuWriter.updateCategory(this.category.id, formData).subscribe({
        next: () => {
          this.getCategories();
        },
        error: (error) => {
          console.warn(error.message)
        }
      })
      this.updateCategoryImageUploadElement.clear();
      this.updateCategoryDialogVisible = false;
    } else {
      console.warn("tüm alanları doldurun")
    }
  }

  removeCategoryDialog(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Kategoriyi silmek istiyor musunuz?',
      header: 'Çıkış yap',
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
            console.log("hata " + err.message)
          }
        })
      }
    })
  }
}