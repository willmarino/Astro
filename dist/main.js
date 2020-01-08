!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=1)}([function(t,e,n){},function(t,e,n){"use strict";n.r(e);n(0);function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var o=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.dimensions={height:e.height,width:e.width},this.height=300,this.platforms=[]}var e,n,o;return e=t,(n=[{key:"animate",value:function(t){this.draw(t)}},{key:"draw",value:function(t){t.fillStyle="black",t.fillRect(0,300,800,15)}}])&&i(e.prototype,n),o&&i(e,o),t}();function r(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var s=function(){function t(e,n,i,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.context=n,this.xPos=e.xPos,this.yPos=e.yPos,this.yVel=o,this.xVel=i}var e,n,i;return e=t,(n=[{key:"animate",value:function(t){this.move(),this.draw(t)}},{key:"move",value:function(){this.xPos+=this.xVel,this.yPos+=this.yVel}},{key:"draw",value:function(t){t.fillStyle="white",t.fillRect(this.xPos,this.yPos,5,5)}}])&&r(e.prototype,n),i&&r(e,i),t}();function a(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function u(t,e,n){return(u=a()?Reflect.construct:function(t,e,n){var i=[null];i.push.apply(i,e);var o=new(Function.bind.apply(t,i));return n&&c(o,n.prototype),o}).apply(null,arguments)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function l(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function h(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var f=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.context=n,this.environment=e,this.CONSTANTS={GRAVITY:.5},this.projectiles=[],this.xPos=100,this.yPos=100,this.yVel=0,this.xVel=0,this.width=10,this.height=10,this.bindMovement(),this.bindJump(),this.setClick=this.setClick.bind(this),this.setClick(this)}var e,n,i;return e=t,(n=[{key:"setClick",value:function(t){window.addEventListener("click",(function(e){var n={};n.x=e.clientX,n.y=e.clientY-186,t.projectiles.push(u(s,[{xPos:t.xPos,yPos:t.yPos},t.context].concat(l(t.configureProjectile(n)))))}))}},{key:"configureProjectile",value:function(t){var e=t.x-this.xPos,n=t.y-this.yPos,i=Math.pow(e,2)+Math.pow(n,2),o=20/Math.sqrt(i);return[e*o,n*o]}},{key:"jump",value:function(){this.yVel-=5}},{key:"moveRight",value:function(){this.xVel+=2,this.xVel>5&&(this.xVel=5)}},{key:"moveLeft",value:function(){this.xVel-=2,this.xVel<-5&&(this.xVel=-5)}},{key:"bindMovement",value:function(){var t=this;window.addEventListener("keypress",(function(e){"d"===e.key?t.moveRight():"a"===e.key&&t.moveLeft()}))}},{key:"bindJump",value:function(){var t=this;window.addEventListener("keypress",(function(e){"w"===e.key&&t.jump()}))}},{key:"draw",value:function(t){t.fillStyle="gray",t.fillRect(this.xPos,this.yPos,this.width,this.height)}},{key:"move",value:function(){this.yPos+=this.yVel,this.xPos+=this.xVel,!0!==this.collided()&&(this.yVel+=this.CONSTANTS.GRAVITY),this.xVel>0?this.xVel-=.1:this.xVel<0&&(this.xVel+=.1)}},{key:"animate",value:function(t){this.move(),this.draw(t),this.projectiles.length>0&&this.projectiles.forEach((function(e){e.animate(t)})),this.projectiles=this.projectiles.filter((function(t){return t.xPos<810&&t.xPos>-10&&t.yPos>-10&&t.yPos<410}))}},{key:"collided",value:function(){if(this.yPos>=this.environment.height-13)return this.yVel=0,!0}}])&&h(e.prototype,n),i&&h(e,i),t}();function y(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function v(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var d=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;y(this,t),this.dimensions=e,this.round=n}var e,n,i;return e=t,(n=[{key:"draw",value:function(t){t.fillStyle="#5eaec4",t.fillRect(0,0,this.dimensions.width,this.dimensions.height)}},{key:"animate",value:function(t){this.draw(t)}}])&&v(e.prototype,n),i&&v(e,i),t}();function p(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var m=new(function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.context=e.getContext("2d"),this.dimensions={height:e.height,width:e.width},this.running=!1}var e,n,i;return e=t,(n=[{key:"run",value:function(){var t=this;this.context.canvas.addEventListener("mousedown",(function(){console.log("akjsda"),t.click()}))}},{key:"click",value:function(){this.running||this.play()}},{key:"animate",value:function(){this.background.animate(this.context),this.environment.animate(this.context),this.player.animate(this.context),this.running&&window.requestAnimationFrame(this.animate.bind(this))}},{key:"play",value:function(){this.running=!0,this.animate()}},{key:"restart",value:function(){this.background=new d(this.dimensions),this.environment=new o(this.dimensions,this.context),this.player=new f(this.environment,this.context),this.running=!1,this.animate(),this.run()}}])&&p(e.prototype,n),i&&p(e,i),t}())(document.getElementById("main-canvas"));document.addEventListener("DOMContentLoaded",(function(){m.restart()}))}]);
//# sourceMappingURL=main.js.map