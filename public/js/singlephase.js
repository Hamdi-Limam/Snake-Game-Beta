import MainScene from "./mainscene.js";

//Main Scene config
const config = {
  width: 1340,
  height: 540,
  type: Phaser.AUTO,
  parent: "phaser-game",
  scene: [MainScene],
};

new Phaser.Game(config);
