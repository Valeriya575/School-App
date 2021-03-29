import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { JwtModule } from '@auth0/angular-jwt';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidationService } from './validation.service';
import { ControlMessagesComponent } from './control-messages.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ExamComponent } from './components/exam/exam.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeacherComponent } from './components/teacher/teacher.component';
import { AddExamComponent } from './components/add-exam/add-exam.component';
import { EditExamComponent } from './components/edit-exam/edit-exam.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ControlMessagesComponent,
    HeaderComponent,
    FooterComponent,
    ExamComponent,
    TeacherComponent,
    AddExamComponent,
    EditExamComponent
	
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	ReactiveFormsModule,
	HttpClientModule,
	NgbModule,
	CommonModule,
	RouterModule,
	FormsModule,
	BrowserAnimationsModule,
	BsDatepickerModule.forRoot(),
	
	JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
	
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
