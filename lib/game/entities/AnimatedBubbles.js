ig.module(
        'game.entities.AnimatedBubbles'
    )
    .requires(
        'impact.entity' ,
        'game.entities.BackgroundObject'
    )
    .defines(function(){

        EntityAnimatedBubbles = EntityBackgroundObject.extend({

            animSheet: new ig.AnimationSheet( 'media/Art/Animations/bubbles.png', 64, 64 ),

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'Idle', 0.1, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,28,28,28,28,28,28,28,28,28,28,28] );
                this.anims.Idle.gotoRandomFrame();
            }
        });

    });
