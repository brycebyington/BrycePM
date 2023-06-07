import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post('http://147.182.162.101/upload', formData, { responseType: 'text' });
  }

  getBpm(): Observable<any> {
    return this.http.get('http://147.182.162.101/bpm');
  }
}
