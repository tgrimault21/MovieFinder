import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-watchedlist',
  templateUrl: './watchedlist.component.html',
  styleUrls: ['./watchedlist.component.css']
})
export class WatchedlistComponent implements OnInit {

  idList: any[] = [];
  movieList: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getMoviesWatched();
  }

  //List in movieList the details of every movie watched based on the list of ids in local storage
  getMoviesWatched() {
    this.movieList = [];
    this.idList = JSON.parse(localStorage.getItem("watched"));
    this.idList.map(idMovieWatched => {
      this.http.get("https://api.themoviedb.org/3/movie/" + idMovieWatched + "?api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8&language=en-US").subscribe(res => {
        this.movieList.push(res);
      })
    })
  }

}
