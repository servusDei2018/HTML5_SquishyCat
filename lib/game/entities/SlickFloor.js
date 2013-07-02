ig.module(
        'game.entities.SlickFloor'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntitySlickFloor = ig.Entity.extend({

            size: {x:64, y:64},
            lowFriction: true,
            collides: ig.Entity.COLLIDES.FIXED,
            gravityFactor: 0,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
            }

        });

    });