import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [
      Validators.required,
    ]),
    password: new FormControl("",
      [Validators.required])
  });
  constructor(private teacherService: TeacherAuthService,
    private _snackBar: MatSnackBar, private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.teacherService.loginUser(this.loginForm.value, true)
      .subscribe(res => {
        if (res.user.isVerified == true) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', res.user.name);
          localStorage.setItem('id', res.user._id);
          localStorage.setItem("isLoggedIn", "true");

          this._snackBar.open("You have logged in successfully", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
          this.loginForm.reset();
          this.router.navigate(['/user/profile']);
        }
        else {
          this._snackBar.open("Please verify your email first", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
        }
      },
        err => {
          this._snackBar.open("Incorrect Email or Password", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
        })
  }
  hide = true;
  get passwordInput() {
    return this.loginForm.get('password');
  }
}
