// Map each class of actor to a character
var actorChars = { // these are all the things that is not the walls and ground
  "@": Player,
  "a": Ewok1, 
  "b": Ewok2, 
  "c": Ewok3,// A coin will wobble up and down
  "=": Lava, "|": Lava, "v": Lava,   
  "-": Bullet,
  "=": Soldier, "|": Soldier, "v": Soldier, 

  // jumping actor 
};
//var sound = true;
//****************************************************************************** sound bank 
var death = new Audio("Scream.wav");
var won = new Audio("impresiv.wav");
var kill = new Audio("death.mp3");


 // ***************************************************************************************
function Level(plan) { // the world it self, the difference between open air and a wall
  // Use the length of a single row to set the width of the level
  this.width = plan[0].length;
  
  // Use the number of rows to set the height inside the gamelevel.js thr rows start and stop at the [] ""'s are used to show overall box 
  this.height = plan.length;

  // Store the individual tiles in our own, separate array
  this.grid = []; // grid is now a array 

  // Store a list of actors to process each frame
  this.actors = []; // actors is now an array 

  // Loop through each row in the plan, creating an array in our grid
  for (var y = 0; y < this.height; y++) { // going up and down 
    var line = plan[y], gridLine = []; // the creation of plan array set to what ever y is. and gridline as an open array 

    // Loop through each array element in the inner array for the type of the tile
    for (var x = 0; x < this.width; x++) { // moving left and right 
      // Get the type from that character in the string. It can be 'x', '!' or ' '
      // If the character is ' ', assign null.

      var ch = line[x], fieldType = null; // creation of ch ( this will grab what ever line is at the time). fieldtype is set to null at first.
      var Actor = actorChars[ch]; // actorChars(created above) depending on which ch it is, will tell actor which it is.
      // Use if and else to handle the three cases
      if (Actor) // if there is an actor( if there is a ch to be had)
        // Create a new actor at that grid position.
        this.actors.push(new Actor(new Vector(x, y), ch));//  this will create a location for the actor onto the grid. "new", will create a new thing with the structure of actor 
      else if (ch == "x") // else ifs will update the field type.
        fieldType = "wall";
      // Because there is a third case (space ' '), use an "else if" instead of "else"
      else if (ch == "w") // else ifs will update the field type.
        fieldType = "wood";
      else if (ch == "!")
        fieldType = "lava";
            else if (ch == "m")
        fieldType = "soldier";
      else if(ch == "i")
        fieldtype = "invisWall";

      // "Push" the fieldType, which is a string, onto the gridLine array (at the end).
      gridLine.push(fieldType);
    }
    // Push the entire row onto the array of rows.
    this.grid.push(gridLine);
  } // this is the end of the first loop 

  // Find and assign the player character and assign to Level.player
  this.player = this.actors.filter(function(actor) { // filter will make a new array of only the elements that pass. filter uses the function acotr 
    return actor.type == "player";
  })[0];
}
//************************************************************************************************************

// Check if level is finished
Level.prototype.isFinished = function() {
  return this.status != null && this.finishDelay < 0;
};

function Vector(x, y) { // this is the location of things, could also be called coordinates 
  this.x = x; this.y = y;
}

// Vector arithmetic: v_1 + v_2 = <a,b>+<c,d> = <a+c,b+d> // what does this mean 
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

// Vector arithmetic: v_1 * factor = <a,b>*factor = <a*factor,b*factor>
Vector.prototype.times = function(factor) {
  return new Vector(this.x * factor, this.y * factor);
};






function Bullet (pos) {

this.pos = pos.plus()
this.size = new Vector(0.5, 0.5);
this.speed = new Vector (10,0);

}
Bullet.prototype.type = " bullet";
console.log("test" + Player.pos);



// A Player has a size, speed and position.
function Player(pos) {
  this.pos = pos.plus(new Vector(0, -2)); // using the plus proto as seen above the player is given its vecotr.
  this.size = new Vector(1.5, 3); // 
  this.speed = new Vector(0, 0);
}
Player.prototype.type = "player"; // why could i not just slide this line into the function?

// Add a new actor type as a class
function Ewok1(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1)); // will make it float of the ground a bit 
  this.size = new Vector(1, 1);
  // Make it go back and forth in a sine wave.
  this.wobble = Math.random() * Math.PI * 2; // wobble mechanics 
}
Ewok1.prototype.type = "ewok1";

function Ewok2(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1)); // will make it float of the ground a bit 
  this.size = new Vector(1, 1);
  // Make it go back and forth in a sine wave.
  this.wobble = Math.random() * Math.PI * 2; // wobble mechanics 
}
Ewok2.prototype.type = "ewok2";

