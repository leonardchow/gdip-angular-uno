import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  @Input()
  playerCount: number;

  @Output()
  adding: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  removing: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  starting: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onAdd() {
    this.adding.emit();
  }

  onRemove() {
    this.removing.emit();
  }

  onStart() {
    this.starting.emit();
  }

}
