function loadScarecrow(Q) {
    Q.Sprite.extend('scarecrow', {
        init: function(p) {
            this._super(p, {
                asset: 'scarecrow.png',
                sensor: true,

                w: 48,
                h: 96,
                color: '#795548',
                triggered: false

            });
            this.on('sensor');
        },
        draw: function(ctx) {
            var asset = Q.asset('scarecrow.png');
            if (asset) {
                ctx.drawImage(asset, -this.p.cx, -this.p.cy);
            } else {
                ctx.fillStyle = this.p.color;
                ctx.fillRect(-this.p.cx, -this.p.cy, this.p.w, this.p.h);
            }
        },
        sensor: function() {
            this.p.sensor = false;
            if(!this.p.triggered) {
                this.p.triggered = true;
                Q('nugget').trigger('scarecrowWin', this);
            }
        },
        step: function() {
            if(!this.p.triggered) {
                var player = Q('nugget').first();
                if(player && Math.abs(player.p.x - this.p.x) <= 100) {
                    this.p.triggered = true;
                    player.trigger('scarecrowWin', this);
                }
            }
        }
    });
}
