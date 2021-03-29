import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators} from '@angular/forms';
import { JwtService } from 'src/app/jwt.service';
import { HttpClient } from '@angular/common/http';
import { ValidationService } from 'src/app/validation.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	userForm;
	
	public username: string;
	public password: string;
	public error: string;
	public userType: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private jwt: JwtService, private router: Router,) { }

  ngOnInit(): void {
	  localStorage.removeItem('access_token');

	  console.log("login component")
	  this.userForm = this.formBuilder.group({
		  username:['', Validators.required],
		  password:['', [Validators.required, Validators.minLength(6)]],
	  });
  }

  onSubmit(){
	  
	 if(this.userForm.dirty && this.userForm.valid){
		 this.jwt.login(this.userForm.value.username, this.userForm.value.password);
		 
		 
    } else {
      alert('User form is not valid!!')
    }
	
  }
  
  onRegister(){
	  
	this.router.navigate(['register']);
	
  }
}
