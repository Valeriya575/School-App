import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JwtService } from 'src/app/jwt.service';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	userForm;

  constructor(
  private formBuilder: FormBuilder,
  private http: HttpClient,
  private jwt: JwtService,
  private router: Router,
	) { }

  ngOnInit(): void {
	  console.log("register component");

	  this.userForm = this.formBuilder.group({
		  username:['', Validators.required],
		  name:['', Validators.required],
		  surname:['', Validators.required],
		  email:['', Validators.required],
		  password:['', [Validators.required, Validators.minLength(6)]],
		  userType:['',Validators.required]
	  });
  }
  
  onSubmit(){
	 if(this.userForm.dirty && this.userForm.valid){
		 
		 this.jwt.register(this.userForm.value.username, this.userForm.value.name, this.userForm.value.surname, this.userForm.value.email, this.userForm.value.password, this.userForm.value.userType);

    } else {
      alert('User form is not valid!!')
    }
	
  }
}
