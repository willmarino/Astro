!function(t){var i={};function e(n){if(i[n])return i[n].exports;var s=i[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,e),s.l=!0,s.exports}e.m=t,e.c=i,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var s in t)e.d(n,s,function(i){return t[i]}.bind(null,s));return n},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="/dist/",e(e.s=1)}([function(t,i,e){},function(t,i,e){"use strict";e.r(i);e(0);function n(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var s=function(){function t(i,e,n,s){!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.xStart=i,this.yStart=e,this.width=n,this.height=s}var i,e,s;return i=t,(e=[{key:"draw",value:function(t){t.fillStyle="black",t.fillRect(this.xStart,this.yStart,this.width,this.height)}},{key:"move",value:function(t,i){this.xStart+=t,this.yStart+=i}}])&&n(i.prototype,e),s&&n(i,s),t}();function o(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function h(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var r=function(){function t(i,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;o(this,t),this.dimensions={height:i.height,width:i.width},this.context=e,this.height=300,this.platforms=[],this.generatePlatforms(),this.human=n}var i,e,n;return i=t,(e=[{key:"generatePlatforms",value:function(){for(this.platforms.push(new s(-1360,550,600,15));this.platforms[this.platforms.length-1].xStart+this.platforms[this.platforms.length-1].width<2e3;){var t=this.platforms[this.platforms.length-1],i=this.generatePlatformYStart();i-t.yStart>50&&(i=t.yStart+50),this.platforms.push(new s(t.xStart+t.width+this.generatePlatformGap(),i,this.generatePlatformWidth(),15))}}},{key:"generatePlatformYStart",value:function(){if(0===this.platforms.length)return 550;var t,i=this.platforms[this.platforms.length-1].yStart,e=Math.round(150*Math.random());return e<30&&(e=50),(t=Math.random()<.5?i+e:i-e)<350?t=350:t>625&&(t=625),t}},{key:"generatePlatformWidth",value:function(){var t=Math.round(200*Math.random());return Math.random()<.5?400+t:400-t}},{key:"generatePlatformGap",value:function(){return Math.round(100*Math.random())+100}},{key:"animate",value:function(t){this.draw(t),this.action()}},{key:"action",value:function(){this.move()}},{key:"move",value:function(){var t=this,i=this;if(this.human.xPos>=800&&this.human.xVel>0?this.platforms.forEach((function(t){t.move(-1*i.human.xVel,0)})):this.human.xPos<=300&&this.human.xVel<0&&this.platforms.forEach((function(i){i.move(-1*t.human.xVel,0)})),this.platforms[0].xStart<-1450){this.platforms.shift();var e=this.platforms[this.platforms.length-1];this.platforms.push(new s(e.xStart+e.width+this.generatePlatformGap(),this.generatePlatformYStart(),this.generatePlatformWidth(),15))}else if(this.platforms[this.platforms.length-1].xStart>1300){this.platforms.pop();var n=this.generatePlatformWidth(),o=this.platforms[0];this.platforms.unshift(new s(o.xStart-this.generatePlatformGap()-n,this.generatePlatformYStart(),n,15))}}},{key:"draw",value:function(t){this.platforms.forEach((function(i){i.draw(t)}))}}])&&h(i.prototype,e),n&&h(i,n),t}();function a(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function l(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var u=function(){function t(i,e,n){var s=arguments.length>3&&void 0!==arguments[3]&&arguments[3];a(this,t),this.homing=s,this.owner=i.type,this.context=i.context,this.didHit=!1,this.playerXVel=i.xVel,this.playerXPos=i.xPos,this.playerYPos=i.yPos,this.xPos=i.xPos,this.yPos=i.yPos,this.xVel=e,this.yVel=n,"human"===i.type?(this.width=5,this.height=5):s?(this.width=20,this.height=20):(this.width=5,this.height=5),this.id=i.projectileCount}var i,e,n;return i=t,(e=[{key:"animate",value:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;!0===this.homing?(this.homingMove(i,e),this.homingDraw(t)):(this.move(),this.draw(t))}},{key:"move",value:function(){this.playerXPos>=800&&this.playerXVel>=0?(this.xPos+=this.xVel,"computer"===this.owner&&(this.xPos-=this.playerXVel/2),this.yPos+=this.yVel):this.playerXPos<=300&&this.playerXVel<=0?(this.xPos+=this.xVel,"computer"===this.owner&&(this.xPos-=this.playerXVel/2),this.yPos+=this.yVel):(this.xPos+=this.xVel,this.yPos+=this.yVel)}},{key:"homingMove",value:function(t,i){this.xPos+=t,this.yPos+=i,console.log(t)}},{key:"draw",value:function(t){this.didHit||("human"===this.owner?(t.fillStyle="black",t.fillRect(this.xPos,this.yPos,this.width,this.height)):(t.fillStyle="white",t.fillRect(this.xPos,this.yPos,this.width,this.height)))}},{key:"homingDraw",value:function(t){this.didHit||(t.fillStyle="green",t.fillRect(this.xPos,this.yPos,this.width,this.height))}}])&&l(i.prototype,e),n&&l(i,n),t}();function c(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function f(t,i,e){return(f=c()?Reflect.construct:function(t,i,e){var n=[null];n.push.apply(n,i);var s=new(Function.bind.apply(t,n));return e&&y(s,e.prototype),s}).apply(null,arguments)}function y(t,i){return(y=Object.setPrototypeOf||function(t,i){return t.__proto__=i,t})(t,i)}function d(t){return function(t){if(Array.isArray(t)){for(var i=0,e=new Array(t.length);i<t.length;i++)e[i]=t[i];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function v(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}function m(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var p=function(){function t(i,e,n){!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.type="human",this.CONSTANTS={GRAVITY:.5,NORMALFORCE:-.5},this.alive=!0,this.projectiles={},this.environment=i,this.context=e,this.computerProjectiles=n,this.jumping=!1,this.projectileCount=0,this.additionalScore=0,this.curJumps=0,this.dashes=0,this.xPos=350,this.yPos=100,this.yVel=0,this.xVel=0,this.width=15,this.height=15,this.onFloor=!1,this.curPlat=null,this.lastPlat=this.environment.platforms[0],this.movingLeft=!1,this.movingRight=!1,this.goingDown=!1,this.distanceCovered=0,this.bindLeft(),this.bindRight(),this.bindUndoRight(),this.bindUndoLeft(),this.bindDown(),this.bindUndoDown(),this.bindDash(),this.bindJump(),this.setClick=this.setClick.bind(this),this.setClick(this)}var i,e,n;return i=t,(e=[{key:"filterProjectiles",value:function(){var t={},i=this;Object.keys(this.projectiles).forEach((function(e){if(i.projectiles[e].yPos<710&&i.projectiles[e].yPos>-10){var n=v({},e,i.projectiles[e]);t=Object.assign(n,t)}})),this.projectiles=t}},{key:"animate",value:function(t){this.move(),this.draw(t),Object.values(this.projectiles).length>0&&Object.values(this.projectiles).forEach((function(i){i.animate(t)})),this.filterProjectiles(),this.collidedWithProjectiles()}},{key:"draw",value:function(t){t.fillStyle="gray",t.fillRect(this.xPos,this.yPos,this.width,this.height)}},{key:"move",value:function(){if(!this.alive)return this.applyGravity(),void(this.yPos+=this.yVel);if(this.getCurrentPlatform(),this.curPlat?this.yVel>0&&this.yPos<(this.curPlat.yStart-20||this.lastPlat.yStart)&&(this.jumping=!1):this.curPlat||(this.onFloor=!1),this.getCurrentPlatform(),this.onFloor&&!this.jumping)this.dashes=0,this.curJumps=0,this.yPos=this.curPlat.yStart-this.height,this.yVel=0,this.isPlayerOnSide();else if(this.onFloor)this.onFloor&&this.jumping&&(this.yPos+=this.yVel,this.isPlayerOnSide());else{if(this.curPlat&&this.yPos>=this.curPlat.yStart-this.height&&this.yVel>=0)return this.onFloor=!0,void this.isPlayerOnSide();this.yVel+=this.CONSTANTS.GRAVITY,this.yPos+=this.yVel,this.isPlayerOnSide()}this.movingLeft||this.movingRight||(this.xVel>0?this.xVel-=.3:this.xVel<0&&(this.xVel+=.3)),this.distanceCovered+=this.xVel}},{key:"isPlayerOnSide",value:function(){this.xPos>=800&&this.xVel>=0||this.xPos<=300&&this.xVel<=0||(this.xPos+=this.xVel)}},{key:"applyGravity",value:function(){this.yVel+=this.CONSTANTS.GRAVITY}},{key:"isInAir",value:function(){return!this.curPlat||this.yPos<this.curPlat.yStart-this.height}},{key:"isOnFloor",value:function(){return!!this.curPlat&&this.yPos>this.curPlat.yStart-this.curPlat.height&&this.yPos<this.curPlat.yStart+5}},{key:"collidedWithFloor",value:function(){this.curPlat&&this.yPos>=this.curPlat.yStart-10&&(this.onFloor=!0)}},{key:"getCurrentPlatform",value:function(){for(var t=0;t<this.environment.platforms.length;t++){var i=this.environment.platforms[t];if(this.xPos>i.xStart&&this.xPos<i.xStart+i.width&&this.yPos<i.yStart+i.height){this.curPlat=i,this.lastPlat=this.curPlat;break}this.curPlat=null}}},{key:"bindLeft",value:function(){var t=this;window.addEventListener("keypress",(function(i){"a"===i.key&&(t.moveLeft(),t.movingLeft=!0,t.movingRight=!1)}))}},{key:"bindUndoLeft",value:function(){var t=this;window.addEventListener("keyup",(function(i){"a"===i.key&&(t.movingLeft=!1)}))}},{key:"bindRight",value:function(){var t=this;window.addEventListener("keypress",(function(i){"d"===i.key&&(t.moveRight(),t.movingRight=!0,t.movingLeft=!1)}))}},{key:"bindUndoRight",value:function(){var t=this;window.addEventListener("keyup",(function(i){"d"===i.key&&(t.movingRight=!1)}))}},{key:"bindJump",value:function(){var t=this;window.addEventListener("keypress",(function(i){"w"===i.key&&t.jump()}))}},{key:"bindDown",value:function(){var t=this;window.addEventListener("keypress",(function(i){"s"===i.key&&(t.goingDown=!0,t.down())}))}},{key:"bindUndoDown",value:function(){var t=this;window.addEventListener("keyup",(function(i){"s"===i.key&&(t.goingDown=!1)}))}},{key:"bindDash",value:function(){var t=this;window.addEventListener("keypress",(function(i){if("Spacebar"===i.key||" "===i.key){if(t.dashes>0)return;if(t.movingLeft){t.xVel-=7.5,t.dashes+=1;for(var e=0;e<5;e++)setTimeout((function(){t.xVel+=1.5}),100*e)}else if(t.movingRight){t.xVel+=7.5,t.dashes+=1;for(var n=0;n<5;n++)setTimeout((function(){t.xVel-=1.5}),100*n)}}}))}},{key:"setClick",value:function(t){var i=this;this.context.canvas.addEventListener("click",(function(e){var n=i.context.canvas.getBoundingClientRect(),s={};s.x=e.clientX-n.left,s.y=e.clientY-n.top;var o=f(u,[t].concat(d(t.configureProjectile(s)))),h=o.id;t.projectiles=Object.assign(v({},h,o),t.projectiles),i.projectileCount+=1}))}},{key:"configureProjectile",value:function(t){var i=t.x-this.xPos,e=t.y-this.yPos,n=Math.pow(i,2)+Math.pow(e,2),s=20/Math.sqrt(n);return[i*s,e*s]}},{key:"jump",value:function(){this.curJumps<2&&(this.onFloor=!1,this.jumping=!0,this.yVel=-12,this.curJumps+=1)}},{key:"moveRight",value:function(){this.xVel=5}},{key:"moveLeft",value:function(){this.xVel=-5}},{key:"down",value:function(){!0===this.goingDown&&(this.yVel+=5)}},{key:"collide",value:function(t,i){var e=t.xPos+t.width/2,n=t.yPos+t.height/2,s=Math.sqrt(Math.pow(t.width/2,2)+Math.pow(t.height/2,2)),o=i.xPos+i.width/2,h=i.yPos+i.height/2;return s+Math.sqrt(Math.pow(i.width/2,2)+Math.pow(i.height/2,2))+10>Math.sqrt(Math.pow(e-o,2)+Math.pow(n-h,2))}},{key:"collidedWithProjectiles",value:function(){var t=this;Object.values(this.computerProjectiles).forEach((function(i){t.collide(t,i)&&(i.didHit=!0,t.alive=!1)}))}}])&&m(i.prototype,e),n&&m(i,n),t}();function P(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function g(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var x=function(){function t(i){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;P(this,t),this.dimensions=i,this.round=e,this.colors=["#5eaec4","green","orange","blue"]}var i,e,n;return i=t,(e=[{key:"setRound",value:function(t){this.round=t}},{key:"draw",value:function(t){t.fillStyle=this.colors[this.round],t.fillRect(0,0,this.dimensions.width,this.dimensions.height)}},{key:"animate",value:function(t){this.draw(t)}}])&&g(i.prototype,e),n&&g(i,n),t}();function w(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function k(t,i,e){return(k=w()?Reflect.construct:function(t,i,e){var n=[null];n.push.apply(n,i);var s=new(Function.bind.apply(t,n));return e&&b(s,e.prototype),s}).apply(null,arguments)}function b(t,i){return(b=Object.setPrototypeOf||function(t,i){return t.__proto__=i,t})(t,i)}function S(t){return function(t){if(Array.isArray(t)){for(var i=0,e=new Array(t.length);i<t.length;i++)e[i]=t[i];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function j(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function V(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var O=function(){function t(i,e,n){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:850;j(this,t),this.type="computer",this.CONSTANTS={GRAVITY:.5,JETPACK:.5},this.alive=!0,this.environment=i,this.context=e,this.projectiles={},this.humanProjectiles=n.projectiles,this.additionalScore=0,this.projectileCount=1e4,this.xPos=s,this.yPos=100,this.yVel=0,this.xVel=-5,this.width=30,this.height=30,this.human=n,this.canShoot=!1,this.initiateShot()}var i,e,n;return i=t,(e=[{key:"initiateShot",value:function(){var t=this;window.setInterval((function(){t.shoot()}),2e3)}},{key:"switchDirection",value:function(){this.xPos<=20?this.xVel=5:this.xPos>=1080&&(this.xVel=-5)}},{key:"fetchHumanPosition",value:function(){this.playerPosX=this.human.xPos,this.playerPosY=this.human.yPos}},{key:"shoot",value:function(){var t,i={};i.x=this.playerPosX,i.y=this.playerPosY;var e=Math.round(10*Math.random());t=k(u,e>=0?[this].concat(S(this.configureProjectile(i,!0)),[!0]):[this].concat(S(this.configureProjectile(i)))),this.projectiles[t.id]=t,this.projectileCount+=1}},{key:"configureProjectile",value:function(t){var i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=Math.random(),n=t.x-this.xPos,s=t.y-this.yPos;if(!1===i){var o=Math.round(200*Math.random());e<.25?n+=o:e>.25&&e<.5&&(n-=o)}var h=Math.pow(n,2),r=Math.pow(s,2),a=h+r,l=Math.sqrt(a),u=5/l,c=n*u,f=s*u;return[c,f]}},{key:"jump",value:function(){this.yVel-=5}},{key:"moveRight",value:function(){this.xVel+=2,this.xVel>5&&(this.xVel=5)}},{key:"moveLeft",value:function(){this.xVel-=2,this.xVel<-5&&(this.xVel=-5)}},{key:"draw",value:function(t){t.fillStyle="red",t.fillRect(this.xPos,this.yPos,this.width,this.height)}},{key:"action",value:function(){this.move(),this.fetchHumanPosition(),this.alive&&(this.switchDirection(),this.collidedWithProjectiles())}},{key:"move",value:function(){this.alive?(this.yPos+=this.yVel,this.xPos+=this.xVel,!0!==this.collidedWithFloor()&&(this.yVel+=this.CONSTANTS.GRAVITY,this.yVel-=this.CONSTANTS.JETPACK),this.xVel>0&&this.collidedWithFloor()?this.xVel-=.1:this.xVel<0&&this.collidedWithFloor()&&(this.xVel+=.1)):(this.yVel+=this.CONSTANTS.GRAVITY,this.yPos+=this.yVel),this.human.xPos>=800?this.xVel:this.human.xPos<=300&&this.human.xPos}},{key:"animate",value:function(t,i){var e,n=this;this.action(),this.draw(t),Object.values(this.projectiles).length>0&&Object.values(this.projectiles).forEach((function(s){!0===s.homing?(e={x:i.xPos,y:i.yPos},s.animate.apply(s,[t].concat(S(n.configureProjectile(e,!0))))):s.animate(t)})),Object.values(this.projectiles).forEach((function(t){(function(t){return t.xPos<1110&&t.xPos>-10&&t.yPos>-10&&t.yPos<710})||delete n.projectiles[t.id]}))}},{key:"collidedWithFloor",value:function(){if(this.yPos>=this.environment.height-13)return this.yVel=0,!0}},{key:"collide",value:function(t,i){return Math.sqrt(Math.pow(t.width/2,2)+Math.pow(t.height/2,2))/2+Math.sqrt(Math.pow(i.width/2,2)+Math.pow(i.height/2,2))/2+10>Math.sqrt(Math.pow(t.xPos-i.xPos,2)+Math.pow(t.yPos-i.yPos,2))}},{key:"collidedWithProjectiles",value:function(){var t=this;Object.values(this.human.projectiles).forEach((function(i){if(t.collide(t,i))return i.didHit=!0,t.alive=!1,t.additionalScore+=1,!0}))}}])&&V(i.prototype,e),n&&V(i,n),t}();function M(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function R(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var C=function(){function t(i){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;M(this,t),this.xPos=1050,this.yPos=100,this.score=e,this.context=i}var i,e,n;return i=t,(e=[{key:"animate",value:function(){this.draw()}},{key:"draw",value:function(){this.context.font="20px Arial",this.context.fillText(this.score,this.xPos,this.yPos)}}])&&R(i.prototype,e),n&&R(i,n),t}();function T(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var E=function(){function t(i,e,n,s){!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.environment=i,this.context=e,this.human=n;var o=this.getStartPlatforms();Math.random()>.5?(this.xPos=o.left.xStart+o.left.width/2,this.goingRight=!0,this.goingLeft=!1,this.xVel=4):(this.xPos=o.right.xStart+o.right.width/2,this.goingLeft=!0,this.goingRight=!1,this.xVel=-4),this.getCurrentPlatform(),this.yPos=this.curPlat.yStart,this.yVel=0,this.CONSTANTS={GRAVITY:.5},this.height=30,this.width=30,this.projectiles={},this.alive=!0,this.additionalScore=0,this.curPlat=null,this.nextPlat=null,this.jumping=!1}var i,e,n;return i=t,(e=[{key:"getStartPlatforms",value:function(){var t=Math.round(this.environment.platforms.length/2);return{left:this.environment.platforms[t-1],right:this.environment.platforms[t+1]}}},{key:"animate",value:function(t){this.action(),this.draw(t),Object.values(this.projectiles).forEach((function(i){i.animate(t)})),this.filterProjectiles()}},{key:"action",value:function(){this.move(),this.alive&&this.collidedWithProjectiles()}},{key:"draw",value:function(t){t.fillStyle="purple",t.fillRect(this.xPos,this.yPos,this.width,this.height)}},{key:"move",value:function(){if(this.getCurrentPlatform(),!this.alive)return this.yVel+=this.CONSTANTS.GRAVITY,void(this.yPos+=this.yVel);(this.human.xPos>=800&&this.human.xVel>0||this.human.xPos<=300&&this.human.xVel<0)&&(this.xPos-=this.human.xVel),this.switchDirections(),this.curPlat&&!this.jumping&&(this.yPos=this.curPlat.yStart-this.height,this.xPos+=this.xVel),this.isOnEdge()&&(this.beginJump(),this.jumping=!0,this.xPos+=this.xVel,this.yPos+=this.yVel,this.yVel+=this.CONSTANTS.GRAVITY),this.jumping&&(this.curPlat&&this.yPos>=this.curPlat.yStart-this.height&&this.yVel>0?(this.jumping=!1,this.yPos=this.curPlat.yStart-this.height,this.yVel=0,this.xPos+=this.xVel):(this.xPos+=this.xVel,this.yPos+=this.yVel,this.yVel+=this.CONSTANTS.GRAVITY))}},{key:"switchDirections",value:function(){this.goingRight&&this.human.xPos<this.xPos-500?(this.goingLeft=!0,this.goingRight=!1,this.xVel=-4):this.goingLeft&&this.human.xPos>this.xPos+500&&(this.goingRight=!0,this.goingLeft=!1,this.xVel=4)}},{key:"isOnEdge",value:function(){if(this.goingLeft){if(this.curPlat&&this.yPos===this.curPlat.yStart-this.height&&this.xPos<=this.curPlat.xStart+20)return!0}else if(this.goingRight&&this.curPlat&&this.yPos===this.curPlat.yStart-this.height&&this.xPos>=this.curPlat.xStart+this.curPlat.width-this.width-10)return!0;return!1}},{key:"beginJumpOld",value:function(){var t=this.curPlat,i=(this.environment.platforms.indexOf(t),this.nextPlat),e=1.3*Math.abs(t.yStart-i.yStart);e<25&&(e=25),t.yStart<i.yStart?t.yStart:i.yStart;var n=this.goingRight?i.xStart-this.xPos:this.xPos-(i.xStart+i.width),s=(this.xVel,-1*(0+n/2/this.xVel*.5));this.yVel=s}},{key:"beginJump",value:function(){var t,i=this.xPos;this.curPlat.yStart,this.nextPlat.yStart,this.goingRight?t=this.nextPlat.xStart+10:this.goingLeft&&(t=this.nextPlat.xStart+this.nextPlat.width-this.width-10);var e=Math.abs(t-i),n=this.calculateFall(e/2),s=n.dist,o=n.steps,h=n.yVel;if(this.curPlat.yStart<=this.nextPlat.yStart)this.yVel=-1*h;else if(this.curPlat.yStart>this.nextPlat.yStart){var r=-1*(this.nextPlat.yStart-this.curPlat.yStart-s);this.yVel=-1*this.calculateRise(o,r)}}},{key:"calculateRise",value:function(t,i){for(var e=Math.round(t),n=0,s=1;s<=e;s++)n+=s;return(i+.5*n)/e}},{key:"calculateFall",value:function(t){for(var i=Math.abs(Math.round(t/this.xVel)),e=0,n=0,s=0;s<i;s++)n+=e,e+=this.CONSTANTS.GRAVITY;return{dist:n,steps:i,yVel:e}}},{key:"getCurrentPlatform",value:function(){for(var t=0;t<this.environment.platforms.length;t++){var i=this.environment.platforms[t];if(this.xPos>i.xStart&&this.xPos<i.xStart+i.width)return this.curPlat=i,void(this.goingLeft?this.nextPlat=this.environment.platforms[t-1]:this.goingRight&&(this.nextPlat=this.environment.platforms[t+1]))}this.curPlat=null,this.nextPlat=null}},{key:"filterProjectiles",value:function(){var t=this;Object.values(this.projectiles).forEach((function(i){(function(t){return t.xPos<1110&&t.xPos>-10&&t.yPos>-10&&t.yPos<710})||delete t.projectiles[i.id]}))}},{key:"collidedWithProjectiles",value:function(){var t=this;Object.values(this.human.projectiles).forEach((function(i){if(t.collide(t,i))return i.didHit=!0,t.alive=!1,t.additionalScore+=1,!0}))}},{key:"collide",value:function(t,i){return Math.sqrt(Math.pow(t.width/2,2)+Math.pow(t.height/2,2))/2+Math.sqrt(Math.pow(i.width/2,2)+Math.pow(i.height/2,2))/2+10>Math.sqrt(Math.pow(t.xPos-i.xPos,2)+Math.pow(t.yPos-i.yPos,2))}}])&&T(i.prototype,e),n&&T(i,n),t}();function A(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var L=new(function(){function t(i){var e=this;!function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(this,t),this.context=i.getContext("2d"),this.dimensions={height:i.height,width:i.width},this.running=!1,this.computers=[],this.landComputers=[],this.computersBeingAdded=0,this.numComputers=this.computers.length+this.computersBeingAdded,this.humanProjectiles=[],this.computerProjectiles=[],this.allProjectiles={},this.startMenu=document.getElementById("start-menu"),this.playButton=document.getElementById("play-button"),this.playButton.addEventListener("mousedown",(function(){document.getElementById("start-menu").remove(),e.click()}))}var i,e,n;return i=t,(e=[{key:"filterComputers",value:function(){this.computers=this.computers.filter((function(t){return t.yPos<1e4}))}},{key:"switchRounds",value:function(){this.score.score>5&&(this.background.round=1)}},{key:"setNumComputers",value:function(){this.numComputers=this.computers.length+this.computersBeingAdded}},{key:"spawnComputer",value:function(){var t,i=this;this.computersBeingAdded+=1;var e=Math.random();t=e<=.5?1150:-50,window.setTimeout((function(){i.computers.push(new O(i.environment,i.context,i.human,t)),i.computersBeingAdded-=1}),5e3)}},{key:"setPlayerTracking",value:function(){var t=this;this.computers.forEach((function(i){Object.values(i.projectiles).forEach((function(i){i.playerXVel=t.human.xVel,i.playerXPos=t.human.xPos,i.playerYPos=t.human.yPos}))}))}},{key:"sendEnemyProjectiles",value:function(){var t=this;this.computers.forEach((function(i){Object.values(i.projectiles).forEach((function(i){t.human.computerProjectiles[i.id]=i}))}))}},{key:"addEnemyScore",value:function(){var t=this;this.computers.forEach((function(i){t.score.score+=i.additionalScore,i.additionalScore=0}))}},{key:"addProjectiles",value:function(){this.allProjectiles=this.human.projectiles;for(var t=0;t<this.computers.length;t++){var i=this.computers[t];this.allProjectiles=Object.assign(this.allProjectiles,i.projectiles)}}},{key:"restart",value:function(){this.background=new x(this.dimensions),this.environment=new r(this.dimensions,this.context),this.human=new p(this.environment,this.context,this.computerProjectiles),this.score=new C(this.context),this.environment.human=this.human,this.computers=[];for(var t,i=1;i<1;)t=i%2==0?1150+100*i:-50-100*i,this.computers.push(new O(this.environment,this.context,this.human,t)),i+=1;this.landComp=new E(this.environment,this.context,this.human),this.running=!1,this.run()}},{key:"run",value:function(){}},{key:"click",value:function(){this.running||this.play()}},{key:"play",value:function(){this.running=!0,this.step()}},{key:"step",value:function(){this.gameOver()&&this.rerun(),this.animate(),this.addEnemyScore(),this.filterComputers(),this.running&&window.requestAnimationFrame(this.step.bind(this))}},{key:"animate",value:function(){var t=this;this.sendEnemyProjectiles(),this.switchRounds(),this.background.animate(this.context),this.environment.animate(this.context),this.human.animate(this.context),this.score.animate(),this.setPlayerTracking(),this.computers.forEach((function(i){i.animate(t.context,t.human)})),this.landComp.animate(this.context),this.setNumComputers(),this.numComputers<1&&this.spawnComputer()}},{key:"gameOver",value:function(){return this.human.yPos>710||!this.human.alive&&this.human.yPos>710}},{key:"rerun",value:function(){document.getElementById("game-and-title").appendChild(this.startMenu),this.restart()}}])&&A(i.prototype,e),n&&A(i,n),t}())(document.getElementById("main-canvas"));document.addEventListener("DOMContentLoaded",(function(){L.restart()}))}]);
//# sourceMappingURL=main.js.map