function Ewok3(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1)); // will make it float of the ground a bit 
  this.size = new Vector(1, 1);
  // Make it go back and forth in a sine wave.
  this.wobble = Math.random() * Math.PI * 2; // wobble mechanics 
}
Ewok3.prototype.type = "ewok3";

// Lava is initialized based on the character, but otherwise has a
// size and position
function Lava(pos, ch) { // needs to take in its pos and which one 
  this.pos = pos; // it doesnt move 
  this.size = new Vector(1, 1); 
  if (ch == "=") { // needs to see if its lava that moves left or right or up and down.
    // Horizontal lava
    this.speed = new Vector(2, 0); // left is x , right is y 
  } else if (ch == "|") {
    // Vertical lava
    this.speed = new Vector(0, 2);
  } else if (ch == "v") {
    // Drip lava. Repeat back to this pos.
    this.speed = new Vector(0, 3);
    this.repeatPos = pos; // will repeat when it hits 
  }
}
Lava.prototype.type = "lava";

function Soldier(pos, ch) { // needs to take in its pos and which one 
  this.pos = pos; // it doesnt move 
  this.size = new Vector(1, 1); 
  if (ch == "=") { // needs to see if its lava that moves left or right or up and down.
    // Horizontal lava
    this.speed = new Vector(2, 0); // left is x , right is y 
  } else if (ch == "|") {
    // Vertical lava
    this.speed = new Vector(0, 2);
  } else if (ch == "v") {
    // Drip lava. Repeat back to this pos.
    this.speed = new Vector(0, 3);
    this.repeatPos = pos; // will repeat when it hits 
  }
}
Soldier.prototype.type = "soldier";




// ***********************************************************************************************************


// Helper function to easily create an element of a type provided 
function elt(name, className) {
  var elt = document.createElement(name);
  if (className) elt.className = className; // if it receive a class name, then the new element will have that classname.
  return elt;
}

function sound(){

  //var death = elt(audio01);

}
//var sound1 = document.getElementById("audio01");
//sound1.autoplay = true;
console.log("test your mother");






// Main display class. We keep track of the scroll window using it.
function DOMDisplay(parent, level) {

// this.wrap corresponds to a div created with class of "game"
  this.wrap = parent.appendChild(elt("div", "game")); // wrap will be put in later. using the elt, creates an element with name div and classname game 
  this.level = level;

  // In this version, we only have a static background.
  this.wrap.appendChild(this.drawBackground());

  // Keep track of actors
  this.actorLayer = null; // for right now its null

  // Update the world based on player position
  this.drawFrame();
}

var scale = 20;

DOMDisplay.prototype.drawBackground = function() {
  var table = elt("table", "background"); // creates a new element.
  table.style.width = this.level.width * scale + "px";

  // Assign a class to new row element directly from the string from
  // each tile in grid
  this.level.grid.forEach(function(row) {
    var rowElt = table.appendChild(elt("tr"));
    rowElt.style.height = scale + "px";
    row.forEach(function(type) {
      rowElt.appendChild(elt("td", type));
    });
  });
  return table;
};

// All actors are above (in front of) background elements.  
DOMDisplay.prototype.drawActors = function() {
  // Create a new container div for actor dom elements
  var wrap = elt("div");

  // Create a new element for each actor each frame
  this.level.actors.forEach(function(actor) {
    var rect = wrap.appendChild(elt("div",
                                    "actor " + actor.type));
    rect.style.width = actor.size.x * scale + "px";
    rect.style.height = actor.size.y * scale + "px";
    rect.style.left = actor.pos.x * scale + "px";
    rect.style.top = actor.pos.y * scale + "px";
  });
  return wrap;
};

DOMDisplay.prototype.drawFrame = function() {
  if (this.actorLayer)
    this.wrap.removeChild(this.actorLayer);
  this.actorLayer = this.wrap.appendChild(this.drawActors());
  // Update the status each time with this.level.status"
  this.wrap.className = "game " + (this.level.status || "");
  this.scrollPlayerIntoView();
};

DOMDisplay.prototype.scrollPlayerIntoView = function() {
  var width = this.wrap.clientWidth;
  var height = this.wrap.clientHeight;

  // We want to keep player at least 1/3 away from side of screen
  var margin = width / 3; // this sets how far the camera will go from border 

  // The viewport
  var left = this.wrap.scrollLeft, right = left + width;
  var top = this.wrap.scrollTop, bottom = top + height;

  var player = this.level.player;
  // Change coordinates from the source to our scaled.
  var center = player.pos.plus(player.size.times(0.5))
                 .times(scale);

  if (center.x < left + margin) // these make sure that var margin is used when it should be.
    this.wrap.scrollLeft = center.x - margin;
  else if (center.x > right - margin)
    this.wrap.scrollLeft = center.x + margin - width;
  if (center.y < top + margin)
    this.wrap.scrollTop = center.y - margin;
  else if (center.y > bottom - margin)
    this.wrap.scrollTop = center.y + margin - height;
};

