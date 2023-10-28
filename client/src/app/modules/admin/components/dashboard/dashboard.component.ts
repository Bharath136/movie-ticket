import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  theatres: any[] = []
  bookings: any[] = []
  users: any[] = []
  isLoading = false
  constructor(private http:HttpClient){
    this.isLoading = true
    this.http.get<any[]>('https://movie-ticket-pntf.onrender.com/flights').subscribe((res) => {
      this.theatres = res
    })

    this.http.get<any[]>('https://movie-ticket-pntf.onrender.com/bookings').subscribe((res) => {
      this.bookings = res
      this.isLoading = false
    })
  }
}
