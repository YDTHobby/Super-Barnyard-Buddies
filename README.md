# Super YDT Buddies

This project uses the Quintus engine and features multiple levels loaded from TMX files.

## New Sprite: scarecrow

Levels 1-7 now end with a `scarecrow` character instead of the princess. The scarecrow uses
`scarecrow.png` if available, but when the image is missing the game falls back to drawing a
simple colored block. Touching the scarecrow triggers a short look-around animation for Nugget
before the level completion screen appears and the game returns to the world map.
