import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  @Input()
  players: Card[][]

  @Input()
  tableCards: Card[]

  @Input()
  currentPlayer: number

  @Output()
  cardPlayed: EventEmitter<{[key: string]: number}> = new EventEmitter()

  constructor() {}

  ngOnInit() {
  }

  cardClicked(info: {[key: string]: number}) {
    this.cardPlayed.emit(info);
  }
}
