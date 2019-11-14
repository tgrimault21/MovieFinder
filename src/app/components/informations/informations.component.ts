import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent implements OnInit {

  director: any;
  actors: any;

  constructor(
    public dialogRef: MatDialogRef<InformationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCredits() {
    if(this.data){
      this.http.get("https://api.themoviedb.org/3/movie/" + this.data.id + "/credits?api_key=9e2b8a1d23b0a9148f8bb5bf8f512bd8").subscribe(res => {
        console.log(res)
        this.director = (res as any).crew.filter(staff => staff.department == "Directing");
        this.actors = (res as any).cast.slice(0,5);
      });
    }
  }

  ngOnInit() {
    this.getCredits()
  }

}
