ig.module(
        'game.entities.ExitLevelButton'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityExitLevelButton = ig.Entity.extend({

            zIndex: -10,
            size: {x:128, y:128},
            animSheet: new ig.AnimationSheet( 'media/Art/Environment/SplashScreen/exitbutton.png', 128, 128 ),

            mouseDownOnButton: false,
            gravityFactor: 0,
            pointerToMain: null,

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim( 'Idle', 0.5, [0] );
            },

            update: function() {
                if ( ig.input.state('mouse1') ) {
                    console.log("Mouse pos " + ig.input.mouse.x + " " + ig.input.mouse.y);
                    console.log("Screen pos " + this.pointerToMain.screen.x + " " + this.pointerToMain.screen.y);
                    console.log("This pos " + this.pos.x + " " + this.pos.y);
                    if (ig.input.mouse.x> (this.pos.x - this.pointerToMain.screen.x) && ig.input.mouse.x < ((this.pos.x - this.pointerToMain.screen.x) + this.size.x)) {
                        if (ig.input.mouse.y> (this.pos.y - this.pointerToMain.screen.y) && ig.input.mouse.y < ((this.pos.y - this.pointerToMain.screen.y) + this.size.y)) {
                            this.mouseDownOnButton = true;
                        }
                        else {
                            this.mouseDownOnButton = false;
                        }
                    }
                    else {
                        this.mouseDownOnButton = false;
                    }
                }
                else {
                    if (this.mouseDownOnButton) {
                        console.log("Click detected");
                        this.mouseDownOnButton = false;
                        this.pointerToMain.loadLevelByName("stageSelect");
                    }
                }
                this.parent();
            }
        })
    });