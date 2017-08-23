import { Component } from '@angular/core';
import { Card, UnoDeck } from './components/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private MAX_PLAYERS = 7;
  private MIN_PLAYERS = 2;
  private CARDS_DEALT = 3;
  
  playerCount: number = this.MIN_PLAYERS;

  deck: UnoDeck
  players: Card[][] = []
  tableCards: Card[] = []
  currentPlayer: number
  gameOver: boolean
  direction: number

  title = 'app';

  whenAdded() {
    if (this.playerCount < this.MAX_PLAYERS)
      this.playerCount++;
  }

  whenRemoved() {
    if (this.playerCount > this.MIN_PLAYERS)
      this.playerCount--;
  }

  whenStarted() {
    console.log("Starting");
    // refresh variables
    this.players = [];
    this.tableCards = [];
    this.currentPlayer = 0;
    this.gameOver = false;
    this.direction = 1;

    this.deck = new UnoDeck()
    // For each player
    for (let i = 0; i < this.playerCount; i++) {
      this.players[i] = []
      // Take out 7 cards
      for (let cardNum = 0; cardNum < this.CARDS_DEALT; cardNum++) {
        this.players[i][cardNum] = this.deck.take();
      }
    }
  }

  cardPlayed(info: {[key: string]: number}) {
    let playerIdx = info.player;
    let cardIdx = info.card;

    if (playerIdx != this.currentPlayer) {
      return;
    }

    let card: Card = this.players[playerIdx][cardIdx];

    // If there is a card on table
    if (this.tableCards.length > 0) {
      let cardOnTable: Card = this.tableCards[this.tableCards.length - 1];
      
      if ( ! (
              // Card can be played if it meets these criteria:
              card.value >= cardOnTable.value
              || card.colour == cardOnTable.colour
              || cardOnTable.colour == "any"
            )) {
        return;
      }
    }

    let movePlayer: (currentPlayer: number, times: number) => number = (currentPlayer: number, times: number) => {
      let nextPlayer = currentPlayer + this.direction * times;

      if (nextPlayer >= this.playerCount) {
        nextPlayer -= this.playerCount;
      } else if (nextPlayer < 0) {
        nextPlayer += this.playerCount;
      }

      if (this.players[nextPlayer].length == 0) {
        nextPlayer = movePlayer(nextPlayer, 1);
      }

      return nextPlayer;
    }

    // For drawing actions
    let affectedPlayer = movePlayer(playerIdx, 1);
    //let emptySlots: number = this.CARDS_DEALT - this.players[affectedPlayer].length;
    let times = 2;

    switch(card.action) {
      case UnoDeck.ACTIONS.SKIP:
        this.currentPlayer = movePlayer(this.currentPlayer, 1);
        break;
      case UnoDeck.ACTIONS.REVERSE:
        this.direction *= -1;
        break;
      case UnoDeck.ACTIONS.DRAWFOUR:
        times = 4;
      case UnoDeck.ACTIONS.DRAWTWO:
        while (times > 0) {
          this.players[affectedPlayer].push(this.deck.take());
          times--;
        }
        this.currentPlayer = movePlayer(this.currentPlayer, 1);
        break;
    }

    this.tableCards.push(this.players[playerIdx].splice(cardIdx, 1)[0]);
    this.currentPlayer = movePlayer(this.currentPlayer, 1);

    // If the table has all the cards
    // WRONG NOW
    let cardsLeft = this.players.reduce((a, b) => a.concat(b));
    
    if (cardsLeft.length == 0) {
      this.players = [];
      this.gameOver = true;
    }
  }
}
