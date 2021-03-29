import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/models/exam.model';
import { JwtService } from 'src/app/jwt.service';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
  providers: [JwtService]
})
export class ExamComponent implements OnInit {
	
	//datePickerConfig: Partial<BsDatepickerConfig>;
	public datePickerConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
	
	exams: Exam[];
	editProfileForm: FormGroup;
	

  constructor(
  private jwt: JwtService, 
  private router: Router, 
  private fb: FormBuilder,
  private modalService: NgbModal,
  
  ) { 
  
	//this.datePickerConfig = Object.assign({}, {containerClass: 'theme-blue'});
	//this.datePickerConfig.containerClass = 'theme-blue';

  }

  ngOnInit(): void {
	  
	this.editProfileForm = this.fb.group({
		subjectName: [''],
		teacher: [''],
		dateTime: ['']
	});
	  
	  console.log("exam component");
	  console.log(localStorage.getItem('access_token'));
	 this.getExams();
  }
  
  getExams():void{
	  
	  this.jwt.getExams().subscribe(data=>{
      this.exams = data;
    });
  };
  
  openModal(targetModal, exam){
	  
	this.modalService.open(targetModal, {
	  centered: true,
      backdrop: 'static'
    });
 
  this.editProfileForm.patchValue({
   subjectName: exam.subjectName,
   teacher: exam.teacher,
   dateTime: exam.dateTime
   });
  }
  
  onSubmit() {
  this.modalService.dismissAll();
  console.log("res:", this.editProfileForm.getRawValue());
 }
 
  

}
