ig.module(
        'game.entities.Door'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

      EntityDoor = ig.Entity.extend({

            size: {x:64, y:192},
            collides: ig.Entity.COLLIDES.FIXED,
            gravityFactor: 0,
            animSheet: new ig.AnimationSheet( 'media/Art/Environment/Atlases/Door.png', 64, 192 ),


            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'Idle', 1, [1] );
                this.addAnim( 'Active', 1, [0] );
            },

            switchOn: function( ) {
                this.kill();
            }

        });

    });