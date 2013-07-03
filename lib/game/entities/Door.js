ig.module(
        'game.entities.Door'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

      EntityDoor = ig.Entity.extend({

            size: {x:64, y:192},
            collides: ig.Entity.COLLIDES.FIXED,
            gravityFactor: 0,
            animSheet: new ig.AnimationSheet( 'media/Art/Environment/Atlases/Door.png', 64, 192 ),

            rising: false,
            risingSpeed: 5,
            initPos: {x:0, y:0},
            finalHeight: 192,


            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'Idle', 1, [1] );
                this.addAnim( 'Active', 1, [0] );
                this.initPos.x = this.pos.x;
                this.initPos.y = this.pos.y;
            },

            update: function() {
                if (this.rising) {
                    var goalHeight = this.initPos.y + this.finalHeight;

                    this.pos.y -= this.risingSpeed
                    if (this.pos.y>=goalHeight) {
                       this.kill();
                    }
                }

                this.parent();
            },

            switchOn: function( ) {
                console.log("GET UP, DOOR");
                this.currentAnim = this.anims.Active;
                this.collides = ig.Entity.COLLIDES.NONE;
                this.rising = true;
                this.vel.y = -this.risingSpeed;

                //this.kill();
            }

        });

    });