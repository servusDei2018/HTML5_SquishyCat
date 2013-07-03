ig.module(
        'game.entities.Switch'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntitySwitch = ig.Entity.extend({

            zIndex: -1,
            size: {x:64, y:64},
            collides: ig.Entity.COLLIDES.NONE,
            checkAgainst: ig.Entity.TYPE.BOTH,
            gravityFactor: 0,
            activationTarget: null,
            flipped: false,

            animSheet: new ig.AnimationSheet( 'media/Art/Environment/Atlases/Button.png', 64, 64 ),

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'Idle', 1, [0] );
                this.addAnim( 'Active', 1, [1] );
            },


            check: function(other) {
                if (!this.flipped) {
                    this.flipped = true;
                    this.currentAnim = this.anims.Active;
                    if (this.activationTarget!=null) {
                        ig.game.getEntityByName(this.activationTarget).switchOn();
                    }
                }
            }

        });

    });