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

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
            },

            check: function(other) {
                if (!this.flipped) {
                    this.flipped = true;
                    if (this.activationTarget!=null) {
                        ig.game.getEntityByName(this.activationTarget).switchOn();
                    }
                }
            }

        });

    });