import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private _http: HttpClient) {}

  addStudent(data: any): Observable<any> {
    return this._http.post('https://localhost:7011/api/controller/', data);
  }

  updateStudent(data: any): Observable<any> {
    return this._http.put(
      'https://localhost:7011/api/controller/UpdateStudent',
      data
    );
  }

  getStudentList(): Observable<any> {
    return this._http.get('https://localhost:7011/api/controller/');
  }

  deleteStudent(id: any): Observable<any> {
    return this._http.delete(`https://localhost:7011/api/controller/${id}`);
  }
}
