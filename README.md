#[Tiny Stealth](http://js13kgames.com/entries/tiny-stealth)#

This is my [js13kgames](http://js13kgames.com/) 2015 entry!


##Tequinical stuff##


### Render ###

All the tilemaps are rendered to a canvas and saved as png, it's necessary only one draw call to draw the entire tile map, each tilemap have 360 tiles. The tilemap is only rendered if is on screen, no more than 2 tilemaps are drawn each frame.


Each tilemap have a reference to 3 enemies, and these enemies are rendered when its tilemap is drawn, no more than 6 enemies are drawn (and updated) each frame.

Player is drawn all the time. Bullets are drawn only when the player or enemies shoot them!

### Collision ###

I'm using [sat-js](https://github.com/jriecken/sat-js) to do collisions detection and collisions response. It's not all the big (i removed some unecessary stuff too) and works pretty well. I though it would be a problem for the garbage collecto, but i magened to use one single object to check the tilemap collisions against all the others objects.

Each collidible object have a `shape` property with a instance of `SAT.box`. Even the objects that are drawn as circles.

The collision is checked only against the tilemap that the object is. `Player` checks collisions against the tilemap that it is at the moment and it's enemies (and enemy bullets). Each enemy bullet and player bullet check collision agains the tilemap. Bullets and player collisions against the tilemap are checked first board phase, then if the tile is solid, narrow phase.

### Pathfinder ###

I'm using [PathFinding.js](https://github.com/qiao/PathFinding.js), i removed what i don't need and made some byte saving optimizations. This could be a problem for the garbage collector, so i made a system so the pathfinder map grid is changed in real time as the player progress. It's a single grid with 720 tiles that is updated when necessary. This was a bit of a challenge and i'm really happy it works great!

### Maps and level generation ###

The maps are pre made using the [tiled editor](www.mapeditor.org) and placed in the right place as the player progress.

### Didn't have time to add ###

- The engine code should be separated for the game code, when the dead line was close, i messed up eveything.
- Enemies move and have AI
- Dificulty progressing
- Pocedurally generated maps
- Scale system to fit the screen
- Different enemy types

## Tools ##

- [Babel (ES6)](http://babeljs.io)
- [Tiled Editor](http://www.mapeditor.org)
- [Gulp](http://gulpjs.com)

## Screenshots ##

![Imgur](http://i.imgur.com/nRcqFjp.png) 

