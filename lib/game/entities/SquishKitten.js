ig.module(
        'game.entities.SquishKitten'
    )
    .requires(
        'impact.entity',
        'impact.sound',
        'game.entities.GuideDot'
    )
    .defines(function(){

        EntitySquishKitten = ig.Entity.extend({
            touchingCeiling: false,
            touchingWall: false,
            wallDirection: 0,
            wallClingOK: true,
            wallCling: false,
            ceilingCling: false,
            wallClingTimeLimit: 2,
            wallClingTimer: new ig.Timer(),
            clickedPrevious: false,
            touchPosition: {x:0, y:0},
            type:ig.Entity.TYPE.A,

            touchingLowFriction: false,
            touchingHighFriction: false,
            touchingNoStick: false,

            friction: {x: 0, y: 0},
            maxDrag: 200,
            forceMultiplier: 3,
            guideDots: new Array(),

            size: {x:32, y:32},
            offset: {x:16, y:16 },
            collides: ig.Entity.COLLIDES.ACTIVE,
            maxVel: {x: 700, y: 700},

            animSheet: new ig.AnimationSheet( 'media/Art/Animations/SquishyCat.png', 64, 64 ),
            animFacing: 1,

            gravityFactor: 1,
            bounciness: 0,

            victorious: false,
            victoryDanceTimeLimit: 4,
            victoryDanceTimer: new ig.Timer(),

            defeated: false,
            defeatTimeLimit: 2,
            defeatTimer: new ig.Timer(),

            spawnPoint: {x: 0, y: 0},
            prevVel:    {x: 0, y: 0},

            pointerToMain: null,

            rollSpeedLimit: 100,
            walkSpeedLimit: 10,

            slopeStanding: {min: (0).toRad(), max: (180).toRad() },

            launchSound : new ig.Sound( 'media/SFX/Launch.*' ),
            peelSound : new ig.Sound( 'media/SFX/PeelOffWall.*' ),
            groundImpactSound : new ig.Sound( 'media/SFX/GroundImpact.*' ),
            stretchSound : new ig.Sound( 'media/SFX/LineStretch.*' ),
            bounceSound : new ig.Sound( 'media/SFX/NonStickBounce.*' ),
            respawnSound : new ig.Sound( 'media/SFX/Respawn1.*' ),
            splatSound : new ig.Sound( 'media/SFX/Splat1.*' ),
            splashSound : new ig.Sound( 'media/SFX/WaterSplash.*' ),


        init: function( x, y, settings ) {
                clickedPrevious = false;

                this.parent( x, y, settings );

                this.spawnPoint.x = this.pos.x;
                this.spawnPoint.y = this.pos.y;

                this.addAnim( 'Idle', 0.0416, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19] );
                this.addAnim( 'Walk', 0.0416, [20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38 ] );
                this.addAnim( 'Squish', 0.0416, [39,40,41,42,43], true );
                this.addAnim( 'SquishDown', 0.0416, [44,45] );
                this.addAnim( 'SquishRelease', 0.0416, [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62], true );
                this.addAnim( 'Fly', 0.0416, [61,62,63,64,65,66,67] );
                this.addAnim( 'WallImpact', 0.0416, [68,69,70,71,72,73,74,75,76,77,78,79,80], true );
                this.addAnim( 'WallStick', 0.0416, [81,82] );
                this.addAnim( 'WallPeel', 0.0416, [83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103], true );
                this.addAnim( 'Falling', 0.0416, [104,105,106,107,108] );
                this.addAnim( 'FallImpact', 0.0416, [109, 110, 111, 112, 113, 114, 115, 116, 117], true );
                this.addAnim( 'WallBounce', 0.0416, [118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128], true );
                this.addAnim( 'Roll', 0.0416, [140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153] );
                this.addAnim( 'Slide', 0.0416, [154, 155, 156, 157, 158, 159, 160, 161, 162, 163] );
                this.addAnim( 'Death', 0.0416, [164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174], true );
                this.addAnim( 'Spawn', 0.0416, [175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187], true );
                this.addAnim( 'CeilingStick', 0.0416, [188, 189, 190, 191, 192, 193, 194], true );
                this.addAnim( 'CeilingPeel', 0.0416, [195, 196, 197, 198, 199, 200, 201, 202], true );

                this.currentAnim = this.anims.Spawn;
        } ,

            update: function() {
                this.prevVel.x = this.vel.x;
                this.prevVel.y = this.vel.y;

                if (this.defeated) {
                    if (this.defeatTimeLimit<this.defeatTimer.delta()) {
                        console.log("RESPAWN'D");
                        this.respawnSound.play();
                        this.gravityFactor = 1;
                        this.defeated = false;
                        this.pos.x = this.spawnPoint.x;
                        this.pos.y = this.spawnPoint.y;
                        this.currentAnim = this.anims.Spawn;
                    }
                }
                else if (this.victorious) {
                    if (this.victoryDanceTimeLimit<this.victoryDanceTimer.delta()) {
                        console.log("OUTA HERE");
                        if (this.pointerToMain!=null) {
                           this.pointerToMain.loadLevelByName("stageSelect");
                        }
                    }
                }
                else {
                    if (this.currentAnim.completed) {
                        if (ig.input.state('mouse1'))   {
                            this.currentAnim = this.anims.SquishDown;
                            this.currentAnim.rewind();

                            if (this.animFacing>0) {
                                this.currentAnim.flip.x = false;
                            }
                            else if (this.animFacing<0) {
                                this.currentAnim.flip.x = true;
                            }

                            if (this.ceilingCling) {
                                this.currentAnim.angle = Math.PI;
                            }
                            else if (this.wallCling && this.wallDirection>0) {
                                this.currentAnim.angle = -0.5 * Math.PI;
                            }
                            else if (this.wallCling && this.wallDirection<0) {
                                this.currentAnim.angle = 0.5 * Math.PI;
                            }
                            else {
                                this.currentAnim.angle = 0;
                            }
                        }
                        else if (this.standing) {
                            this.currentAnim = this.anims.Idle;
                            this.currentAnim.rewind();
                            if (this.animFacing<0) {
                                this.currentAnim.flip.x = true;
                            }
                            else {
                                this.currentAnim.flip.x = false;
                            }
                        }
                        else if (this.wallCling || this.ceilingCling) {
                            this.currentAnim = this.anims.WallStick;
                            this.currentAnim.rewind();
                            if (this.ceilingCling) {
                                this.currentAnim.flip.x = true;
                                this.currentAnim.angle = Math.PI * 0.5;
                            }
                            else if (this.animFacing<0) {
                                this.currentAnim.flip.x = true;
                                this.currentAnim.angle = 0;
                            }
                            else {
                                this.currentAnim.flip.x = false;
                                this.currentAnim.angle = 0;
                            }
                        }
                        else {
                            if (this.vel.y>0) {

                                this.currentAnim = this.anims.Falling;
                                this.currentAnim.rewind();

                                if (this.animFacing<0) {
                                    this.currentAnim.flip.x = true;
                                }
                                else {
                                    this.currentAnim.flip.x = false;
                                }
                            }
                            else {

                                this.currentAnim = this.anims.Fly;
                                this.currentAnim.rewind();

                                if (this.animFacing<0) {
                                    this.currentAnim.flip.x = true;
                                }
                                else {
                                    this.currentAnim.flip.x = false;
                                }

                            }
                        }
                    }
                    else if (this.currentAnim!= this.anims.CeilingPeel && this.currentAnim!= this.anims.WallPeel) {
                        if (!this.standing && !this.touchingWall && !this.ceilingCling && this.vel.y !=0) {
                            if (this.vel.y>0 && this.currentAnim!= this.anims.Falling) {
                                this.currentAnim = this.anims.Falling;
                                this.currentAnim.rewind();

                                if (this.animFacing<0) {
                                    this.currentAnim.flip.x = true;
                                }
                                else {
                                    this.currentAnim.flip.x = false;
                                }
                            }
                            else if (this.vel.y<0 && this.currentAnim!= this.anims.Fly) {
                                this.currentAnim = this.anims.Fly;
                                this.currentAnim.rewind();

                                if (this.animFacing<0) {
                                    this.currentAnim.flip.x = true;
                                }
                                else {
                                    this.currentAnim.flip.x = false;
                                }
                            }

                        }

                    }

                    if (this.standing) {
                        if (this.touchingLowFriction) {
                            this.friction.x = 200;
                        }
                        else if (this.touchingHighFriction) {
                            this.friction.x = 3000;
                        }
                        else {
                            this.friction.x = 1000;
                        }

                        if (this.currentAnim!=this.anims.FallImpact && !ig.input.state('mouse1')) {


                            if (this.touchingLowFriction) {
                                if (this.currentAnim!=this.anims.Slide) {
                                    this.currentAnim = this.anims.Slide;
                                    this.currentAnim.rewind();
                                    if (this.animFacing<0) {
                                        this.currentAnim.flip.x = true;
                                    }
                                    else {
                                        this.currentAnim.flip.x = false;
                                    }
                                }
                            }
                            else if (this.vel.x>this.rollSpeedLimit || this.vel.x<(-this.rollSpeedLimit)) {
                                if (this.currentAnim!=this.anims.Roll) {
                                    this.currentAnim = this.anims.Roll;
                                    this.currentAnim.rewind();
                                    if (this.vel.x<0) {
                                        this.animFacing = -1;
                                        this.currentAnim.flip.x = true;
                                    }
                                    else {
                                        this.animFacing = 1;
                                        this.currentAnim.flip.x = false;
                                    }
                                }
                            }
                            else if (this.vel.x>this.walkSpeedLimit || this.vel.x<(-this.walkSpeedLimit)) {
                                if (this.currentAnim!=this.anims.Walk) {
                                    this.currentAnim = this.anims.Walk;
                                    this.currentAnim.rewind();
                                    if (this.vel.x<0) {
                                        this.animFacing = -1;
                                        this.currentAnim.flip.x = true;
                                    }
                                    else {
                                        this.animFacing = 1;
                                        this.currentAnim.flip.x = false;
                                    }
                                }
                            }
                            else if (this.currentAnim!=this.anims.Idle) {
                                this.currentAnim = this.anims.Idle;
                                this.currentAnim.rewind();
                                if (this.vel.x<0) {
                                    this.animFacing = -1;
                                    this.currentAnim.flip.x = true;
                                }
                                else {
                                    this.animFacing = 1;
                                    this.currentAnim.flip.x = false;
                                }
                            }
                        }
                    }
                    else {
                        this.friction.x = 0;
                    }

                    if (this.touchingWall && !this.touchingNoStick) {
                        if (this.wallClingOK) {
                            this.wallClingOK = false;
                            this.wallCling = true;
                            this.gravityFactor = 0;
                            this.wallClingTimer.reset();
                        }
                    }
                    else if (this.touchingCeiling && !this.touchingNoStick) {
                        if (this.wallClingOK) {
                            this.wallClingOK = false;
                            this.ceilingCling = true;
                            this.gravityFactor = 0;
                            this.wallClingTimer.reset();
                        }
                    }

                    if( ig.input.state('mouse1') ) {
                        if (!clickedPrevious) {
                            this.touchPosition.x = ig.input.mouse.x;
                            this.touchPosition.y = ig.input.mouse.y;
                            this.guideDots[0] = ig.game.spawnEntity(EntityGuideDot, this.pos.x, this.pos.y); //new EntityGuideDot();
                            this.guideDots[1] = ig.game.spawnEntity(EntityGuideDot, this.pos.x, this.pos.y); //new EntityGuideDot();

                            this.stretchSound.play();

                            this.currentAnim = this.anims.Squish;
                            this.currentAnim.rewind();

                            if (this.animFacing>0) {
                               this.currentAnim.flip.x = false;
                            }
                            else if (this.animFacing<0) {
                                this.currentAnim.flip.x = true;
                            }

                            if (this.ceilingCling) {
                                this.currentAnim.angle = Math.PI;
                            }
                            else if (this.wallCling && this.wallDirection>0) {
                                this.currentAnim.angle = -0.5 * Math.PI;
                            }
                            else if (this.wallCling && this.wallDirection<0) {
                                this.currentAnim.angle = 0.5 * Math.PI;
                            }
                            else {
                                this.currentAnim.angle = 0;
                            }

                            ig.game.sortEntitiesDeferred();
                        }
                        else {
                            var diffX = this.touchPosition.x - ig.input.mouse.x;
                            var diffY = this.touchPosition.y - ig.input.mouse.y;

                            //Restrict Angle While on Ground
                            if (this.standing && diffY>0) {
                                diffY = 0;
                            }
                            if (this.ceilingCling && diffY<0) {
                                diffY = 0;
                            }
                            //Restrict Angle While on Wall
                            if (this.wallCling && this.wallDirection>0 && diffX>0) {
                                diffX = 0;
                            }
                            if (this.wallCling && this.wallDirection<0 && diffX<0) {
                                diffX = 0;
                            }

                            var magnitude = Math.sqrt((diffX * diffX) + (diffY * diffY));

                            if (magnitude > this.maxDrag) {
                                diffX = this.maxDrag * diffX/magnitude;
                                diffY = this.maxDrag * diffY/magnitude;
                            }


                            var nextGuideDot = null;
                            var spacing = 0;

                            for (var i=0; i<this.guideDots.length; i++) {
                                spacing = i + 1;
                                nextGuideDot = this.guideDots[i];
                                nextGuideDot.pos.x = this.pos.x + diffX/spacing;
                                nextGuideDot.pos.y = this.pos.y + diffY/spacing;
                            }
                        }

                        clickedPrevious = true;
                    }
                    else if (clickedPrevious) {
                        clickedPrevious = false;
                        if (this.standing || this.wallCling || this.ceilingCling) {
                            this.wallClingOK = true;
                            this.gravityFactor = 1;

                            var diffX = this.touchPosition.x - ig.input.mouse.x;
                            var diffY = this.touchPosition.y - ig.input.mouse.y;

                            //Restrict Angle While on Ground
                            if (this.standing && diffY>0) {
                                diffY = 0;
                            }
                            if (this.ceilingCling && diffY<0) {
                                diffY = 0;
                            }
                            //Restrict Angle While on Wall
                            if (this.wallCling && this.wallDirection>0 && diffX>=0) {
                                diffX = 0;
                            }
                            if (this.wallCling && this.wallDirection<0 && diffX<=0) {
                                diffX = 0;
                            }

                            var magnitude = Math.sqrt((diffX * diffX) + (diffY * diffY));

                            console.log("Diff X " + diffX + " Diff Y" + diffY + " MAG " + magnitude);

                            if (magnitude< this.maxDrag) {
                                this.vel.x = (diffX) * this.forceMultiplier;
                                this.vel.y = (diffY) * this.forceMultiplier;
                            }
                            else {
                                console.log("OVER MAX");
                                this.vel.x = (this.maxDrag * (diffX/magnitude)) * this.forceMultiplier;
                                this.vel.y = (this.maxDrag * (diffY/magnitude)) * this.forceMultiplier;
                            }

                            //POOSH
                            if (this.ceilingCling && this.vel.y ==0) {
                                this.vel.y = 10;
                            }
                            if (this.wallCling && this.vel.x ==0) {
                                if (this.wallDirection>0) {
                                    this.vel.x = -10;
                                }
                                if (this.wallDirection<0) {
                                    this.vel.x = 10;
                                }
                            }

                            this.launchSound.play();

                            this.currentAnim = this.anims.Fly;
                            this.currentAnim.rewind();

                            if (this.vel.x<0) {
                                this.animFacing = -1;
                                this.currentAnim.flip.x = true;
                            }
                            else {
                                this.animFacing = 1;
                                this.currentAnim.flip.x = false;
                            }

                            this.ceilingCling = false;
                            this.wallCling = false;
                        }

                        var nextGuideDot = null;
                        for (var i=0; i<this.guideDots.length; i++) {
                            nextGuideDot = this.guideDots[i];
                            nextGuideDot.kill();
                        }
                    }

                    this.touchingLowFriction = false;
                    this.touchingHighFriction = false;
                    this.touchingNoStick = false;


                    if (this.wallCling) {
                        this.vel.x = 0;
                        this.vel.y = 0;

                        if (this.wallClingTimeLimit<this.wallClingTimer.delta()) {
                            this.peelSound.play();

                            console.log("DROP IT");
                            if (this.wallDirection == 1) {

                                this.currentAnim = this.anims.WallPeel;
                                this.currentAnim.rewind();
                                this.currentAnim.angle = 0;
                                this.currentAnim.flip.x = false;
                            }
                            else if (this.wallDirection == -1) {

                                this.currentAnim = this.anims.WallPeel;
                                this.currentAnim.rewind();
                                this.currentAnim.angle = 0;
                                this.currentAnim.flip.x = true;
                            }


                            this.gravityFactor = 1;
                            this.wallCling = false;
                            this.wallClingTimer.pause();
                        }
                    }

                    if (this.ceilingCling)  {
                        this.vel.x = 0;
                        this.vel.y = 0;

                        if (this.wallClingTimeLimit<this.wallClingTimer.delta()) {
                            this.peelSound.play();
                            //CeilingPeel
                            this.currentAnim = this.anims.CeilingPeel;
                            this.currentAnim.rewind();
                            this.currentAnim.angle = 0;
                            this.currentAnim.flip.x = false;

                            console.log("DROP IT");
                            this.gravityFactor = 1;
                            this.ceilingCling = false;
                            this.wallClingTimer.pause();
                        }
                    }
                }

                this.parent();
            },

            handleMovementTrace: function( res ) {
                this.touchingWall = false;
                this.touchingCeiling = false;
                if( res.collision.x ) {

                    if( this.bounciness > 0 && Math.abs(this.vel.x) > this.minBounceVelocity ) {

                    }
                    else {
                        this.touchingWall = true;
                        if (this.vel.x>0) {
                            this.wallDirection = 1;
                            this.animFacing = 1;

                            this.currentAnim = this.anims.WallImpact;
                            this.currentAnim.rewind();
                            this.currentAnim.angle = 0;
                            this.currentAnim.flip.x = false;
                        }
                        else if (this.vel.x<0) {
                            this.wallDirection = -1;
                            this.animFacing = -1;

                            this.currentAnim = this.anims.WallImpact;
                            this.currentAnim.rewind();
                            this.currentAnim.angle = 0;
                            this.currentAnim.flip.x = true;
                        }
                    }
                }

                if( res.collision.y ) {
                    if( this.bounciness > 0 && Math.abs(this.vel.y) > this.minBounceVelocity ) {

                    }
                    else {
                        if( this.vel.y < 0 ) {
                            this.touchingCeiling = true;

                            this.currentAnim = this.anims.CeilingStick;
                            this.currentAnim.rewind();
                            this.currentAnim.flip.x = true;
                        }
                        else if (!this.standing && this.currentAnim != this.anims.Spawn) {
                            this.groundImpactSound.play();

                            this.currentAnim = this.anims.FallImpact;
                            this.currentAnim.rewind();
                        }
                    }
                }

                this.parent(res);

            },

            collideWith: function( other, axis ) {
                this.parent(other, axis);

                if (other.springSurface)    {
                    if (other.springVelocityX!=0) {
                        this.vel.x = other.springVelocityX;
                        this.currentAnim = this.anims.Fly;
                        this.currentAnim.rewind();
                        this.bounceSound.play();

                        if (this.vel.x<0) {
                            this.animFacing = -1;
                            this.currentAnim.flip.x = true;
                        }
                        else {
                            this.animFacing = 1;
                            this.currentAnim.flip.x = false;
                        }
                    }
                    if (other.springVelocityY!=0) {
                        this.wallClingOK = true;
                        this.vel.y = other.springVelocityY;
                        this.currentAnim = this.anims.Fly;
                        this.currentAnim.rewind();
                        this.bounceSound.play();

                        if (this.vel.x<0) {
                            this.animFacing = -1;
                            this.currentAnim.flip.x = true;
                        }
                        else {
                            this.animFacing = 1;
                            this.currentAnim.flip.x = false;
                        }
                    }
                }
                else if (other.lowFriction) {
                    this.touchingLowFriction = true;
                }
                else if (other.highFriction) {
                    this.touchingHighFriction = true;
                }
                else if (other.nonStick) {
                    this.touchingNoStick = true;
                    if (axis == 'x') {
                        this.bounceSound.play();
                        this.vel.x = this.prevVel.x * (-0.4);

                        this.currentAnim = this.anims.WallBounce;
                        this.currentAnim.rewind();

                        if (this.vel.x<0) {
                            this.animFacing = -1;
                            this.currentAnim.flip.x = true;
                        }
                        else {
                            this.animFacing = 1;
                            this.currentAnim.flip.x = false;
                        }

                    }
                }
            },

            defeat: function () {
                if (!this.defeated) {
                    this.defeated = true;
                    this.vel.x = 0;
                    this.vel.y = 0;
                    this.gravityFactor = 0;

                    var nextGuideDot = null;
                    for (var i=0; i<this.guideDots.length; i++) {
                        nextGuideDot = this.guideDots[i];
                        nextGuideDot.kill();
                    }

                    this.currentAnim = this.anims.Death;
                    this.currentAnim.rewind();
                    this.currentAnim.angle = 0;

                    this.defeatTimer.reset();
                }
            }   ,

            victory: function () {
                if (!this.victorious) {
                    this.victorious = true;
                    this.vel.x = 0;
                    this.vel.y = 0;
                    this.gravityFactor = 0;

                    var nextGuideDot = null;
                    for (var i=0; i<this.guideDots.length; i++) {
                        nextGuideDot = this.guideDots[i];
                        nextGuideDot.kill();
                    }

                    this.victoryDanceTimer.reset();
                }
            }

        });

    });