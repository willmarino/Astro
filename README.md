# Astro

Astro is a game, inspired by contra, in which a player moves a character across a 2-dimensional landscape defeating enemies. The game takes
place in a series of rounds. When a player progresses past one round, they move on to the next round, in which the enemies 
become more difficult to defeat, and the terrain becomes more difficult to navigate.

The game will have a 'start' screen as well as a pause/options modal.

### Day 1
My main goal for day one is to become comfortable with rendering simple objects with canvas. Additionally I will try to set 
up the necessary logic to get auto-generated platforms extending to the right and left of my character. Whichever direction 
the player chooses to go, there should be infinite platforms for them to move across. Lastly, I would like to find a library 
to use to generate player/enemy models by the end of the day. -platform.js, -environment.js

### Day 2
Day 2 should be spent trying to set up the player's character, and get my player moving semi-realistically 
(jump, double-jump, duck, right, left). At the end of day 2 I should have an environment to move around in, and a character 
with which to move around in it. Another goal for day 2 would be to get projectile logic functioning.
-player.js, human.js(player subclass), -projectile.js

### Day 3
On day 3, if I did not do so on day 2, I will set up projectile logic and select a model to use for projectiles. The 
main focus of this day will be on generating enemies. Enemy players should be able to traverse the environment on their own,
and should be able to throw projectiles towards the player.
-enemy.js(player subclass)

### Day 4
Set up the progression of the game, i.e. rounds, and level changes after winning each round. A round win should trigger a 
change in environment and a change in the color of the background. There should be an indication of what round is beginning 
at the start of each round, to help the player keep track. Additionally, round number should be displayed on the settings modal.
-round.js(actual game loop)

### Day 5
By now the central game logic and progression should be functional, work at this point will focus on adding additional 
player movement and better graphics, and cleaning up the environment.
