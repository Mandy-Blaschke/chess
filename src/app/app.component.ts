import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  fields: Field[] = [];

  active: Field;

  ngOnInit(): void {
    this.createPlayingfield();
    this.startPlacements();
  }

  private createPlayingfield(): void {
    for (let r = 0; r < 8; r++) {
      for (let s = 0; s < 8; s++) {
        const field: Field = {
          r,
          s,
          color: (r % 2 === 0 && s % 2 === 0 || r % 2 !== 0 && s % 2 !== 0) ? 'black' : 'white',
        };
        this.fields.push(field);
      }
    }
  }

  private startPlacements(): void {
    this.getField(0, 0).figure = {type: 'turm', color: 'black'};
    this.getField(0, 1).figure = {type: 'pferd', color: 'black'};
    this.getField(0, 2).figure = {type: 'laeufer', color: 'black'};
    this.getField(0, 3).figure = {type: 'dame', color: 'black'};
    this.getField(0, 4).figure = {type: 'koenig', color: 'black'};
    this.getField(0, 5).figure = {type: 'laeufer', color: 'black'};
    this.getField(0, 6).figure = {type: 'pferd', color: 'black'};
    this.getField(0, 7).figure = {type: 'turm', color: 'black'};

    for (let i = 0; i < 8; i++) {
      this.getField(1, i).figure = {type: 'bauer', color: 'black'};
      this.getField(6, i).figure = {type: 'bauer', color: 'white'};
    }

    this.getField(7, 0).figure = {type: 'turm', color: 'white'};
    this.getField(7, 1).figure = {type: 'pferd', color: 'white'};
    this.getField(7, 2).figure = {type: 'laeufer', color: 'white'};
    this.getField(7, 3).figure = {type: 'dame', color: 'white'};
    this.getField(7, 4).figure = {type: 'koenig', color: 'white'};
    this.getField(7, 5).figure = {type: 'laeufer', color: 'white'};
    this.getField(7, 6).figure = {type: 'pferd', color: 'white'};
    this.getField(7, 7).figure = {type: 'turm', color: 'white'};
  }

  private getField(r: number, s: number): Field {
    return this.fields.find((field) => field.r === r && field.s === s);
  }

  clickField(field: Field): void {
    if (this.active === undefined) {
      this.active = field;
    } else {
      field.figure = this.active.figure;
      field.r = this.active.r;
      field.s = this.active.s;
      this.active.figure = null;
      this.active = undefined;
    }
  }

  newGame(): void {
    this.fields = [];
    this.createPlayingfield();
    this.startPlacements();
  }
}

interface Field {
  r: number;
  s: number;
  color: Color;
  figure?: Figure;
}

export interface Figure {
  type: 'bauer' | 'turm' | 'pferd' | 'laeufer' | 'dame' | 'koenig';
  color: Color;
}

type Color = 'black' | 'white';
