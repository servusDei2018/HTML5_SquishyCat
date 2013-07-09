ig.module(
        'game.entities.PurpleGoo'
    )
    .requires(
        'impact.entity' ,
        'game.entities.BackgroundObject'
    )
    .defines(function(){

        EntityPurpleGoo = EntityBackgroundObject.extend({

            animSheet: new ig.AnimationSheet( 'media/Art/Environment/Atlases/PurpleGoo64_01.png', 64, 64 ),

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'Idle', 0.3, [0,1,2,3,3,3,3,3,2,1,0,0,0] );
            }
        });

    });
