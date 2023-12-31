import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {
  isLoading = false
  flights: any[] = []
  constructor(private http:HttpClient){
    this.isLoading = true
    const airline = localStorage.getItem('airline')
    this.http.get<any[]>(`https://movie-ticket-pntf.onrender.com/flights/airline/${airline}`).subscribe((res) => {
      this.flights = res
      this.isLoading = false
    })
  }
}
