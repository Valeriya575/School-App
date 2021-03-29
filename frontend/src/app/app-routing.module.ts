import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ExamComponent } from './components/exam/exam.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { AddExamComponent } from './components/add-exam/add-exam.component';
import { EditExamComponent } from './components/edit-exam/edit-exam.component';


const routes: Routes = [
	{ path: 'login', component: LoginComponent},
	{ path: 'register', component: RegisterComponent},
	{ path: 'exams', component: ExamComponent},
	{ path:'teacher', component: TeacherComponent},
	{ path:'add-exam', component: AddExamComponent},
	{ path:'edit-exam', component: EditExamComponent},
	{ path: '**', component: LoginComponent},
	
	];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
