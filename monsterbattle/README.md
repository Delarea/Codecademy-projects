
# **MONSTER BATTLE**
*******************

#### *version 1.0.0*
#### Requires a *node.js* editor and *cors* installed in the package.
##### If just the script.js is downloaded, run ***npm install cors*** in the terminal to install cors before playing.
********************

### This script will run a random battle for a character you name. There are currently 3 types of monsters and 3 types of heros. 
*****************************************

## **Monsters In Current Version:**
A monster will spawn randomly from these 3 monsters. Each monster will spawn with random health based on the hit point die assigned to the monster.
- **Bullywug**
    - Hit Points: 2D8 + 2
    - Armor Class: 15
    - Main attack: Bite 1D4 + 1
    - Secondary attack: Spear 1D8 + 1
- **Goblin Boss**
    - Hit Points: 6D6
    - Armor Class: 17
    - Main attack: Scimitar 1D6 + 2
    - Secondary attack: Javelin 1D6 + 2
- **Jackalwere**
    - Hit Points: 4D8
    - Armor Class: 12
    - Main attack: Bite 1D4 + 2
    - Secondary attack: Scimitar 1D6 + 2
***************************************************

## **Heros In Current Version:**
When playing the game, you will name your character and one of the three mele class characters below will be randomly selected. 
- **Fighter**
    - Hit Points: 11
    - Armor Class: 12
    - Main attack: Great Axe 1D10 + 2
    - Secondary attack: Great Axe 1D10 + 2
- **Barbarian**
    - Hit Points: 15
    - Armor Class: 14
    - Main attack: Great Sword 2D6 + 3
    - Secondary attack: Great Sword 2D6 +3
- **Paladin**
    - Hit Points: 12
    - Armor Class: 11
    - Main attack: Warhammer 1D10 + 3
    - Secondary attack: Breath Weapon 2D6
****************************************************

## **To Play The Game**
- Download the package (monsterbattle folder)
    - run ***npm install cors*** in a node.js editor if just the script.js is downloaded
- At the bottom of the script.js file insert your desired hero name into the ***playGame('Delaria');*** function leaving the parenthesis and quotes. 
    - example: playGame('Thor');
- In the terminal type ***node script.js***
    - The game will log to the console with each round and an overall winner of the battle. 
***************************************************
## **How The Game Works**
- The class of the hero will be randomized for each game.
- The type of monster will be randomized for each game.
- The type of attack for the hero and monster will be randomized in each round of the game.
- Both the hero and monster will roll initiative to determine who goes first.
- For each round, the hero and monster will roll for their attack. If their attack roll and proficiency bonus are greater than or equal to the opponents armor class, they will hit their opponent.
- Main attacks and secondary attacks are randomly selected each round for both the hero and the monster.