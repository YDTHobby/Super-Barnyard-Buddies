# Game Architecture and Tiled Integration

## Overview
This game uses the Quintus game engine and integrates with Tiled Map Editor for level design. The game loads all game objects, including the player character (nugget), enemies, collectibles, and the princess, directly from the Tiled map file (level.tmx).

## Level Design with Tiled

### Object Placement
The game uses Tiled's object layers to place game entities. Each object in Tiled can be configured with custom properties that determine its behavior in the game. The main object layers are:

- **Spawn**: Contains the player's starting position
- **Princess**: Contains Princess Mabel's position
- **Coins**: Contains collectible yarnballs
- **TangledYarn**: Contains enemy tangled yarn obstacles

### Class-Based Object Loading
The game uses a class-based system where each object in Tiled is associated with a specific JavaScript class. This is done through the `Class` property in Tiled:

1. In Tiled, select an object
2. Add a custom property called `Class`
3. Set the value to match one of the game's sprite classes (e.g., "nugget", "princess", "yarnball", "tangledyarn")

Example object properties in Tiled:
```xml
<object id="4" name="nugget" type="nugget" x="246.5" y="348.5">
  <properties>
    <property name="Class" value="nugget"/>
  </properties>
</object>
```

## Game Objects

### Player (Nugget)
- Class: `nugget`
- Spawns at the position specified in the "Spawn" object layer
- Camera follows the nugget throughout the level

### Princess Mabel
- Class: `princess`
- Placed in the "princess" object layer
- Acts as the level goal

### Scarecrow
- Class: `scarecrow`
- Replaces the princess in levels 1-7
- Shows a placeholder color block if `scarecrow.png` is missing

- Triggers Nugget's look-around win sequence about 100 pixels before contact
 - Nugget now keeps facing the direction set during this sequence so his head
   turns left and right 50% slower until the scene fades out


### Collectibles (Yarnballs)
- Class: `yarnball`
- Placed in the "coins" object layer
- Can be collected by the player

### Enemies (Tangled Yarn)
- Class: `tangledyarn`
- Placed in the "tangledyarn" object layer
- Acts as obstacles/hazards

## Level Loading Process

1. The game loads the TMX file using `Q.stageTMX('level.tmx', stage)`
2. The TMX loader processes each object layer
3. For each object, it:
   - Reads the object's position (x, y)
   - Reads the `Class` property
   - Creates a new instance of the corresponding class
   - Places it at the specified position
   - Applies any additional properties specified in Tiled

## Camera System

The game implements a viewport that follows the player (nugget) with the following constraints:
- Follows both X and Y coordinates
- Has minimum and maximum Y bounds (120 to 500)
- Automatically adjusts to keep the player in view

## Tips for Level Design

1. Always include a spawn point for the player in the "Spawn" layer
2. Place Princess Mabel at the end of the level
3. Distribute yarnballs throughout the level for collection
4. Use tangled yarn enemies strategically to create challenge
5. Make sure to set the `Class` property for all game objects
6. Use the collision layer for platform placement

## File Structure

```
├── index.html              # Main game HTML file
├── arcade.html.bac         # Backup of arcade HTML file
├── LICENSE                 # License file
├── README.md              # Project readme
├── AGENTS.md              # This documentation file
│
├── audio/                 # Audio assets directory
│
├── css/                   # CSS stylesheets
│
├── data/                  # Game data files
│   ├── level.tmx         # Main level file (Tiled map)
│   ├── levelOK.tmx       # Alternative level file
│   ├── sprites.json      # Sprite definitions
│   ├── cat.json          # Cat sprite data
│   ├── nugget_small.json # Nugget sprite data
│   ├── tangledyarn.json  # Tangled yarn sprite data
│   └── yarnball.json     # Yarnball sprite data
│
├── images/               # Image assets directory
│
├── js/                   # JavaScript game files
│   ├── arcade-detection.js  # Arcade mode detection
│   ├── cat.js              # Cat enemy implementation
│   ├── defaultenemy.js     # Default enemy behavior
│   ├── endgame.js          # End game logic
│   ├── game.js             # Main game initialization
│   ├── hub.js              # Heads-up display
│   ├── level1.js           # Level 1 implementation
│   ├── maintitle.js        # Main title screen
│   ├── nugget.js           # Player character
│   ├── princessmabel.js    # Princess Mabel character
│   ├── tangledyarn.js      # Tangled yarn enemy
│   ├── worldmap.js         # World map implementation
│   └── yarnball.js         # Yarnball collectible
│
└── lib/                  # Quintus engine libraries
    ├── quintus.js         # Core engine
    ├── quintus_2d.js      # 2D rendering
    ├── quintus_anim.js    # Animation system
    ├── quintus_audio.js   # Audio system
    ├── quintus_input.js   # Input handling
    ├── quintus_scenes.js  # Scene management
    ├── quintus_sprites.js # Sprite system
    ├── quintus_tmx.js     # TMX file loading
    ├── quintus_touch.js   # Touch input
    └── quintus_ui.js      # User interface
```

### Key Files Explained

- **index.html**: The main entry point of the game
- **data/level.tmx**: The Tiled map file containing level layout and object placement
- **js/level1.js**: Handles level loading and setup
- **js/nugget.js**: Player character implementation
- **js/princessmabel.js**: Princess Mabel character implementation
- **js/scarecrow.js**: Scarecrow placeholder character used for levels 1-7
- **js/tangledyarn.js**: Enemy implementation
- **js/yarnball.js**: Collectible implementation
- **lib/quintus_tmx.js**: Handles loading and processing of TMX files
- **lib/quintus_2d.js**: Provides 2D game engine functionality 

## Adding New Levels

The game recognizes multiple stages, each defined as `levelN.tmx` in the `data/` directory with a matching loader file `js/levelN.js`.

To introduce a new level:

1. Create a Tiled map named `levelN.tmx` and save it under `data/`.
2. Copy `js/level1.js` to `js/levelN.js` and update the `Q.stageTMX` call to reference `levelN.tmx`.
3. Include `<script src="js/levelN.js"></script>` in `index.html`.
4. Call `loadLevelN(Q);` inside `js/game.js` during setup.
5. Add `levelN.tmx` to the preload list within `Q.loadTMX` in `js/game.js`.

Following this convention keeps all levels consistent with the existing camera and HUD setup.

## Agent Instructions

The following tips help new agents quickly understand and run the game:

1. **Start Here**: Read this `AGENTS.md` file before exploring the codebase. It outlines the most important files and how Tiled integration works.
2. **Running the Game**: Serve the repository with a simple local web server (for example, `python3 -m http.server`) and open `index.html` in your browser to launch the game.
3. **Entry Point**: The engine is initialized in `js/game.js`, which also loads `level1` by calling `loadLevel1(Q);`.
4. **Levels**: Each level has a corresponding `js/levelN.js` file that loads a `data/levelN.tmx` map.
5. **Keep Documentation Updated**: Update this file whenever new stages or features are added so future agents can easily follow the project's structure.

