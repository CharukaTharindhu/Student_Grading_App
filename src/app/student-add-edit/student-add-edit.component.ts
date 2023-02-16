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
  empForm: FormGroup;
  items: any[] = [];
  grade: string = '';

  addSubject() {
    this.items.push({
      index: this.items.length + 1,
      value: 0,
      grade: '',
    });
  }
  marksOnChange(index: number) {
    alert(this.items[index].value + ' ' + index); // this.items[index].value
    if (this.items[index].value >= 0 && this.items[index].value <= 35) {
      this.items[index].grade = 'F';
    } else if (this.items[index].value > 35 && this.items[index].value <= 55) {
      this.items[index].grade = 'C';
    } else if (this.items[index].value > 55 && this.items[index].value <= 75) {
      this.items[index].grade = 'B';
    } else if (this.items[index].value > 75 && this.items[index].value <= 100) {
      this.items[index].grade = 'A';
    }
  }

  constructor(
    private _fb: FormBuilder,
    private _empService: StudentService,
    private _dialogRef: MatDialogRef<StudentAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      name: '',
      gender: '',
      dob: '',
      subject: '',
      mark: '',
      grade: '',
      remark: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateStudent(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Student detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addStudent(this.empForm.value).subscribe({
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
