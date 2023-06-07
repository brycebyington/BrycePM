import { Component } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-root',
  template: `
    <input type="file" (change)="onFileSelected($event)">
    <div *ngIf="bpm$">{{ bpm$ }}</div>
  `
})
export class AppComponent {

  bpm$!: number;

  constructor(private uploadService: UploadService) { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadService.uploadFile(file).subscribe(() => {
        setTimeout(() => {
          this.uploadService.getBpm().subscribe(data => {
            this.bpm$ = data.bpm;
          });
        }, 5000);
      });
    }
  }
}
