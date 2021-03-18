//script.js

//#region PRELOAD
function preload() {


    /////////    models    ///////////////
    // butterflyModel = loadModel('models/butterfly.obj', true);
    airplaneModel = loadModel('models/airplane.obj', true);
    // muvaModel = loadModel('models/muva.obj', true);
    // asteroidModel = loadModel('models/asteroid2.obj', true);
    // spiderModel = loadModel('models/spider.obj', true);
    // bulletModel = loadModel('models/bullet.obj', true);


    /////////    textures    //////////

    inox = loadImage('textures/inox.jpg')
    // asteroidTexture = loadImage('textures/asteroid2.jpg');
    // asteroidTexture2 = loadImage('textures/asteroid3.jpg');
    // asteroidTexture3 = loadImage('textures/asteroid4.jpg');
    // butterflyTexture = loadImage('textures/butterfly.png');
    // butterflyTexture2 = loadImage('textures/butterfly2.png');
    // butterflyTexture3 = loadImage('textures/butterfly3.png');
    // spiderTexture = loadImage('textures/spider.jpg');
    // spiderTexture2 = loadImage('textures/spider4.jpg');
    // spiderTexture3 = loadImage('textures/spider5.jpg');
    // bulletTexture1 = loadImage('textures/brass.jpg');
    // bulletTexture2 = loadImage('textures/copper.jpg');

    ////////    sounds    //////////////

    // hitSound = loadSound("sounds/hit1.mp3");
    // pukanjeSound = loadSound("sounds/gun1.mp3");
    // pukanjeSound2 = loadSound("sounds/gun2.mp3");
    // pukanjeSound3 = loadSound("sounds/gun3.mp3");
    // upgradeSound = loadSound("sounds/reload.mp3");
    // alarm = loadSound("sounds/bossAlarm.mp3");


    ///////////    backgrounds /////////////////  
    bg1 = loadImage('background/space2.png');
    bg2 = loadImage('background/stars.jpg');
    bg3 = loadImage('background/space3.png');
}

function preloaded(loaded) {
    backgroundMusic = loaded;
    backgroundMusic.play();
    backgroundMusic.setVolume(0.5);
}
//#endregion

//#region  SETUP

function setup() {

    createCanvas(windowWidth, windowHeight, WEBGL);

    /////////    PRELOAD    ///////////////
    backgroundMusic = loadSound("sounds/deepblue-song.mp3", preloaded);
    //////////////////////////////

    // for (let i = 0; i < width + 10000; i = i + asteroidCount / delitel) {
    //     let a = new Asteroid(i - 5000, random(-5000, 5000), random(-100, -5000), random(0.4, 1), random(-20, 20));
    //     asteroid.push(a);
    // }


    // if (windowWidth > windowHeight) {
    //     astedoidCount = 1000;

    // }

    ///  prvRedMuvi

    // for (let i = 0; i < width; i = i + 70 * delitel) {
    //     let m = new Muva(i, height / 20, 0.2, 0, 0, 0, random(-3, 3));
    //     muvi.push(m);
    // }

    // for (let i = width / 2; i < width; i = i + width) {
    //     let b = new BossMuva(i, height - height * 2, 0, 2, 2);
    //     bossMuva.push(b);
    // }
    ///avionce 


    // let a = new Avionce(1, height - 50);
    avionce.push(new Avionce(1, height - 50));

}
//#endregion


function draw() {
    ambientLight(155);
    pointLight(255, 240, 230, width / 2, height / 20, 100);



}

console.log(Boolean(10>9));


  