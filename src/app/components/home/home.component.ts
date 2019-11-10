import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  data: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.http.get("https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8").subscribe(res => {
      this.data = res;
      console.log(this.data)
    });
  }

}
