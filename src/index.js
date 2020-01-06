import "./styles/index.scss";

import Game from './game';

document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.getElementById('main-canvas');
  const game = new Game(canvas);
  game.restart();
  game.draw();

});

