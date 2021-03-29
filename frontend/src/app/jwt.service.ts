import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Exam } from 'src/app/models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
	
	constructor(private http: HttpClient,  private router: Router) { }
  
	login(username: string, password: string) {

	this.http.post('http://localhost:3000/login', {username, password}).subscribe(
			(response)=>{
				//console.log("response " + response['token'])
				var user = response['foundUser'];
				console.log(user)
				localStorage.setItem('access_token', response['token']);
				console.log(localStorage.getItem('access_token'));
				
				localStorage.setItem('user', user.userType);
				localStorage.setItem('name_of_user', user.name);
				//console.log(localStorage.getItem('user'));
				console.log("Name of User");
				console.log(localStorage.getItem('name_of_user'));
				
				if(user.userType == 'Student'){
					this.router.navigate(['exams']);
				} else{
					this.router.navigate(['teacher']);
				}
				
			 })
		
	}

	logOut() {
		
	  localStorage.removeItem('access_token');
	  this.router.navigate(['login']);

	}
	
	  public get loggedIn(): boolean{
		  
	  return localStorage.getItem('access_token') !==  null;
	}
	
	register(username: string, name: string, surname: string, email: string, password: string, userType: string) {

		this.http.post('http://localhost:3000/register', {username, name, surname,  email, password, userType}).subscribe(
		(response)=>{
		 console.log('response', response);
		 this.login(username, password);
		 })
	}
	
	getExams(){
		
		console.log(localStorage.getItem('access_token'));
		let params = new HttpParams().set('token', localStorage.getItem('access_token'));

		return this.http.get<Exam[]>('http://localhost:3000/' + 'exams', { params: params });
    }
	
	addExam(subjectName: string, dateTime: string, teacher: string){
		var token = localStorage.getItem('access_token');
		this.http.post('http://localhost:3000/exams', {subjectName, dateTime, teacher, token}).subscribe(
		(response) =>{
		 console.log('response', response);	
		this.router.navigate(['teacher']);
		
		})
		
	}
	
	getExamById(id: string){
		return this.http.get<Exam>('http://localhost:3000/' + 'exams' + '/' + id);
	}
	
	deleteExam(id: string){
		return this.http.delete('http://localhost:3000/' + 'exams' + '/' + id);
	}
	
	updateExam(exam: Exam){
		
		return this.http.put('http://localhost:3000/' + 'exams' + '/' + exam._id, exam);
	}


}
