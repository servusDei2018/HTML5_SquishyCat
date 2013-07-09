ig.module(
        'game.entities.GreenLinesLargeB'
    )
    .requires(
        'impact.entity' ,
        'game.entities.BackgroundObject'
    )
    .defines(function(){

        EntityGreenLinesLargeB = EntityBackgroundObject.extend({

            animSheet: new ig.AnimationSheet( 'media/Art/Environment/Atlases/GreenLineGlow64_02.png', 64, 64 ),

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'Idle', 0.1, [0,1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,1,0,0,0] );
                this.anims.Idle.gotoRandomFrame();
            }
        });

    });