// Remove the wrap element when clearing the display
// This will be garbage collected
DOMDisplay.prototype.clear = function() {
  this.wrap.parentNode.removeChild(this.wrap);
};

// *************************************************************************************************

// Return the first obstacle found given a size and position.
Level.prototype.obstacleAt = function(pos, size) {
  // Find the "coordinate" of the tile representing left bound
  var xStart = Math.floor(pos.x);
  // right bound
  var xEnd = Math.ceil(pos.x + size.x);
  // top bound
  var yStart = Math.floor(pos.y);
  // Bottom bound
  var yEnd = Math.ceil(pos.y + size.y);

  // Consider the sides and top and bottom of the level as walls
  if (xStart < 0 || xEnd > this.width || yStart < 0)
    return "wall";
  if (yEnd > this.height)
    return "lava";

  // Check each grid position starting at yStart, xStart
  // for a possible obstacle (non null value)
  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      var fieldType = this.grid[y][x];
      if (fieldType) return fieldType;
    }
  }
};

// Collision detection for actors is handled separately from 
// tiles. 
Level.prototype.actorAt = function(actor) {
  // Loop over each actor in our actors list and compare the 
  // boundary boxes for overlaps.
  for (var i = 0; i < this.actors.length; i++) {
    var other = this.actors[i];
    // if the other actor isn't the acting actor
    if (other != actor &&
        actor.pos.x + actor.size.x > other.pos.x && // so, if the player would to overlap( occupy same space) as another acotr, other will be returned.
        actor.pos.x < other.pos.x + other.size.x &&
        actor.pos.y + actor.size.y > other.pos.y &&
        actor.pos.y < other.pos.y + other.size.y)
      // check if the boundaries overlap by comparing all sides for
      // overlap and return the other actor if found
      return other;
  }
};

// Update simulation each step based on keys & step size
Level.prototype.animate = function(step, keys) {
  // Have game continue past point of win or loss
  if (this.status != null)
    this.finishDelay -= step;

  // Ensure each is maximum 100 milliseconds 
  while (step > 0) {
    var thisStep = Math.min(step, maxStep);
    this.actors.forEach(function(actor) {
      // Allow each actor to act on their surroundings
      actor.act(thisStep, this, keys);
    }, this);
   // Do this by looping across the step size, subtracing either the
   // step itself or 100 milliseconds
    step -= thisStep;
  }
};

Lava.prototype.act = function(step, level) { // this function cause the lava to turn around the other way.
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};

Soldier.prototype.act = function(step, level) { // this function cause the lava to turn around the other way.
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};


var maxStep = 0.05;

var wobbleSpeed = 8, wobbleDist = 1;

Ewok1.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};

Ewok2.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};

Ewok3.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};



var playerXSpeed = 7;

Player.prototype.moveX = function(step, level, keys, type,actor) {
  this.speed.x = 0;
  if (keys.left) this.speed.x -= playerXSpeed;
  if (keys.right) this.speed.x += playerXSpeed;

    if (keys.left) this.status = "left"; // these dont work 
  if (keys.right) this.status = "right"; 

  var motion = new Vector(this.speed.x * step, 0);
  // Find out where the player character will be in this frame
  var newPos = this.pos.plus(motion);
  // Find if there's an obstacle there
  var obstacle = level.obstacleAt(newPos, this.size); //this calls the green obstacleAt function that was made above,
  // Handle lava by calling playerTouched
  if (obstacle)
    level.playerTouched(obstacle); // if there is an obstacle, it will call playertouched.
  else
    // Move if there's not an obstacle there.
    this.pos = newPos;
};

var gravity = 30;
var jumpSpeed = 15;
var jump_pack_speed = 15;
var charge_start = true;
function charges(charge_start, number){

  var charges = charge_start;
  charges = number;
console.log (" how many left? " + charges);
  return charges;
};


