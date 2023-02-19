import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MustMatch } from 'src/_validator/password_validator';
import { TeacherAuthService } from 'src/app/service/teacher-auth.service';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loginForm!: FormGroup;
  public socialUser: SocialUser = new SocialUser
  isLoggedin?: boolean;
  loading: boolean = true
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,

    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute, private _snackBar: MatSnackBar,
    private teacherService: TeacherAuthService) {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", [Validators.required]],
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      psw_repeat: ["", [Validators.required]],
      remember: ["", Validators.requiredTrue]
    }, { validator: MustMatch('password', 'psw_repeat') });
  }
  hide = true;
  get passwordInput() { return this.registerForm.get('password'); }
  public onSubmit() {
    this.teacherService.registerUser(this.registerForm.value)
      .subscribe(data => {
        this.loading=false;

        this._snackBar.open("Registered successfully, please verify your email.", "Ok", {
          duration: 5000,
          panelClass: ['blue-snackbar']
        });
        this.registerForm.reset();
        this.router.navigate(['/authenticate/login'], { relativeTo: this.route });

      },
        err => {
          this._snackBar.open("There is already an account with this email, Please login.", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
          });
          console.log(err)

          this.registerForm.reset();
        });
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
  }
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(res => {
      console.log(res.idToken)
      this.teacherService.signInWithGoogle(res.idToken)
      .subscribe(data => {
        console.log(data)
      })
    })

  }
  logOut(): void {
    this.socialAuthService.signOut();
  }
}
