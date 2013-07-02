ig.module(
        'game.entities.SpringFloor'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntitySpringFloor = ig.Entity.extend({

            size: {x:48, y:48},
            springSurface: true,
            springVelocity: {x:0, y:(-300) },
            collides: ig.Entity.COLLIDES.FIXED,
            gravityFactor: 0,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
            }

        });

    });