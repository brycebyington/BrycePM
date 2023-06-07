import { Component } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-root',
  template: `
  <form>
  <div class="upload-container">
    <label class="form-label">Select an MP3 File:</label>
    <div class="custom-file">
      <input type="file" (change)="onFileSelected($event)" class="form-control">
    </div>
  </div>
  <div *ngIf="isLoading" class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  <div *ngIf="bpm$" class="alert alert-primary mt-3">BPM: {{ bpm$ }}</div>
</form>

  `
})
export class AppComponent {

  bpm$!: number;
  isLoading: boolean = false;

  constructor(private uploadService: UploadService) { }

  onFileSelected(event: any) {
    this.isLoading = true;
    const file = event.target.files[0];
    if (file) {
      this.uploadService.uploadFile(file).subscribe(() => {
        setTimeout(() => {
          this.uploadService.getBpm().subscribe(data => {
            this.bpm$ = data.bpm;
            this.isLoading = false;
          });
        }, 0);
      });
    }
  }
}
