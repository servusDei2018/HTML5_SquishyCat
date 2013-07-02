ig.module(
        'game.entities.WinBox'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityWinBox = ig.Entity.extend({

            size: {x:48, y:48},
            collides: ig.Entity.COLLIDES.FIXED,
            gravityFactor: 0,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
            },

            collideWith: function( other, axis ) {
                this.parent(other, axis);

                if (other.victory!=null) {
                    other.victory();
                }
            }

        });

    });