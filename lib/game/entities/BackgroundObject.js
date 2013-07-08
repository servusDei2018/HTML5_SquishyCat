ig.module(
        'game.entities.BackgroundObject'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityBackgroundObject = ig.Entity.extend({

            zIndex: -1,
            size: {x:64, y:64},
            collides: ig.Entity.COLLIDES.NONE,
            gravityFactor: 0,
            flipped: false,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
            }
        });

    });
