import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
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
