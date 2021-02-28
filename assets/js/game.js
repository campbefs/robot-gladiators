var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;


// you can also log multiple values at once like this:
//console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
// var enemyHealth = 50; added to fight function
var enemyAttack = 12;

//console.log(enemyNames.length);
//console.log('wtf');

// for (var i = 0; i < 3; i++) {
//   console.log("apple");
// }

// for (var i = 0; i < enemyNames.length; i++) {
//   console.log(enemyNames[i]);
//   console.log(i);
//   console.log(enemyNames[i] + " is at " + i + " index");
// }

window.alert("Welcome to Robot Gladiators!")

// create function
var fight = function(enemyName) {
  
  while(enemyHealth>0 && playerHealth > 0) {

    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?  \
      Enter 'FIGHT' or 'SKIP' to choose.");

    if (promptFight === "skip" | promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        //subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney);
        break;
      }
    }

      
    //Subtract the value of `playerAttack` from the value of `enemyHealth`
    // and use that result to update the value in the `enemyHealth` variable
    enemyHealth = enemyHealth - playerAttack;

    // Log a resulting message to the console so we know that it worked.
    console.log(
      playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");
      break;
    }
    else {   window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    // Subtract the value of `enemyAttack` from the value of `playerHealth` 
    //and use that result to update the value in the `playerHealth` variable.
    playerHealth = playerHealth - enemyAttack;

    // Log a resulting message to the console so we know that it worked.
    console.log(
      enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    )

    // check to see if the value of the playerHealth variable is > 0
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
      break;
    }
    else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  }
};

// execute function
// fight("Roberto");

// var fight = function(enemyName) {
//   ... // fight function statements
// }

for(var i = 0; i < enemyNames.length; i++) {
  // debugger;
  var enemyHealth = 50;
  fight(enemyNames[i]);
}
