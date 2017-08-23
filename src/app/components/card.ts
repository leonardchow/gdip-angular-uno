export interface Card {
    value: number,
    colour: string,
    imageUrl: string
    action?: string
}

export class UnoDeck {
    public static COLOURS: string[] = [ "red", "yellow", "green", "blue" ];
    public static VALUES: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 20, 20];
    public static ACTIONS = {
        SKIP: "skip",
        REVERSE: "reverse",
        DRAWTWO: "drawtwo",
        WILD: "wild",
        DRAWFOUR: "drawfour"
    }

    private cards: Card[]
    
    public seeCards: () => Card[] = () => {
        return this.cards;
    }
    
    public take: () => Card = () => {
        return this.cards.pop();
    }
    
    constructor() {
        this.cards = this.shuffle(this.makeDeck());
    }

    shuffle(cards: Card[]): Card[] {
        let shuffledDeck: Card[] = [];

        for (let idx in cards) {
            let cardIndex = Math.floor(Math.random() * cards.length)
            shuffledDeck.push(cards.splice(cardIndex, 1)[0]);
        }

        return shuffledDeck;
    }

    makeDeck(): Card[] {
        let newCards: Card[] = []
        // 1 - 20
        for (let i of Array(2)) {
            for (let colourIdx in UnoDeck.COLOURS) {
                for (let valueIdx in UnoDeck.VALUES) {
                    let valueInt: number = parseInt(valueIdx) + 1;
                    let id: string = "" + valueInt;
                    if (valueInt <= 9) {
                        id = "0" + id;
                    }

                    let newCard: Card = {
                        value: UnoDeck.VALUES[valueIdx],
                        colour: UnoDeck.COLOURS[colourIdx],
                        imageUrl: `/assets/uno_deck/c${colourIdx}_${id}.png`
                    }
                    
                    switch(valueInt) {
                        case 10:
                            newCard.action = UnoDeck.ACTIONS.SKIP;
                            break;
                        case 11:
                            newCard.action = UnoDeck.ACTIONS.REVERSE;
                            break;
                        case 12:
                            newCard.action = UnoDeck.ACTIONS.DRAWTWO;
                            break;
                    }
                    
                    newCards.push(newCard);
                }
            }
        }
        // the zeros
        for (let colourIdx in UnoDeck.COLOURS) {
            newCards.push({
                value: 0,
                colour: UnoDeck.COLOURS[colourIdx],
                imageUrl: `/assets/uno_deck/c${colourIdx}_00.png`
            })
        }
        // the other funny cards
        for (let i of Array(4)) {
            let wildcard: Card = {
                value: 50,
                colour: "any",
                imageUrl: "/assets/uno_deck/c4_00.png",
                action: UnoDeck.ACTIONS.WILD
            }
            
            let drawfour: Card = {
                value: 50,
                colour: "any",
                imageUrl: "/assets/uno_deck/c4_01.png",
                action: UnoDeck.ACTIONS.DRAWFOUR
            }

            newCards.push(wildcard);
            newCards.push(drawfour);
        }

        return newCards;
    }
}

// let deck =  new UnoDeck()

// let cards = deck.seeCards()

// cards
// for (let card of cards) {
//     //let taken = deck.take()
//     console.log( card);
// }