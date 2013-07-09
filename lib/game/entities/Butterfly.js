ig.module(
        'game.entities.Butterfly'
    )
    .requires(
        'impact.entity' ,
        'game.entities.BackgroundObject'
    )
    .defines(function(){

        EntityButterfly = EntityBackgroundObject.extend({

            animSheet: new ig.AnimationSheet( 'media/Art/Environment/Atlases/PurpleGoo64_01.png', 64, 64 ),
            spawnPoint: {x: 0, y: 0},
            maxDistance: 64,
            minSpeed: 5,
            maxBonusSpeed: 50,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );

                this.spawnPoint.x = this.pos.x;
                this.spawnPoint.y = this.pos.y;

                this.vel.x = this.minSpeed + Math.random() * this.maxBonusSpeed;
                this.vel.y = this.minSpeed + Math.random() * this.maxBonusSpeed;

                this.addAnim( 'Idle', 0.1, [0,1,2,3,3,3,3,3,2,1,0,0,0] );
            },

            update: function() {
                if (this.pos.x > (this.spawnPoint.x + this.maxDistance)) {
                    this.vel.x = Math.random() * (-this.maxBonusSpeed) - this.minSpeed;
                }
                else if (this.pos.x < (this.spawnPoint.x - this.maxDistance)) {
                    this.vel.x = Math.random() * (this.maxBonusSpeed) + this.minSpeed;
                }

                if (this.pos.y > (this.spawnPoint.y + this.maxDistance)) {
                    this.vel.y = Math.random() * (-this.maxBonusSpeed) - this.minSpeed;
                }
                else if (this.pos.y < (this.spawnPoint.y - this.maxDistance)) {
                    this.vel.y = Math.random() * (this.maxBonusSpeed) + this.minSpeed;
                }
                this.parent();
            }

        });

    });
