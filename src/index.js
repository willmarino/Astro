import "./styles/index.scss";

import Game from './game';

const canvas = document.getElementById('main-canvas');
// const app = new PIXI.Application({
//   view: canvas
// })

let gameAndTitle = document.getElementById('game-and-title');
let startMenu = document.getElementById('start-menu');
let playButton = document.getElementById('play-button');

playButton.addEventListener('mousedown', () => {
  let game = new Game(canvas);
  game.restart();
})

