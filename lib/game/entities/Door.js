ig.module(
        'game.entities.Door'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

      EntityDoor = ig.Entity.extend({

            size: {x:64, y:64},
            collides: ig.Entity.COLLIDES.FIXED,
            gravityFactor: 0,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
            },

            switchOn: function( ) {
                this.kill();
            }

        });

    });