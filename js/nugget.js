function loadNugget(Q) {
    /*--------------------------------------------Super YDT Buddies------------------------------------------*/

    Q.animations('nugget animation', {
        'run_right': { frames: [1, 2, 3], rate: 1 / 7 },
        'run_left': { frames: [15, 16, 17], rate: 1 / 7 },
        'stand_right': { frames: [0], loop: false },
        'stand_left': { frames: [14], loop: false },
        'jumping_right': { frames: [4], loop: false },
        'jumping_left': { frames: [18], loop: false },
        'die': { frames: [12], loop: false }
    });
    /**
     * Class representing Nugget.
     */
    Q.Sprite.extend('nugget', {
        /** 
         * Class initialization.
         */
        init: function(p) {
            this._super(p, {
                sprite: 'nugget animation',
                /**
                 * Nugget Sprite.
                 */
                sheet: 'nugget',
                /**
                 * Nugget starting position.
                 */
                x: 150,
                y: 380,
                direction: 'right',
                /**
                 * Nugget velocity parameters.
                 */
                jumpSpeed: -500,
                speed: 200,
                vy: 10,
                /**
                 * Additional attributes.
                 */
                die: false,
                move: true
            });
            /**
             * The necessary Quintus modules.
             */
            this.add('2d, platformerControls, animation, tween');
            /**
             * Definition of additional functions.
             */
            this.on('die');
            this.on('win');
            this.on('scarecrowWin');
        },
        /**
         * nugget dies.
         */
        die: function() {
            Q.audio.stop('music_main.mp3');
            if (!this.p.die) {
                Q.audio.play('music_die.mp3');
            }
            this.p.die = true;
            this.p.speed = 0;
            this.p.jumpSpeed = 0;

            var lose = function() {
                this.destroy();
                Q.stageScene('endGame', 1, { label: 'Game Over' });
            }
            var nuggetDie = function() {
                this.animate({ x: this.p.x, y: fondo_escenario, angle: 0 }, 0.5, { callback: lose });
            }
            this.animate({ y: this.p.y - 100, angle: 0 }, 0.3, { callback: nuggetDie });
        },
        /**
         * nugget wins.
         */
        win: function() {
            this.p.move = false;
            Q.audio.stop('music_main.mp3');
            Q.audio.play('music_level_complete.mp3');
            Q.stageScene('endGame', 1, { label: 'You Win' });
        },

        scarecrowWin: function(target) {
            var self = this;
            this.p.move = false;
            Q.audio.stop('music_main.mp3');
            Q.audio.play('music_level_complete.mp3');


            var targetX = target ? target.p.x - 100 : this.p.x + 30;
            this.animate({ x: targetX }, 0.5, {
                callback: function() {
                    var dirs = ['left', 'right', 'left', 'right'];
                    var i = 0;
                    var look = function() {
                        if(i < dirs.length) {
                            self.p.direction = dirs[i];
                            i++;

                            setTimeout(look, 375);
                        } else {
                            var stage = self.stage;
                            var circle = stage.insert(new Q.Sprite({
                                x: self.p.x,
                                y: self.p.y,
                                radius: 10,
                                type: Q.SPRITE_NONE
                            }));

                            circle.add('tween');
                            circle.draw = function(ctx) {
                                ctx.fillStyle = '#000';
                                ctx.beginPath();
                                ctx.arc(0, 0, this.p.radius, 0, Math.PI * 2);
                                ctx.fill();
                            };
                            circle.animate({ radius: 1000 }, 1, {
                                callback: function() {
                                    Q.stageScene('endGame', 1, { label: 'You Win' });
                                }
                            });
                        }
                    };
                    look();
                }
            });
        },
        /**
         * Execute a nugget step.
         */
        step: function(dt) {
            /**
             * In case nugget dies.
             */
            if (this.p.die) {
                this.play('die');
                this.p.speed = 0;
                this.p.jumpSpeed = 0;
            } else {
                /**
                 * Normal movement.
                 */
                if (this.p.move) {
                    if (this.p.vy != 0) {
                        this.play('jumping_' + this.p.direction)
                    } else if (this.p.vx != 0) {
                        this.play('run_' + this.p.direction );
                    } else {
                        this.play('stand_' + this.p.direction);
                    }
                    /*
                     * If he falls off the stage, Nugget dies.
                     */
                    if (this.p.y > fondo_escenario) {
                        this.trigger('die');
                    }
                }
                /**
                 * He has won the game.
                 */
                else {
                    this.play('stand_' + this.p.direction);
                    this.p.speed = 0;
                    this.p.jumpSpeed = 0;
                }
            }
        }
    });
}
