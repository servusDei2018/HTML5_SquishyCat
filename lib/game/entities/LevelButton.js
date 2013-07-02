ig.module(
        'game.entities.LevelButton'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityLevelButton = ig.Entity.extend({

            size: {x:96, y:96},
            mouseDownOnButton: false,
            gravityFactor: 0,
            levelToLoad: "nope",
            pointerToMain: null,


            init: function( x, y, settings ) {
                this.parent( x, y, settings );
            },

            update: function() {
                if ( ig.input.state('mouse1') ) {
                    if (ig.input.mouse.x> this.pos.x && ig.input.mouse.x < (this.pos.x + this.size.x)) {
                        if (ig.input.mouse.y> this.pos.y && ig.input.mouse.y < (this.pos.y + this.size.y)) {
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
                        if (this.levelToLoad!="nope" || this.pointerToMain==null) {
                             this.pointerToMain.loadLevelByName(this.levelToLoad);
                        }
                        else {
                            console.log("Nope.");
                        }
                    }
                }
            }
        })
    });