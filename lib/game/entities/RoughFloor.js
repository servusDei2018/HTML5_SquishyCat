ig.module(
        'game.entities.RoughFloor'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityRoughFloor = ig.Entity.extend({

            size: {x:48, y:48},
            highFriction: true,
            collides: ig.Entity.COLLIDES.FIXED,
            gravityFactor: 0,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
            }

        });

    });