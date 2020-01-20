import "./styles/index.scss";

import Game from './game';

const canvas = document.getElementById('main-canvas');

// document.addEventListener('DOMContentLoaded', () => {
//   let game = new Game(canvas);
//   game.restart();
// });

let gameAndTitle = document.getElementById('game-and-title');
let startMenu = document.getElementById('start-menu');
let playButton = document.getElementById('play-button');

playButton.addEventListener('mousedown', () => {
  let game = new Game(canvas);
  game.restart();
  // document.removeChild(startMenu);
  // game.step();
  // should call recursively until game is over
  // if(game.gameOver()){
  //   gameAndTitle.appendChild(startMenu);
  // }
})

