ig.module(
        'game.entities.SquishKitten'
    )
    .requires(
        'impact.entity',
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

            touchingLowFriction: false,
            touchingHighFriction: false,
            touchingNoStick: false,

            friction: {x: 0, y: 0},
            maxDrag: 200,
            forceMultiplier: 3,
            guideDots: new Array(),

            size: {x:48, y:48},
            collides: ig.Entity.COLLIDES.ACTIVE,
            maxVel: {x: 700, y: 700},

            animSheet: new ig.AnimationSheet( 'media/puck.png', 48, 48 ),

            gravityFactor: 1,
            bounciness: 0,

            victorious: false,
            victoryDanceTimeLimit: 4,
            victoryDanceTimer: new ig.Timer(),

            defeated: false,
            defeatTimeLimit: 2,
            defeatTimer: new ig.Timer(),

            spawnPoint: {x: 0, y: 0},
            pointerToMain: null,

            slopeStanding: {min: (0).toRad(), max: (180).toRad() },


            init: function( x, y, settings ) {
                clickedPrevious = false;

                this.parent( x, y, settings );

                this.spawnPoint.x = this.pos.x;
                this.spawnPoint.y = this.pos.y;
                this.addAnim( 'idle', 0.1, [0,1,2,3,4,4,4,4,3,2,1] );
            } ,

            update: function() {

                if (this.defeated) {
                    if (this.defeatTimeLimit<this.defeatTimer.delta()) {
                        console.log("RESPAWN'D");
                        this.gravityFactor = 1;
                        this.defeated = false;
                        this.pos.x = this.spawnPoint.x;
                        this.pos.y = this.spawnPoint.y;
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
                            console.log("DROP IT");
                            this.gravityFactor = 1;
                            this.wallCling = false;
                            this.wallClingTimer.pause();
                        }
                    }

                    if (this.ceilingCling)  {
                        this.vel.x = 0;
                        this.vel.y = 0;

                        if (this.wallClingTimeLimit<this.wallClingTimer.delta()) {
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
                        }
                        else if (this.vel.x<0) {
                            this.wallDirection = -1;
                        }
                    }
                }

                if( res.collision.y ) {
                    if( this.bounciness > 0 && Math.abs(this.vel.y) > this.minBounceVelocity ) {

                    }
                    else {
                        if( this.vel.y < 0 ) {
                            this.touchingCeiling = true;
                        }
                    }
                }

                this.parent(res);

            },

            collideWith: function( other, axis ) {
                this.parent(other, axis);

                if (other.springSurface)    {
                    if (other.springVelocity.x!=0) {
                        this.vel.x = other.springVelocity.x;
                    }
                    if (other.springVelocity.y!=0) {
                        this.vel.y = other.springVelocity.y;
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