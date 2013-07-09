ig.module(
        'game.entities.TutorialSign'
    )
    .requires(
        'impact.entity' ,
        'game.entities.BackgroundObject'
    )
    .defines(function(){

        EntityTutorialSign = EntityBackgroundObject.extend({

            animSheet: new ig.AnimationSheet( 'media/Art/Animations/Tutorial01.png', 256, 256 ),

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'Idle', 0.5, [0,1,2,3,4,5,6,7,8] );
                this.anims.Idle.gotoRandomFrame();
            }
        });

    });

