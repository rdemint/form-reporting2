import { Component, OnInit,} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../models';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: string[];
  authError = false;
  otherError = false;
  constructor(private authService: AuthService) {   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('jane@carolinahealth.com', [Validators.email, Validators.required]),
      'password': new FormControl('testpassword', Validators.required),
    });

  }

  login() {
      this.authService.login(this.loginForm.value)
        .subscribe(
          (data) => {
            this.authError = false;
            this.authService.updateData(data);
            this.authService.navigateByUserType(data);
          },
          (err) => {
            if (err.status === 400) {
              this.authError = true;
            }

            else {
              this.otherError = true;
            }
          }
      );
  }

 }
