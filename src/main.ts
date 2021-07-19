import AppGame from './AppGame';

const isDevelop = true;

const game = new AppGame();
game.start();

if (isDevelop) {
    (window as any).game = game;
}
