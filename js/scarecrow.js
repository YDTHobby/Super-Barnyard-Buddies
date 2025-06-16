function loadScarecrow(Q) {
    Q.Sprite.extend('scarecrow', {
        init: function(p) {
            this._super(p, {
                asset: 'scarecrow.png',
                sensor: true,
                w: 32,
                h: 64,
                color: '#795548'
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
            Q('nugget').trigger('scarecrowWin');
        }
    });
}
