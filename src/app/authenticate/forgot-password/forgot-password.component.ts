import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotForm: FormGroup = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
  });

  constructor(private teacherService: TeacherAuthService, private _snackBar: MatSnackBar) { }
  public onSubmit() {
    this.teacherService.forgotPassword(this.forgotForm.value)
      .subscribe(res => {
        console.log(res)
        this._snackBar.open("A password reset link sent to your email, Please check.", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.forgotForm.reset();
      }, err => {
        this._snackBar.open('There is no account assosiated with this email', 'Ok', {
          duration: 5000,
          panelClass: ['blue-snackbar']
        })
      });
  }
  ngOnInit(): void {
  }

}
