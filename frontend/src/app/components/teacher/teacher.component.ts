import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/jwt.service';
import { Exam } from 'src/app/models/exam.model';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
  providers: [JwtService]
})
export class TeacherComponent implements OnInit {
	
	exams: Exam[];

  constructor( private jwt: JwtService, private router: Router) { }

  ngOnInit(): void {
	  this.getExams();
  }
  
  addExam(): void {
    this.router.navigate(['add-exam']);
  }
  
  getExams(): void {
    this.jwt.getExams().subscribe(data=>{
      this.exams = data;
	  console.log(this.exams)
	  console.log(data)
    });
	
  }
  
   deleteExam(exam: Exam){

    this.jwt.deleteExam(exam._id).subscribe(data=>{
      console.log(data);
      this.getExams();
    });
  }
  
  updateExam(exam: Exam){
    localStorage.removeItem("id");
    localStorage.setItem("id", exam._id);
    this.router.navigate(['edit-exam']);
  }
  
  

}
