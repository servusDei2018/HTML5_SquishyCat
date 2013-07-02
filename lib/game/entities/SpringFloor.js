ig.module(
        'game.entities.SpringFloor'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntitySpringFloor = ig.Entity.extend({

            size: {x:64, y:64},
            springSurface: true,
            springVelocityX: 0,
            springVelocityY: (-300),
            collides: ig.Entity.COLLIDES.FIXED,
            gravityFactor: 0,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
            }

        });

    });