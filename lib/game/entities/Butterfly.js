ig.module(
        'game.entities.Butterfly'
    )
    .requires(
        'impact.entity' ,
        'game.entities.BackgroundObject'
    )
    .defines(function(){

        EntityButterfly = EntityBackgroundObject.extend({

            animSheet: new ig.AnimationSheet( 'media/Art/Animations/butterfly.png', 64, 64 ),
            spawnPoint: {x: 0, y: 0},
            maxDistance: 20,
            minSpeed: 10,
            maxBonusSpeed: 50,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );

                this.spawnPoint.x = this.pos.x;
                this.spawnPoint.y = this.pos.y;

                this.vel.x = (-this.minSpeed) - Math.random() * this.maxBonusSpeed;
                this.vel.y = this.minSpeed + Math.random() * this.maxBonusSpeed;

                this.addAnim( 'Idle', 0.1, [0,1,2,3,4,5,6,7,8,9,10,11] );
            },

            update: function() {
                if (this.pos.x > (this.spawnPoint.x + this.maxDistance)) {
                    this.vel.x = Math.random() * (-this.maxBonusSpeed) - this.minSpeed;
                    this.currentAnim.flip.x = false;
                }
                else if (this.pos.x < (this.spawnPoint.x - this.maxDistance)) {
                    this.vel.x = Math.random() * (this.maxBonusSpeed) + this.minSpeed;
                    this.currentAnim.flip.x = true;
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
