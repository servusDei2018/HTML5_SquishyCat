ig.module(
        'game.entities.RoughFloor'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityRoughFloor = ig.Entity.extend({

            size: {x:64, y:64},
            highFriction: true,
            collides: ig.Entity.COLLIDES.FIXED,
            gravityFactor: 0,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
            }

        });

    });