import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-towatchlist',
  templateUrl: './towatchlist.component.html',
  styleUrls: ['./towatchlist.component.css']
})
export class TowatchlistComponent implements OnInit {

  idList: any[] = [];
  movieList: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getMoviesToWatch();
  }

  getMoviesToWatch() {
    this.movieList = [];
    this.idList = JSON.parse(localStorage.getItem("toWatch"));
    this.idList.map(idMovieToWatch => {
      this.http.get("https://api.themoviedb.org/3/movie/" + idMovieToWatch + "?api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8&language=en-US").subscribe(res => {
        this.movieList.push(res);
        console.log(this.movieList)
      })
    })
  }

}
