ig.module(
        'game.entities.NonStickObject'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityNonStickObject = ig.Entity.extend({

            size: {x:64, y:64},
            nonStick: true,
            collides: ig.Entity.COLLIDES.FIXED,
            gravityFactor: 0,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
            }

        });

    });