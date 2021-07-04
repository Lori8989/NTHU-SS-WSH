import Component from  './component.js';
import Navbar from  './navbar.js';
import Board from  './board.js';
import Deck from  './deck.js';
import Reset from  './reset.js';

import './main.css';

export default class Main extends Component {
    static getRootClass() {
        return '.main';
    }

    constructor(root) {
        super(root);
console.log('into main  ');
        this.navbar = new Navbar(root.querySelector('.navbar'));
        this.navbar.on('easymode', this.handleNavbareasyClick.bind(this));
        this.navbar.on('hardmode', this.handleNavbarhardClick.bind(this));
        this.navbar.on('nightmaremode', this.handleNavbarnightmareClick.bind(this));
console.log('finish navbar  ');
        this.deck = new Deck(root.querySelector('.deck'));
        this.deck.on('wrongClick', this.handleDeckWrongClick.bind(this));
        this.deck.on('rightClick', this.handleDeckRightClick.bind(this));

        this.board = new Board(root.querySelector('.board'), this.deck.getPickedColor());

        this.reset = new Reset(root.querySelector('.reset'));
        this.reset.on('click', this.handleResetClick.bind(this));

        //this.easy = new Easy(root.querySelector('#easy'));
        //this.easy.on('click', this.handleEasyClick.bind(this));
    }

    handleDeckWrongClick(firer) {
        this.board.showWrongMessage();
    }

    handleDeckRightClick(firer, pickedColor) {
        this.root.style.backgroundColor = pickedColor;
        this.board.showCorrectMessage();
        this.reset.showPlayAgain();
    }

    handleResetClick(firer) {
        this.root.style.backgroundColor = "#232323";
        this.deck.reset();
        this.board.reset(this.deck.getPickedColor());
        firer.reset();
    }

    handleNavbareasyClick(firer) {
        this.reset.show();
        //what happen while click easy
        this.root.style.backgroundColor = "#232323";
        this.deck.easy();
        this.board.easy();
    }

    handleNavbarhardClick(firer) {
        this.reset.show();
        this.root.style.backgroundColor = "#232323";

        this.deck.hard();
        this.board.hard();
    }

    handleNavbarnightmareClick(firer) {
        this.reset.hide();
        this.deck.nightmare();
        this.board.nightmare();
    }
}

window.onload = function() {
    const body = document.querySelector('body');
    new Main(body);
};
