
// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money);
        break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    // enemy.health = Math.max(0, enemy.health - playerInfo.attack);
    // generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemy.health = Math.max(0, enemy.health - damage);

    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemy.attack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);

    playerInfo.health = Math.max(0, playerInfo.health - damage);


    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      console.log('health: ', playerInfo.health);
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};

// fight each enemy-robot by looping over them and fighting them one at a time
var startGame = function() {

  // reset the player stats...
  playerInfo.reset();

  // fight each enemy-robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

      // pick new enemy to fight based on the index of the enemy.names array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemy.health before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      // use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;

      // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
      fight(pickedEnemyObj);

      // if we're not at the last enemy in the array
      if (i < enemyInfo.length - 1 && playerInfo.health > 0) {
        console.log('player health: ', playerInfo.health);
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        // if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }

    }
    // if player isn't alive, stop the game
    else {
      // window.alert('You have lost your robot in battle! Game Over!'); // duplicate
      break;
    }
  }

  // after the loop ends, player is either out of health or enemies to fight; run endgame function
  endGame();

};

// function to end the game
var endGame = function() {

  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  } else {
    window.alert("You've lost your robot in battle.");
  }

  // ask player if they'd like to play ahain
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!")
  }
};


var shop = function() {
  // ask the player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );


  switch (shopOptionPrompt) {
    case "REFILL": // next case
    case "refill":
      playerInfo.refillHealth();
      break;

    case "UPGRADE": // next case
    case "upgrade":
      playerInfo.upgradeAttack();
      break;

    case "LEAVE": // next case
    case "leave":
      window.alert("Leaving the store.");

      // do nothing, so function will end
      break;

    default:
      window.alert("You did not pick a valid option. Try again.");

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }

};


// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}


var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
}


var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];


startGame();









































// var playerInfo.name = window.prompt("What is your robot's name?");
// var playerInfo.health = 100;
// var playerInfo.attack = 10;
// var playerInfo.money = 10;


// // you can also log multiple values at once like this:
// //console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

// var enemy.names = ["Roberto", "Amy Android", "Robo Trumble"];
// var enemy.health = 50; // added to fight function
// var enemy.attack = 12;

// //console.log(enemy.names.length);
// //console.log('wtf');

// // for (var i = 0; i < 3; i++) {
// //   console.log("apple");
// // }

// // for (var i = 0; i < enemy.names.length; i++) {
// //   console.log(enemy.names[i]);
// //   console.log(i);
// //   console.log(enemy.names[i] + " is at " + i + " index");
// // }


// // create function
// var fight = function(enemy.name) {  
//   while(enemy.health>0 && playerInfo.health > 0) {

//     var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?  \
//       Enter 'FIGHT' or 'SKIP' to choose.");

//     if (promptFight === "skip" | promptFight === "SKIP") {
//       // confirm player wants to skip
//       var confirmSkip = window.confirm("Are you sure you'd like to quit?");

//       // if yes (true), leave fight
//       if (confirmSkip) {
//         window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
//         //subtract money from playerInfo.money for skipping
//         playerInfo.money = playerInfo.money - 10;
//         console.log("playerInfo.money", playerInfo.money);
//         break;
//       }
//     }

      
//     //Subtract the value of `playerInfo.attack` from the value of `enemy.health`
//     // and use that result to update the value in the `enemy.health` variable
//     enemy.health = enemy.health - playerInfo.attack;

//     // Log a resulting message to the console so we know that it worked.
//     console.log(
//       playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
//     );

//     // check enemy's health
//     if (enemy.health <= 0) {
//       window.alert(enemy.name + " has died!");

//       playerInfo.money = playerInfo.money + 20;

//       break;
//     }
//     else {   window.alert(enemy.name + " still has " + enemy.health + " health left.");
//     }

//     // Subtract the value of `enemy.attack` from the value of `playerInfo.health` 
//     // and use that result to update the value in the `playerInfo.health` variable.
//     playerInfo.health = playerInfo.health - enemy.attack;

//     // Log a resulting message to the console so we know that it worked.
//     console.log(
//       enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
//     )

//     // check to see if the value of the playerInfo.health variable is > 0
//     if (playerInfo.health <= 0) {
//       window.alert(playerInfo.name + " has died!");
//       break;
//     }
//     else {
//       window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
//     }
//   }
// };

// // execute function
// // fight("Roberto");

// // var fight = function(enemy.name) {
// //   ... // fight function statements
// // }

// var startGame = function() {
//   // reset player stats
//   playerInfo.health = 100;
//   playerInfo.attack = 10;
//   playerInfo.money = 10;

//   for(var i = 0; i < enemy.names.length; i++) {
//     if (playerInfo.health > 0) {
//       window.alert("Welcome to Robot Gladiators! Round" + (i + 1));
      
//       //reset enemy health before starting new fight
//       var enemy.health = 50;
      
//       fight(enemy.names[i]);

//     } else {
//       window.alert("You have lost your robot in battle! Game Over!");
//       break;
//     }
// }
//   //startGame();
//   // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
//   endGame();
// };

// // function to end the entire game
// var endGame = function () {
//   // if player is still alive, player wins!
//   if (playerInfo.health > 0) {
//     window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
//   } else {