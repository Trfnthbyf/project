import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  myForm: FormGroup;
  error = false;
  id: string;
  private subscription: Subscription;

  constructor(private fb: FormBuilder,
              private authenticationService: AuthenticationService) {}

  ngOnInit(): any {
    this.myForm = this.fb.group({
      username: ['',[Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.compose([
        Validators.required,
        this.isEqualPassword.bind(this)
      ])]
    });

    /*this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params['ID'];
      this.checkEmail(this.id);
      console.log(this.id);
    });*/
  }

  isEqualPassword(control: FormControl): {[s: string]: boolean} {
    if (!this.myForm) {
      return {passwordsNotMatch: true};

    }
    if (control.value !== this.myForm.controls['password'].value) {
      return {passwordsNotMatch: true};
    }
  }

  onSubmit(value:string):void {
    /*this.authenticationService.sendUserForm(value)
      .subscribe((response) => {
        if (response === true) {
          this.router.navigate(['project']);
        } else {
          this.router.navigate(['registration']);
        }
      })*/
  }
  checkEmail(id) {
    this.authenticationService.checkEmail(id)
      .subscribe((email) => {
        if (email) {
          //this.user.email = email;

        } else {
          console.log('error');
        }
      })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
