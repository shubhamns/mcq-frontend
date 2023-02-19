import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/_validator/password_validator';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private teacherService: TeacherAuthService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      conpass: ["", [Validators.required]],
    }, { validator: MustMatch('password', 'conpass') });
  }
  hide = true;
  get passwordInput() {
    return this.resetForm.get('password');
  }

  ngOnInit(): void {
    const token = this.route.snapshot.params['token'];
    const userId = this.route.snapshot.params['userId'];

    this.teacherService.requestResetPassword(userId, token)
      .subscribe(res => {
        this._snackBar.open('reset your password', "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        })
      }, err => {
        // if (err?.error?.type === 'token-expired')
        this._snackBar.open("The password reset link has been expired. Please request forgot password.", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.router.navigate(['/authenticate/forgotPassword']);
      })
  }
  onSubmit() {
    const token = this.route.snapshot.params['token'];
    const userId = this.route.snapshot.params['userId'];
    this.teacherService.resetPassword(userId, token, this.resetForm.value)
      .subscribe(res => {
        this._snackBar.open("Your password has been changed. You can login now.", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.resetForm.reset();
        this.router.navigate(['/authenticate/login']);
      }, err => {
        console.log(err)
        this._snackBar.open("The password reset link has been expired", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });

        // if (err?.error?.type === 'token-expired')
        //   this._snackBar.open("The password reset link has been expired", "Ok");
      })
  }
}
