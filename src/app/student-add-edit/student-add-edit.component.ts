import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.scss'],
})
export class StudentAddEditComponent implements OnInit {
  subjectList: string[] = [
    'Sinhala',
    'Mathematics',
    'Science',
    'History',
    'English',
  ];
  StudentForm: FormGroup;
  items: any[] = [];
  grade: string = '';

  addSubject() {
    this.items.push({
      index: this.items.length + 1,
      value: 0,
      grade: '',
    });
  }
  marksOnChange(mark: string) {
    let markValue = Number(mark);
    let grade;
    if (markValue >= 0 && markValue <= 35) {
      grade = 'F';
    } else if (markValue > 35 && markValue < 55) {
      grade = 'C';
    } else if (markValue > 55 && markValue < 75) {
      grade = 'B';
    } else if (markValue > 75 && markValue <= 100) {
      grade = 'A';
    }
    this.StudentForm.get('grade')?.setValue(grade);
  }

  constructor(
    private _fb: FormBuilder,
    private _empService: StudentService,
    private _dialogRef: MatDialogRef<StudentAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.StudentForm = this._fb.group({
      id: '',
      name: '',
      gender: '',
      bod: '',
      subject: '',
      mark: '',
      grade: '',
      remark: '',
    });
  }

  ngOnInit(): void {
    this.StudentForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.StudentForm.valid) {
      if (this.data) {
        this._empService.updateStudent(this.StudentForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Student detail updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._empService.addStudent(this.StudentForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Student added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
