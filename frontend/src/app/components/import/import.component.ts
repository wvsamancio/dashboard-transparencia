import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ImportService } from '../../services/import.service';
import { Document } from '../../interfaces/document';

import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],
})
export class ImportComponent {
  public category: Category = {} as Category;
  private document: Document = {} as Document;
  private csvSaved: Document = {} as Document;
  public success: boolean = false;
  public file: any = {};
  public isLoading: boolean = false;

  constructor(
    private importService: ImportService,
    private afStorage: Storage,
    private cdr: ChangeDetectorRef
  ) {
    let obj = JSON.parse(sessionStorage.getItem('currentCategory') ?? '{}');
    this.category = obj;
  }

  public onSubmit(importForm: NgForm): void {
    this.isLoading = true;
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
          this.document.category = this.category.name;
          this.document.startPeriod = importForm.value.startPeriod;
          this.document.endPeriod = importForm.value.endPeriod;
          this.document.headerIndex = importForm.value.headerIndex;

          this.importService.import(this.document).subscribe({
            next: (next) => {
              console.log("entrou")
              this.csvSaved = next;
              this.success = true;
              importForm.reset();

              // loading false
              //TODO: ver se é possível remover esse CDR
              // TODO: ver como fazer o finally
              this.isLoading = false;
              this.cdr.detectChanges();
            },
            error: (error) => {
              console.log(error);
              this.isLoading = false;
              this.cdr.detectChanges();
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
