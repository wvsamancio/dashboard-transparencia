import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ImportService } from '../../services/import.service';
import { Document } from '../../interfaces/document';

import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],
})
export class ImportComponent {
  private document: Document = {} as Document;
  private csvSaved: Document = {} as Document;
  public success: boolean = false;
  public file: any = {};

  constructor(
    private importService: ImportService,
    private afStorage: Storage
  ) { }

  public onSubmit(importForm: NgForm): void {
    const storageRef = ref(this.afStorage, 'csv/' + this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.document.url = downloadURL;
          this.document.category = importForm.value.category;
          this.document.startPeriod = importForm.value.startPeriod;
          this.document.endPeriod = importForm.value.endPeriod;
          this.document.headerIndex = importForm.value.headerIndex;

          this.importService.import(this.document).subscribe({
            next: (next) => {
              this.csvSaved = next;
              this.success = true;
              importForm.reset();
            },
            error: (error) => {
              console.log(error);
            },
          });
        });
      }
    );
  }

  chooseFile(event: any) {
    this.file = event.target.files[0];
  }
}
