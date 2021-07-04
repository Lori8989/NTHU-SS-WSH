import Component from './component.js';

import './navbar.css';

/*
 * [Event name: params]
 * none
 * easymode
 * hardmode
 * nightmaremode
 */
export default class Navbar extends Component {
    static getRootClass() {
        return '.navbar';
    }

    constructor(root) {
        super(root);

        this.brand = root.querySelector('.brand');
        this.reset();
         

        this.easy = root.querySelector("#easy");
        easy.addEventListener('click', this.handleEasyClick.bind(this));
        this.hard = root.querySelector("#hard");
        hard.addEventListener('click', this.handleHardClick.bind(this));
        this.nightmare = root.querySelector("#nightmare");
        nightmare.addEventListener('click', this.handleNightmareClick.bind(this));
    }

    handleEasyClick(){
        this.easy.classList.add('selected');
        this.hard.classList.remove('selected');
        this.nightmare.classList.remove('selected');
        console.log('in navbar.js, fire easymode\n');
        this.fire('easymode');
    }

    handleHardClick() {
        this.easy.classList.remove('selected');
        this.hard.classList.add('selected');
        this.nightmare.classList.remove('selected');
        this.fire('hardmode');
    }

    handleNightmareClick() {
        this.easy.classList.remove('selected');
        this.hard.classList.remove('selected');
        this.nightmare.classList.add('selected');
        this.fire('nightmaremode');
    }

    reset() {
        // do nothing
    }


}
