import Phaser from 'phaser';
import config from '../main';
import Launcher from '../assets/launcher';
// import objectCreator from '../assets/objectCreate';
import createObjects from '../assets/objectCreate';
import background from '../images/background.png';
import backgroundStripes from '../images/backgroundStripes.png';
 import topHalfMoon from '../images/topHalfMoon.png';
import topBumper from '../images/topBumper.png';
import rightBumper from '../images/rightBumper.png';
import leftRamp from '../images/leftRamp.png';
import rightRamp from '../images/rightRamp.png';
import Ball from '../assets/ball';
import ballImage from '../images/ball.png';
import shapes from '../assets/physics.json';
import sheetJson from '../assets/pinball-sprites.json';
import sheetPng from '../images/pinball-sprites.png';
import Object from '../assets/object';

import Flipper from '../assets/flippers';
import LeftTrigger from '../images/leftTrigger.png';
import RightTrigger from '../images/rightTrigger.png';
import leftBumper from '../images/leftBumper.png';
import spring from '../images/spring.png';
import blackDivider from '../images/black_divider.png';
import closingPinRight from '../images/closingPinRight.png';
import closingPinLeft from '../images/closingPinLeft.png';
import leftSmallBumper from '../images/leftSmallBumper.png';
import rightSmallBumper from '../images/rightSmallBumper.png';
import twoTimes from '../images/2x.png';
import blackHole from '../images/blackHole.png';

export default class GameScene extends Phaser.Scene {
 


  constructor() {
    super('GameScene');
    this.gameWidth = config.scale.width;
    this.gameHeight = config.scale.height;
    this.gameBalls = 0;
    this.score = 0;
    this.currentBall = 0;
  }

  preload() {
    this.matter.world.update60Hz();
    this.load.image('ball', ballImage);
    this.load.image('background', background);
    this.load.image('LeftTrigger', LeftTrigger);
    this.load.image('RightTrigger', RightTrigger);
    this.load.image('leftBumper', leftBumper);
    this.load.image('backgroundStripes', backgroundStripes);
    this.load.image('spring', spring);
    this.load.image('blackDivider', blackDivider);
    this.load.image('closingPinRight', closingPinRight);
    this.load.image('closingPinLeft', closingPinLeft);
    this.load.image('leftSmallBumper', leftSmallBumper);
    this.load.image('rightSmallBumper', rightSmallBumper);
    this.load.image('blackHole', blackHole);
    this.load.image('twoTimes', twoTimes);
    this.load.atlas('sheet', sheetPng, sheetJson);
    this.load.json('shapes', shapes);
    this.load.image('leftRamp', leftRamp);    
  }

