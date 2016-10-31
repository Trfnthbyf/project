import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  myForm: FormGroup;
  email: AbstractControl;
  public submitted: boolean;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'email': ['', [Validators.required, this.isEmail]]
    });
    this.email = this.myForm.controls['email'];
  }

  ngOnInit() {
    console.log(this.myForm);
  }

  onSubmit(value:string):void {
    this.submitted = true;

    if (this.myForm.valid) {
      console.log('you submitted value', value);
    } else {
      console.log('you submitted invalue', value);
    }
  }
  isEmail(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return {noEmail: true};
    }
  }
}
