import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/jwt.service';
import { Router } from "@angular/router";
import { FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Exam } from 'src/app/models/exam.model';

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.css']
})
export class EditExamComponent implements OnInit {
	
	examForm;
	exam: Exam;

  constructor(
  private formBuilder: FormBuilder,
  private jwt: JwtService,
  private http: HttpClient,
  private router: Router
  ) { }

  ngOnInit(): void {
	let id = localStorage.getItem("id");
    if(!id){
		alert("Something wrong!");
		this.router.navigate(['']);
		return;
  }
  
  
  this.examForm = this.formBuilder.group({
	  
	_id: [],
	subjectName:[''],
	dateTime:[''],
	teacherId:[''],
	  
  });
  
   this.jwt.getExamById(id).subscribe(data=>{
      console.log(data);
      this.examForm.patchValue(data); 
    });

}

	onSubmit(){
		
    if(this.examForm.valid){
      this.jwt.updateExam(this.examForm.value)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['teacher']);
      });
    }
  }
}
