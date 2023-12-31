import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-regiter',
  templateUrl: './owner-regiter.component.html',
  styleUrls: ['./owner-regiter.component.css']
})
export class OwnerRegiterComponent {
  regForm: FormGroup;

  constructor(private http: HttpClient, private route: Router) {
    this.regForm = new FormGroup({
      airline: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
    const jwtToken = localStorage.getItem('adminJwtToken')
    if (jwtToken) {
      this.route.navigate(['/admin/dashboard'])
    }
    const token = localStorage.getItem("jwtToken")
    if (token) {
      this.route.navigate(['/'])
    }
  }

  onSubmit(details: {  airline: string, email: string, password: string }): void {
    this.http.post('https://movie-ticket-pntf.onrender.com/airline-register', details).subscribe(
      (response) => {
        window.alert('Theatre Registered Successfully!');
        this.route.navigate(['/airline-login']);
      },
      (error) => {
        if (error.status === 400) {
          window.alert('Theatre already exists');
        } else {
          window.alert('Registration Failed!');
        }
        console.log(error);
      }
    );
  }

}
