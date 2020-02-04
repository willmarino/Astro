import "./styles/index.scss";

import Game from './game';



  let mainButton = document.getElementById('main-start');
  let main = document.getElementById('main')

  mainButton.addEventListener('mousedown', () => {
    main.style.display = 'flex'
    main.style.height = '100%';
    document.body.removeChild(mainButton);
  })

  const canvas = document.getElementById('main-canvas');

  let gameAndTitle = document.getElementById('game-and-title');
  let startMenu = document.getElementById('start-menu');
  let playButton = document.getElementById('play-button');

  playButton.addEventListener('mousedown', () => {
    let game = new Game(canvas);
    game.restart();
  })

