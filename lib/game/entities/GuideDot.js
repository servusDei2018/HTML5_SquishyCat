ig.module(
        'game.entities.GuideDot'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityGuideDot = ig.Entity.extend({

            size: {x:64, y:64},
            collides: ig.Entity.COLLIDES.NEVER,
            animSheet: new ig.AnimationSheet( 'media/Art/GuideDot.png', 64, 64 ),
            gravityFactor: 0,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'idle', 0.1, [0] );
            }
        });

    });