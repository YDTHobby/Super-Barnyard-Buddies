# Super YDT Buddies

This project uses the Quintus engine and features multiple levels loaded from TMX files.

## New Sprite: scarecrow

Levels 1-7 now end with a `scarecrow` character instead of the princess. The scarecrow uses
`scarecrow.png` if available, but when the image is missing the game falls back to drawing a
simple colored block. Touching the scarecrow triggers a short look-around animation for Nugget
that now begins about **100 pixels** before the player reaches the sprite. Nugget turns left and right 50% slower than before
while standing still until the scene fades out, ensuring the animation plays smoothly before
the level completion screen appears and the game returns to the world map.

