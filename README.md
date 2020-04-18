# Astro

Astro is a 2d sidescrolling action game created with javaScript and HTML Canvas. All transitions were done with vanilla DOM manipulation.

With Astro I focused on four main elements: human/player mechanics, computer/enemy player mechanics, the environment with which the players interact, and the progression of the game.

### Human/Player mechanics
* Movement
  Player movement is fairly simple. They can move from side to side, jump and double jump, move downwards while in the air,   and dash from side to side.
* Actions
  A Player can shoot projectiles with a mouse click, and the direction of the projectiles will be set by where on the canvas the user clicked. Right now, the rate at which the player can shoot is not capped, but that may change. The player can also consume powerups, of which there are currently two. The first is a shield, which when activated, makes the player immune to enemy projectiles for 8 seconds. The second is a shooting powerup, which makes the player send out three projectiles per click instead of one. They will all go in the same direction, but are very slightly staggered in time.
  
### Computer/Enemy Mechancs
* Basic air enemy
This enemy will move back and forth across the screen, only switching directions once they reach the end of the user's view. They can shoot two types of projectiles. The first is a regular projectile resembling what the user will shoot on click, with the one difference being the speed at which it travels. The second is a homing projectile which changes its velocity each tick/animation frame to re-target where the user has moved to in that last tick/animation frame. Has 2 health points.

* Basic land enemy
This enemy will spawn out of the user's view, and travel towards the user while shooting projectiles every few seconds. Since the environment is made up of platforms with gaps between them, the land enemy has a jump method programmed into its move method, which will be called whenever they reach the edge of a platform. (For the specifics of this jump method, look down near the bottom, its pretty cool!). This enemy will turn around whenever they are a certain distance away from the player. So, for example, if they are moving to the left and are already X pixels to the left of the user, they will turn around and begin moving to the right. Of course, this does not occur if the enemy is mid-jump. Like the previous, this enemy has two health.

* Chaotic air enemy
This enemy follows the same general principle as the land enemy in that the direction that it is moving is determined by  its position relative to the player. However, it travels through the air, and does not move at a constant speed. Instead, at a constant interval, it will stop moving entirely, and then move very quickly to a semi-random position around the player. Instead of shooting one projectile in the direction of the player, it instead shoots eight projectiles in each cardinal and primary intercardinal direction. It shoots each time it stops moving. This enemy only has one health.

### Environment
  The environment in which the players and enemies operate is fundamentally a series of platforms with semi-randomly generated attributes (width, horizontal gap between two platforms, vertical gap between two platforms). They are stored as key value pairs in an object in order to achieve quick lookup time, and had some of the attributes of a linked list (next, prev, root, head) to make some of my other functions easier, such as the land enemy jump function.
 I faced several challenges related to the environment while making this game. The first and most basic is that of object collision. In order to build a working surface for the user/enemies to stand on, I had to create a function, which runs each animation frame, which checks to see if the user, or any land enemy, is colliding with on the platforms. If they are, I set their vertical velocity to zero.
 The trickier challenge was that of creating the illusion of stage/environment movement. First, since I wanted the environment to be larger than the player's current view at all times, I of course generated an environment which was wider than the set pixel width of the screen/ user view. Second, In order to actually have this environment move, I wrote a function which alters the movemnt of all entities on the screen if the user is far enough to the left or the right. When the user hits this point, their horizontal velocity will be set to 0, and the inverse of whatever that velocity would be, were it not set to zero, is applied to all enemies, platforms, and even projectiles. This creates the illusion that the player is moving around a large environment.
 
 
### Progression
  As of now there are no 'level changes' or similar mechanics. Instead, users get points for hitting enemies with projectiles, and at certain point thresholds, the 'round' will change. All this really means is that the amounts of enemies that spawn will increase, and platforms will have the gaps between them grow, and their widths shrink. As the round changes, the background of the canvas changes with it. So round 1 corresponds to a white background, round 2 to a blue background, and round 3 to an orange background.


