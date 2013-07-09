ig.module(
        'game.entities.LevelCompleteScreen'
    )
    .requires(
        'impact.entity' ,
        'game.entities.BackgroundObject'
    )
    .defines(function(){

        EntityLevelCompleteScreen = EntityBackgroundObject.extend({

            size: {x:768, y:768},
            animSheet: new ig.AnimationSheet( 'media/Art/Environment/SplashScreen/LevelComplete.png', 768, 768 ),

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'Idle', 0.5, [0] );
            }
        });

    });
