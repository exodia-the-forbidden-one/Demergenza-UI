import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { AboutUsModel } from 'src/app/models/about-us.model';
import { ContentReaderService } from 'src/app/services/Repositories/content-reader.service';
import { ContentWriterService } from 'src/app/services/Repositories/content-writer.service';
import { ContactModel } from 'src/app/models/contact.model';

@Component({
  selector: 'app-modify-content',
  templateUrl: './modify-content.component.html',
  styleUrls: ['./modify-content.component.css']
})
export class ModifyContentComponent implements OnInit {

  AboutUs: AboutUsModel;
  Contact: ContactModel;
  isImageChanged: boolean;
  updateAboutUsForm: FormGroup;
  @ViewChild('updateAboutUsImageUploadElement') updateAboutUsImageUploadElement: FileUpload;

  constructor(private fb: FormBuilder, private contentWriter: ContentWriterService, private contentRedaer: ContentReaderService) { }

  ngOnInit(): void {

    this.updateAboutUsForm = this.fb.group({
      abouUsImage: new FormControl(),
      aboutUsTextContent: ['']
    });

    this.contentRedaer.GetAboutUsContent().subscribe({
      next: (response: AboutUsModel) => {
        this.AboutUs = response;
        this.fillAboutUsFields();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    });
  }

  updateAboutUsImageUploadEvent(event) {
    for (let file of event.files) {
      this.updateAboutUsForm.patchValue({ abouUsImage: file });
      this.updateAboutUsForm.get('abouUsImage').updateValueAndValidity();
    }
  }

  updateAboutUs() {
    if (this.updateAboutUsForm.valid) {
      const formData = new FormData();
      if (this.isImageChanged) {
        this.updateAboutUsImageUploadElement.upload();
        formData.append('Image', this.updateAboutUsForm.value.abouUsImage, this.updateAboutUsForm.value.abouUsImage.name);
      }
      formData.append('TextContent', this.updateAboutUsForm.value.aboutUsTextContent);

      this.contentWriter.SetAboutUsContent(formData).subscribe({
        next: () => {
          this.contentRedaer.GetAboutUsContent().subscribe({
            next: (response: AboutUsModel) => {
              this.AboutUs = response;
            },
            error: (err: any) => console.log(err.message)
          })
        },
        error: (err: any) => console.log(err.message)
      })



    }
  }

  fillAboutUsFields() {
    this.updateAboutUsForm.patchValue({ aboutUsTextContent: this.AboutUs.textContent });
    this.updateAboutUsForm.get('aboutUsTextContent').updateValueAndValidity();
  }
}

