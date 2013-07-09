ig.module(
        'game.entities.LevelCompleteScreen'
    )
    .requires(
        'impact.entity' ,
        'game.entities.BackgroundObject'
    )
    .defines(function(){

        EntityLevelCompleteScreen = EntityBackgroundObject.extend({

            size: {x:512, y:512},
            animSheet: new ig.AnimationSheet( 'media/Art/Environment/SplashScreen/LevelComplete.png', 512, 512 ),

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'Idle', 0.5, [0] );
            }
        });

    });
