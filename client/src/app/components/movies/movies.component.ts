import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Movie {
  title: string;
  genre: string;
  duration: number;
  releaseDate: Date;
  director: string;
  cast: string[];
  language: string;
  rating: number;
  ticketPrice: number;
  seatsAvailable: number;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  movies: any[] = []
  isLoading = false

  filteredMovies : any[] = [];
  searchTerm: string = '';

  constructor(private http:HttpClient, private route:Router){
    this.isLoading = true
    this.http.get<any[]>('https://movie-ticket-pntf.onrender.com/movies').subscribe((res) => {
      this.filteredMovies = res;
      this.movies = res
      console.log(res)
      this.isLoading = false
    })
    const token = localStorage.getItem('jwtToken')
    console.log(token)
    if(!token){
      // this.route.navigate(['/login'])
    }
  }

  filterMovies(): void {
    this.filteredMovies = this.movies.filter(movie => {
      return movie.title.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

}

