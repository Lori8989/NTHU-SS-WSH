import Component from  './component.js';

import './board.css';

/*
 * [Event name: params]
 * click: this, color
 */
export default class Board extends Component {
    static getRootClass() {
        return '.board';
    }

    constructor(root, color) {
        super(root);

        var t = 5, state = 0;
        var blink;
        this.colorDisplay = root.querySelector('.color-picked');
        this.messageDisplay = root.querySelector('.message');
        this.reset(color);
    }

    reset(color) {
        this.colorDisplay.textContent = color;
        this.messageDisplay.textContent = "What's the Color?";
        clearInterval(this.blink);
        console.log('end blink by reset\n');
    }

    easy() {
        console.log("into board.easy --");
        //this.colorDisplay.textContent = color;
        this.messageDisplay.textContent = "What's the Color?";
        
    }

    hard() {
        console.log("into board.hard --");
        //this.colorDisplay.textContent = color;
        this.messageDisplay.textContent = "What's the Color?";
        
    }

    nightmare() {
        console.log('into board nightmare\n');
        this.blink = setInterval(this.blinking(), 200);
    }

    blinking() {
        console.log('blink\n');
        this.state = this.state + 2;
        if( this.state % 10 === 0 )
            this.bg_0;
        else
            this.bg_1;
    }

    bg_0() {
        console.log('into bg_0\n');
        this.body.backgroundColor = "gray";
    }
    bg_1() {
        this.body.backgroundColor = "#232323";
    }

    showColor(color) {
        this.colorDisplay.textContent = color;
    }

    showCorrectMessage() {
        this.messageDisplay.textContent = "Correct!";
    }

    showWrongMessage() {
        this.messageDisplay.textContent = "Try Again";
    }
}
