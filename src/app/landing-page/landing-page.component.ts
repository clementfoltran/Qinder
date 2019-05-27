import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RegisterParameter} from './services/register.parameter';
import {RegisterService} from './services/register.service';
import {RegisterReturn} from './services/register.return';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  /**
   * The broker form input
   *
   */
  public registerForm: FormGroup;
  /**
   * Boolean flag to mark form input submission
   *
   */
  public sendAttempt: boolean;
  public APIParameter: RegisterParameter;

  register() {
    alert(this.registerForm.valid);
    this.sendAttempt = true;
    if (this.registerForm.valid) {
      this.APIParameter = {
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('passwd').value,
        gender: this.registerForm.get('gender').value
      };
      console.log(`${this.APIParameter.email} ${this.APIParameter.password} ${this.APIParameter.gender}`);
      this.registerService.register(this.APIParameter)
        .subscribe((result: RegisterReturn) => {
          if (result.success) {
            alert('register successfully');
          } else {
            // TODO ErrorHandlerService
          }
        });
    }
  }

  constructor(public fb: FormBuilder,
              public route: ActivatedRoute,
              public registerService: RegisterService) {
    this.registerForm = fb.group({
      email: ['', Validators.required],
      passwd: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

}
