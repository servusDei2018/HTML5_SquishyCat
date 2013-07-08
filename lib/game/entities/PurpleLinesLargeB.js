ig.module(
        'game.entities.PurpleLinesLargeB'
    )
    .requires(
        'impact.entity' ,
        'game.entities.BackgroundObject'
    )
    .defines(function(){

        EntityPurpleLinesLargeB = EntityBackgroundObject.extend({

            animSheet: new ig.AnimationSheet( 'media/Art/Environment/Atlases/PurpleLineGlow64_02.png', 64, 64 ),

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'Idle', 0.1, [0,1,2,3,3,3,3,3,2,1,0,0,0] );
                this.anims.Idle.gotoRandomFrame();
            }
        });

    });
