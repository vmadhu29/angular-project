import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  response: any;
  returnUrl!: string;  
  error!: string;
   constructor(
     private fb: FormBuilder, 
     private http: HttpClient,
     private router : Router,
     ) {
      
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
          email: ['', Validators.required ],
          password: ['', Validators.required ],
      });
    
    this.returnUrl = '/dashboard';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
      // Initialize Params Object
        let Params = new HttpParams();
        // Begin assigning parameters
        Params = Params.append('firstParameter', this.loginForm.value.email);
        Params = Params.append('secondParameter', this.loginForm.value.password);
        //Params = Params.append('fifthParameter', this.registerForm.value.addr);
        return this.http.post('http://localhost:8000/api/login',{
          params: { params: Params }
        }).subscribe( res => {
            this.response = res;
            if(this.response.success){
              this.loginForm.reset();
              this.router.navigate(['/admin-dashboard']);
            }else{
                this.error = this.response.error;
            }
            
        })
    
      
    }
}
