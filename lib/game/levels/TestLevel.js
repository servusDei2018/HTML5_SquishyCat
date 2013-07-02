ig.module( 'game.levels.TestLevel' )
.requires( 'impact.image','game.entities.RoughFloor','game.entities.NonStickObject','game.entities.SquishKitten','game.entities.SlickFloor','game.entities.SpringFloor' )
.defines(function(){
LevelTestLevel=/*JSON[*/{"entities":[{"type":"EntityRoughFloor","x":768,"y":864},{"type":"EntityRoughFloor","x":624,"y":816},{"type":"EntityNonStickObject","x":528,"y":144},{"type":"EntityNonStickObject","x":528,"y":192},{"type":"EntityNonStickObject","x":528,"y":240},{"type":"EntityRoughFloor","x":768,"y":816},{"type":"EntityNonStickObject","x":1152,"y":672},{"type":"EntityRoughFloor","x":720,"y":816},{"type":"EntityNonStickObject","x":1056,"y":672},{"type":"EntitySquishKitten","x":384,"y":96},{"type":"EntityNonStickObject","x":1104,"y":672},{"type":"EntityRoughFloor","x":672,"y":816},{"type":"EntityRoughFloor","x":768,"y":912},{"type":"EntitySlickFloor","x":1008,"y":1104},{"type":"EntitySlickFloor","x":1056,"y":1104},{"type":"EntitySlickFloor","x":1104,"y":1104},{"type":"EntitySlickFloor","x":1152,"y":1104},{"type":"EntitySlickFloor","x":1200,"y":1104},{"type":"EntitySlickFloor","x":1248,"y":1104},{"type":"EntitySpringFloor","x":960,"y":1056},{"type":"EntitySpringFloor","x":912,"y":1056},{"type":"EntitySpringFloor","x":864,"y":1056}],"layer":[{"name":"main","width":30,"height":30,"linkWithCollision":false,"visible":1,"tilesetName":"media/tileset.png","repeat":false,"preRender":false,"distance":"1","tilesize":48,"foreground":false,"data":[[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0],[4,4,3,1,1,1,3,3,3,3,3,3,1,1,4,4,0,0,0,0,0,0,0,0,4,4,4,4,4,0],[6,6,3,3,5,5,5,1,3,3,3,3,3,3,2,2,0,0,0,0,0,0,0,0,0,0,0,0,4,0],[6,6,1,5,3,3,3,3,3,5,1,6,1,3,2,2,0,0,0,0,0,0,0,0,0,0,0,0,4,0],[6,6,1,3,3,1,3,1,1,3,3,6,5,3,2,2,0,0,0,4,4,0,0,0,0,0,0,0,4,0],[6,6,3,3,3,5,3,1,3,3,1,6,3,3,2,2,0,0,0,4,4,0,0,0,0,0,0,0,4,0],[6,6,3,3,3,5,5,5,3,5,1,1,1,1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,4,0],[6,6,3,1,3,3,3,3,1,3,3,1,3,1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,4,0],[4,4,3,3,3,1,3,3,3,3,3,3,3,3,4,4,0,0,0,0,0,0,0,4,0,0,0,0,4,0],[4,4,4,4,4,4,4,4,4,4,4,0,0,0,4,4,0,0,0,0,0,0,0,4,0,0,0,0,4,0],[4,4,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,4,0],[0,4,4,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4],[0,0,4,4,4,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4],[0,0,0,0,4,4,4,4,0,0,4,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,4,4],[0,0,0,0,4,4,4,4,4,0,4,0,0,0,0,0,4,4,0,0,0,0,6,6,6,0,0,0,4,4],[0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4],[0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0],[0,0,0,0,0,0,0,0,0,0,4,4,4,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,4,0],[0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,1,1,0,0,0,0,0,4,4,4,0,0,0,4,0],[0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,1,0,0,0,0,0,0,0,0,0,0,0,4,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,4,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,4,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,1,1,1,0,0,0,0,0,0,0,4,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,2,2,2,2,2,2,4,4,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,4,4,4,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},{"name":"collision","width":30,"height":30,"linkWithCollision":false,"visible":1,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":48,"foreground":false,"data":[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,1,1],[1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,1,1],[1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1],[0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[0,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[0,0,1,1,1,1,1,1,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1],[0,0,0,1,1,1,1,1,1,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,1,1,1,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}]}/*]JSON*/;
LevelTestLevelResources=[new ig.Image('media/tileset.png')];
});