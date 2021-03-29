import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JwtService } from 'src/app/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css'],
})
export class AddExamComponent implements OnInit {
	
	examForm;

  constructor(
	  private formBuilder: FormBuilder,
	  private http: HttpClient,
	  private jwt: JwtService,
	  private router: Router,
  ) { }

  ngOnInit(): void {
	  this.examForm = this.formBuilder.group({
		  teacher: [''],
		  subjectName: [''],
		  dateTime: [''],
		  // inputAddress2: ['']
	    });
  }
  
  onSubmit(){
	  if(this.examForm.valid){
		this.jwt.addExam(this.examForm.value.subjectName, this.examForm.value.dateTime, this.examForm.value.teacher);
		console.log(this.examForm.value.subjectName);
		console.log(this.examForm.value.dateTime);

	  }
  }

}