  create() {
    const shapes = this.cache.json.get('shapes');


    this.matter.world.setBounds(0, 0, this.gameWidth, this.gameHeight);
    this.back = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.back.scale = 1.15;
    this.backStrips = this.add.image(0, 0, 'backgroundStripes').setOrigin(0, 0);

    //this.blackDividerRight = this.add.image(this.gameWidth - 50, this.gameHeight, 'blackDivider').setOrigin(1);
   // this.blackDividerLeft = this.add.image(90, this.gameHeight, 'blackDivider').setOrigin(1)
    //this.twoTimes = this.add.image(3, this.gameHeight - 150, 'twoTimes').setOrigin(0);
    //this.blackHole = this.add.image(3, this.gameHeight - 50, 'blackHole').setOrigin(0);
     
    this.blackDividerRight = new Object(this, this.gameWidth - 70, this.gameHeight - 90, "sheet", "black_divider.png", shapes.black_divider);
    this.blackDividerRight = new Object(this, 70, this.gameHeight - 90, "sheet", "black_divider.png", shapes.black_divider);
    this.blackHole = new Object(this, 25, this.gameHeight - 40, "sheet", "blackHole.png", shapes.blackHole);
    this.twoTimes  = new Object(this, 25, this.gameHeight - 140, "sheet", "2x.png", shapes.blackHole);




    
    //this.topHalfMoon = this.add.image(0, 0, 'topHalfMoon').setOrigin(0, 0);
    //new createObjects(this, 180, 890, 'leftBumper', this.collisionGroupB);
    //new createObjects(this, 540, 890, 'rightBumper', this.collisionGroupB);
    //new createObjects(this, this.gameWidth * 0.5 -100, 100, 'topHalfMoon', this.collisionGroupB);
    //new createObjects(this, this.gameWidth * 0.3, 250, 'topBumper', this.collisionGroupB);
    //new createObjects(this, this.gameWidth * 0.5, 360, 'topBumper', this.collisionGroupB);
    //new createObjects(this, this.gameWidth * 0.7, 250, 'topBumper', this.collisionGroupB);

    
    const aPushed = this.input.keyboard.addKey('A');
    const dPushed = this.input.keyboard.addKey('D');

    aPushed.on(
      'down',
      function () {
        leftFlipper.flip();
      },
      this
    );

    aPushed.on(
      'up',
      function () {
       leftFlipper.release();
      },
      this
    );

    dPushed.on(
      'down',
      function () {
        rightFlipper.flip();
      },
      this
    );

    dPushed.on(
      'up',
      function () {
       rightFlipper.release();
      },
      this
    );


    this.collisionGroupA = this.matter.world.nextCategory(); // Ball
  	this.collisionGroupB = this.matter.world.nextCategory(); // Walls

    const topHalfMoon = new Object(this, 400, 68, "sheet", "topHalfMoon.png", shapes.topHalfMoon);
    const topBumperOne = new Object(this, this.gameWidth * 0.3, 250, "sheet", "topBumper.png", shapes.topBumper);
    const topBumperTwo = new Object(this, this.gameWidth * 0.5, 360, "sheet", "topBumper.png", shapes.topBumper);
    const topBumperThree = new Object(this, this.gameWidth * 0.7, 250, "sheet", "topBumper.png", shapes.topBumper);
    const leftBumper = new Object(this, this.gameWidth * 0.25, this.gameHeight * 0.7, "sheet", "leftBumper.png", shapes.leftBumper);
    const rightBumper = new Object(this, this.gameWidth - this.gameWidth * 0.25, this.gameHeight * 0.7, "sheet", "rightBumper.png", shapes.rightBumper);
    const leftRamp = new Object(this, this.gameWidth * 0.14, this.gameHeight * 0.744, "sheet", "leftRamp.png", shapes.leftRamp);
    const rightRamp = new Object(this, this.gameWidth - this.gameWidth * 0.14, this.gameHeight * 0.744, "sheet", "rightRamp.png", shapes.rightRamp);
    const leftFlipper = new Flipper(this, this.gameWidth * 0.31, this.gameHeight * 0.87, 'left', LeftTrigger);
    const rightFlipper = new Flipper(this, this.gameWidth * 0.68, this.gameHeight * 0.87, 'right', RightTrigger);

    this.launcher = new Launcher(
      this,
      this.gameWidth - 25,
      this.gameHeight - 40,
      50,
      this.ball,
      'spring',
      'closingPinRight',
      this.collisionGroupB
    );

    let score = this.add.text(this.gameWidth * 0.05, 0 , 'Score: ' + this.score, { fontSize: 18 }).setOrigin(0).setDepth(1);
    this.activeBall = this.add.text(this.gameWidth  * 0.78 , 0, 'Balls left: ' + this.gameBalls, { fontSize: 18}).setOrigin(0).setDepth(1);
  
    this.newGame();
    console.log(this.currentBall);
  }

  newGame() {
    this.currentBall = 0 
    this.gameBalls = 3;
    console.log('NEW GAME');
    this.getNewBall(); 
    this.activeBall.text = 'Balls left: ' + this.gameBalls;  
  }

  getNewBall() {
    this.ball = new Ball(
      this,
      this.gameWidth - 30,
      this.gameHeight - 200,
      'ball',
      this.launcher, 
      this.collisionGroupA
    );
    this.currentBall++; 
    
    // this.ball.setCollidesWith([this.collisionGroupA, this.collisionGroupB]);
  }

  resetBall() {
      if (this.gameBalls >= 1 && this.ball.y > this.gameHeight - 20 ) {
          this.gameBalls--;
          this.getNewBall();
          this.activeBall.text = 'Balls left: ' + this.gameBalls;
          console.log("game balls " + this.gameBalls);
          console.log("current ball " + this.currentBall);
      }

      if(this.ball.getData('dead')) {
        this.ball.destroy(); 
        this.gameBalls--;
        this.getNewBall();
        this.activeBall.text = 'Balls left: ' + this.gameBalls;
        console.log("game balls " + this.gameBalls);
        console.log("current ball " + this.currentBall);
        this.launcher.resetValves();
      }
  } 

  endGame(){
    this.ball.destroy(); 
    console.log("Game end")
  }

  update() {
  
    this.resetBall();

    if(this.gameBalls === 0){
      this.endGame();
      this.newGame();
    } 
    
  }
}
