#! user/bin/env node
import inquirer from "inquirer";
//----------------------- game variables ----------------------------
let enemies = ["Skeleton", "Creeper", "Warrior", "Assassin"];
let maxEnemyHealth = 175;
let enemyAttackDamageToHero = 30;
//----------------------- player variables ----------------------------
let heroHealth = 200;
let attackDamageToEnemy = 50;
let numHealthPotion = 4;
let healthPotionHealAmount = 40;
let healthPotionDropChance = 20;
//----------------------- while-loop condition ----------------------------
let gameRunning = true;
console.log("Welcome to DeadZone !");
Game: while (gameRunning) {
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
    let enemyIndex = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[enemyIndex];
    console.log(`# ${enemy} has arrived! #\n`);
    while (enemyHealth > 0) {
        console.log(`Your Health is: ${heroHealth}`);
        console.log(`${enemy} Health is: ${enemyHealth}`);
        let options = await inquirer.prompt({
            name: "ans",
            type: "list",
            message: "what would you like to do?",
            choices: ["1. Attack", "2. Use Health Potion", "3. Run"],
        });
        if (options.ans === "1. Attack") {
            let attackDamageToEnemy = 50;
            let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);
            let damageToHero = Math.floor(Math.random() * enemyAttackDamageToHero + 1);
            enemyHealth -= damageToEnemy;
            heroHealth -= damageToHero;
            console.log(`You strike the ${enemy} for ${damageToEnemy} damage.`);
            console.log(`${enemy} strike you for ${damageToHero} damage.`);
            if (heroHealth < 1) {
                console.log("You have taken too much damage. You are too weak to continue.");
                break;
            }
        }
        else if (options.ans === "2. Use Health Potion") {
            if (numHealthPotion > 0) {
                heroHealth += healthPotionHealAmount;
                numHealthPotion--;
                console.log(`You use health potion for ${healthPotionHealAmount}`);
                console.log(`You now have ${heroHealth} health`);
                console.log(`You have ${numHealthPotion} health potion left.`);
            }
            else {
                console.log(`You have no health potion left. Defeat the enemy for a chance to get health potion`);
            }
        }
        else if (options.ans === "3. Run") {
            console.log(`You ran away from ${enemy}`);
            continue Game;
        }
    }
    if (heroHealth < 1) {
        console.log(`You loose the battle. You are too weak.`);
        break;
    }
    console.log(`${enemy} was defeated !`);
    console.log(` You have ${heroHealth} health.`);
    let randomNumber = Math.floor(Math.random() * 100 + 1);
    if (randomNumber < healthPotionDropChance) {
        numHealthPotion++;
        console.log(`Enemydrop the health potion`);
        console.log(`Your health is: ${heroHealth}`);
        console.log(`Your health potion is: ${numHealthPotion}`);
    }
    let userOption = await inquirer.prompt({
        name: "ans",
        type: "list",
        message: "What would you like to do now",
        choices: ["1. Continue", "2. Exit"],
    });
    if (userOption.ans === "1. Continue") {
        console.log("You are resuming on your adventure...");
    }
    else {
        console.log("You successfully Exit from DeadZone.");
        break;
    }
    console.log("Thankyou for playing.\n");
}