Player.prototype.moveY = function(step, level, keys) { // the player ability to jump 
  // Accelerate player downward (always)
  this.speed.y += step * gravity;; // this will cuase gravity, player is always moving downward unless a wall catches them.
  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size); // same thing that is used for lava, will find obstacles 
  
  // The floor is also an obstacle -- only allow players to 
  // jump if they are touching some obstacle.
  if(keys.jump_pack){
    console.log(" pack pressed");
    if ( charge_start == true){
      this.speed.y = -jump_pack_speed;
      charge_start = charges(charge_start, false );
    }
    
    
  }

  if (obstacle) {
    level.playerTouched(obstacle);
    charge_start = charges(charge_start, true );
    
    if (keys.up && this.speed.y > 0) // add jumppack some where here. not here, becuase the player doesnt need to be touching the floor to use it.
      this.speed.y = -jumpSpeed;
    else
      this.speed.y = 0;
  } else {
    this.pos = newPos;
  }
};

/*
var sound1 = document.getElementById("audio01");
console.log(" what is sound" + sound1);
*/

Player.prototype.act = function(step, level, keys) {
  this.moveX(step, level, keys);
  this.moveY(step, level, keys);

if(level.status == "left"){
      
}




  var otherActor = level.actorAt(this);
  if (otherActor)
    level.playerTouched(otherActor.type, otherActor); // this might be needed to change if i add another actor to interact with player. simply coming into contact with anything should not cause fail 

  // Losing animation
  if (level.status == "lost") {
    document.querySelector("Scream.wave");
    death.play();
    //this.pos.y += step; // step is a time counter. 
    //this.size.y -= step;
  }
};

Level.prototype.playerTouched = function(type, actor, keys) { // did the player touch somthing,? itll be updated here.


  // if the player touches lava and the player hasn't won
  // Player loses
  if (type == "lava" && this.status == null) {
    this.status = "lost";
    this.finishDelay = 1.2;
  }  else if (type == "soldier" && this.status == null) {
    this.status = "lost";
    this.finishDelay = 1.2;
  } 

  else if (type == "ewok1" || type == "ewok2" || type == "ewok3") {
    this.actors = this.actors.filter(function(other) {
          document.querySelector("death.mp3");
    kill.play();
      return other != actor;
    });
    // If there aren't any coins left, player wins
    if (!this.actors.some(function(actor) {
           return actor.type == "ewok1";
         })) 
      if (!this.actors.some(function(actor) {
           return actor.type == "ewok2";
         }))
        if (!this.actors.some(function(actor) {
           return actor.type == "ewok3";
         }))

    {
      this.status = "won";
      document.querySelector("impresiv.mp3");
    won.play();
      this.finishDelay = 1;
    }
  }
};

// ***********************************************************************************************************

// Arrow key codes for readibility
var arrowCodes = {37: "left", 38: "up", 39: "right", 32: "jump_pack", 69: "shoot"}; // these are the controls, if I add an ability, the key will have to be placed in here.

// Translate the codes pressed from a key event
function trackKeys(codes) {
  var pressed = Object.create(null);

  // alters the current "pressed" array which is returned from this function. 
  // The "pressed" variable persists even after this function terminates
  // That is why we needed to assign it using "Object.create()" as 
  // otherwise it would be garbage collected

  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      // If the event is keydown, set down to true. Else set to false.
      var down = event.type == "keydown";
      pressed[codes[event.keyCode]] = down;
      // We don't want the key press to scroll the browser window, 
      // This stops the event from continuing to be processed
      event.preventDefault();
    }
  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return pressed;
}

// frameFunc is a function called each frame with the parameter "step"
// step is the amount of time since the last call used for animation
function runAnimation(frameFunc) {
  var lastTime = null; // how long itll last 
  function frame(time) {
    var stop = false;
    if (lastTime != null) {
      // Set a maximum frame step of 100 milliseconds to prevent
      // having big jumps
      var timeStep = Math.min(time - lastTime, 100) / 1000;

      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if (!stop)
      requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// This assigns the array that will be updated anytime the player
// presses an arrow key. We can access it from anywhere.
var arrows = trackKeys(arrowCodes);

// Organize a single level and begin animation
function runLevel(level, Display, andThen) { // this will be the last function for the level, it will grab all the other functions and tell them to start here 
  var display = new Display(document.body, level);

  runAnimation(function(step) {
    // Allow the viewer to scroll the level
    level.animate(step, arrows);
    display.drawFrame(step);
    if (level.isFinished()) {
      display.clear();
      if (andThen)
        andThen(level.status);
      return false;
    }
  });
}

function runGame(plans, Display) { // this will play the next level when you win.
  function startLevel(n) {
    // Create a new level using the nth element of array plans
    // Pass in a reference to Display function, DOMDisplay (in index.html).
    runLevel(new Level(plans[n]), Display, function(status) {
      if (status == "lost")
        startLevel(n);
      //var died = document.getElementById("audio01");

      else if (n < plans.length - 1)
        startLevel(n + 1);
      else
        console.log("You win!");
    });
  }
  startLevel(0);
}
