window.onload = function() {
  var game = new Phaser.Game(800, 600, Phaser.CANVAS, null, {
    preload: preload,
    create: create,
    update: update });

  var cat, catcher, cursors, txtScore, score;
  var catCatchMsg = new SpeechSynthesisUtterance('Ouch. Meeow');
  var startGameMsg = new SpeechSynthesisUtterance('Hey asshole. Catch the cat.');


  function preload() {
    //load in asssets needed
    game.stage.backgroundColor = '#FFFFFF';
    game.load.image('cat', 'img/cat.png');
    game.load.image('catcher', 'img/catcher.png');
    game.load.image('bg', 'img/bg.png');
  }

  function create() {
    //setup game
    game.add.sprite(0, 0, "bg");

    catcher = game.add.sprite(400, 300, "catcher");
    catcher.anchor.setTo(0.5, 0);
    game.physics.enable(catcher, Phaser.Physics.ARCADE);

    cat = game.add.sprite(Math.random() * game.width - 5, Math.random() * game.height - 5, "cat");
    game.physics.enable(cat, Phaser.Physics.ARCADE);

    score = 0;
    var style = {font: "20px Arial", fill: "#FFF"};
    txtScore = game.add.text(10, 10, score.toString(), style);

    cursors = game.input.keyboard.createCursorKeys();
    window.speechSynthesis.speak(startGameMsg);
  }

 function update() {
    //run game loop code
    if(cursors.left.isDown) {
      catcher.x -=5;
      catcher.scale.x = 1;
    }

    if(cursors.right.isDown) {
      catcher.x += 5;
      catcher.scale.x = -1;
    }

    if(cursors.up.isDown) {
      catcher.y -= 5;
    }

    if(cursors.down.isDown) {
      catcher.y += 5;
    }

    game.physics.arcade.overlap(catcher, cat, catHitHandler);
  }

  function catHitHandler(catcherObject, catObject) {
    catObject.x = Math.random() * game.width - 5;
    catObject.y = Math.random() * game.height - 5;
    score ++;
    window.speechSynthesis.speak(catCatchMsg);
    txtScore.setText(score.toString());
  }
};