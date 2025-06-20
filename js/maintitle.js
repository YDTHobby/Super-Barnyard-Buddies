function loadMainTitle(Q) {
  Q.scene('mainTitle', function(stage) {
    var container = stage.insert(new Q.UI.Container({
      x: Q.width / 2,
      y: 5,
      fill: 'rgba(0,0,0,0.0)'
    }));

    var button = container.insert(new Q.UI.Button({
      asset: 'mainTitle.png',
      x: 0,
      y: (Q.height / 2) - 5
    }));

    function startGame() {
      Q.clearStages();
      Q.state.set('play', true);
      Q.stageScene('worldMap');

      // ✅ Only play audio after user clicks or presses Enter
      Q.audio.stop('music_level_complete.mp3');
      Q.audio.stop('music_die.mp3');
      Q.audio.play('music_main.mp3', { loop: true });
    }

    button.on('click', startGame);
    Q.input.on('confirm', function() {
      if (!Q.state.get('play')) startGame();
    });

    container.insert(new Q.UI.Text({
      x: 0,
      y: 10,
      label: 'Press Enter or click to start',
      size: 18,
      color: '#000000'
    }));

    Q.state.set('play', false);
    Q.state.reset({ coins: 0 });

    container.fit(20);
  });
}
