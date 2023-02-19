import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  // changeForm: FormGroup;
  public changeForm: FormGroup = new FormGroup({
    oldPassword: new FormControl("", [
      Validators.required
    ]),
    password: new FormControl("",
      [Validators.required, Validators.minLength(8)])
  });
  constructor(private teacherService: TeacherAuthService,
    private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.teacherService.changePassword(this.changeForm.value)
      .subscribe(data => {
        this.snackbar.open('Your password has been changed', 'Ok', {
          duration: 5000,
          panelClass: ['blue-snackbar']
        })
        this.router.navigate(['/user/profile'])
        this.changeForm.reset();
        console.log(data)
      }, err => {
        this.snackbar.open('Your old password is incorrect', 'Ok', {
          duration: 5000,
          panelClass: ['blue-snackbar']
        })
        console.log(err)
      })
  }
  hide = true;

}
