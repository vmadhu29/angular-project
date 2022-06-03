import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  response: any;
  returnUrl!: string;  
   constructor(
     private fb: FormBuilder, 
     private http: HttpClient,
     private router : Router,
     ) {
      
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
          name: ['', Validators.required ],
          dob: ['', Validators.required ],
          mobno: ['', Validators.required ],
          email: ['', Validators.required ],
          pass: ['', Validators.required ],
          confirm_pass: ['', Validators.required ],
      },{validator: this.checkIfMatchingPasswords('pass', 'confirm_pass')
    });
    
    this.returnUrl = '/login';
  }
  
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }


  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
      // Initialize Params Object
        let Params = new HttpParams();
        // Begin assigning parameters
        Params = Params.append('firstParameter', this.registerForm.value.name);
        Params = Params.append('secondParameter', this.registerForm.value.dob);
        Params = Params.append('thirdParameter', this.registerForm.value.mobno);
        Params = Params.append('fourthParameter', this.registerForm.value.email);
        Params = Params.append('fifth', this.registerForm.value.pass);
        Params = Params.append('fifth', this.registerForm.value.confirm_pass);
        //Params = Params.append('fifthParameter', this.registerForm.value.addr);
        return this.http.post('http://localhost:8000/api/adduserdetails',{
          params: { params: Params }
        }).subscribe( res => {
            this.response = res;
            this.registerForm.reset();  
            this.router.navigate([this.returnUrl]);
        })
    
      
    }

}
