import { Component } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-root',
  template: `
  <div class="center-container">
  <h1 style="color: #FFFFFF">BrycePM - MP3 to BPM+</h1>
  <form>
  <div class="upload-container">
    <label class="form-label" style="color: #FFFFFF">Select an MP3 File:</label>
    <div class="custom-file">
      <input type="file" (change)="onFileSelected($event)" class="form-control">
    </div>
  </div>
  <div *ngIf="isLoading" class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  <div *ngIf="bpm$" class="alert alert-primary mt-3">BPM: {{ bpm$ }}</div>
  <div *ngIf="key$" class="alert alert-primary mt-3">Key: {{ key$ }}<span *ngIf="alt_key_info$">, {{alt_key_info$}}</span></div>
  <div *ngIf="offset$" class="alert alert-primary mt-3">Offset: {{ offset$ }} ms</div>
</form>
</div>

  `
})
export class AppComponent {

  alt_key_info$!: string;
  key$!: string;
  bpm$!: number;
  offset$!: number;
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
            this.key$ = data.key;
            this.alt_key_info$ = data.alt_key_info;
            this.offset$ = data.offset
            this.isLoading = false;
          });
        }, 1000);
      });
    }
  }
}
