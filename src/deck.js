import Component from './component.js';
import Card from './card.js';

import './deck.css';

/*
 * [Event name: params]
 * wrongClick: this
 * rightClick: this, pickedColor
 */
export default class Deck extends Component {
    static getRootClass() {
        return '.deck';
    }

    constructor(root) {
        super(root);

        this.gameOver = false;
        this.cards = [];
        const els = root.querySelectorAll(Card.getRootClass());
        
        for (let el of els) {
            const card = new Card(el);
            card.on('click', this.handleCardClick.bind(this));
            this.cards.push(card);
        }
    
        this.pickedColor = this.pickColor();
        this.numCards = 6;
    }

    easy() {
        console.log("into deck.easy ----");
        //this.gameOver = false;
        this.numCards = 3;
        
        for (let i = 0; i < this.cards.length; i++) {
            
            if( i < this.numCards ){
                
                this.cards[i].display_block();
                this.cards[i].reset();
            }
            else{
                this.cards[i].display_none();
            }
        }
        this.pickedColor = this.pickColor();
    }

    hard() {
        console.log("into deck.easy ----");
        //this.gameOver = false;
        this.numCards = 6;
        
        for (let i = 0; i < this.cards.length; i++) {
            
            if( i < this.numCards ){
                
                this.cards[i].display_block();
                this.cards[i].reset();
            }
            else{
                this.cards[i].display_none();
            }
        }
        this.pickedColor = this.pickColor();
    }

    nightmare() {
        console.log("into deck.easy ----");
        //this.gameOver = false;
        this.numCards = 6;
        
        for (let i = 0; i < this.cards.length; i++) {
            
            if( i < this.numCards ){
                
                this.cards[i].display_block();
                this.cards[i].reset();
            }
            else{
                this.cards[i].display_none();
            }
        }
        this.pickedColor = this.pickColor();
    }

    reset() {
        this.gameOver = false;
        for (let card of this.cards)
            card.reset();
        this.pickedColor = this.pickColor();
    }

    getPickedColor() {
        return this.pickedColor;
    }

    handleCardClick(firer, color) {
        if (this.gameOver)
            return;

        if (color === this.pickedColor) {
            for (let card of this.cards)
                card.fadeIn("#FFF");
            this.gameOver = true;
            this.fire('rightClick', this.pickedColor);
        } else {
            firer.fadeOut();
            this.fire('wrongClick');
        }
    }

    pickColor() {
        const random = Math.floor(Math.random() * this.cards.length);
        return this.cards[random].getColor();
    }
}
