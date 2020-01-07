import "./styles/index.scss";

import Game from './game';

const canvas = document.getElementById('main-canvas');
const game = new Game(canvas);

document.addEventListener('DOMContentLoaded', () => {
  game.restart();
});

// document.addEventListener('keypress', (e) => {
//   if(e.keyCode === 120){

//   }
// })
