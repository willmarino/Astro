import "./styles/index.scss";

import Game from './game';

const canvas = document.getElementById('main-canvas');

document.addEventListener('DOMContentLoaded', () => {
  let game = new Game(canvas);
  game.restart();
});

// let playButton = document.getElementById('play-button');

// playButton.addEventListener('mousedown', () => {
//   let game = new Game(canvas);
//   game.restart();
// })

