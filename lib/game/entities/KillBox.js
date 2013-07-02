ig.module(
        'game.entities.KillBox'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityKillBox = ig.Entity.extend({

            size: {x:64, y:64},
            collides: ig.Entity.COLLIDES.FIXED,
            gravityFactor: 0,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
            },

            collideWith: function( other, axis ) {
                this.parent(other, axis);

                if (other.defeat!=null) {
                    other.defeat();
                }
            }

        });

    });