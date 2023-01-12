<<<<<<< HEAD
const e = require("cors");
const { isReadable } = require("stream");

const getHitPoints = (numberDie, typeDie, modifier) => {
    let hP = 0;
    for(let i = numberDie; i > 0; i--) {
        hP += Math.floor((Math.random() * typeDie) + 1)
    }
    return (hP + modifier);
};

const getAttackDmg = (numberDie, typeDie, modifier) => {
    let dmg = 0;
    for(let j = numberDie; j > 0; j--) {
        dmg += Math.floor((Math.random() * typeDie) + 1)
    }
    return (dmg + modifier);
};

const attackRoll = (bonus) => {
    let roll = Math.floor((Math.random() * 20) + 1);
    return (roll + bonus);
};

const initiative = () => {
    let initiativeRoll = Math.floor((Math.random() * 20) + 1);
    return initiativeRoll;
};

const monster = {
    1: {
        type: "Bullywug",
        armorClass: 15,
        proficiencyBonus: 3,
        hitPoints: getHitPoints(2, 8, 2),
        mainAtkType: "bite",
        mainAtkDmg: getAttackDmg(1, 4, 1),
        secAtkType: "spear",
        secAtkDmg: getAttackDmg(1, 8, 1),
        set health(dmgTaken) {
            this.hitPoints -= dmgTaken;
        }
    },
    2: {
        type: "Goblin Boss",
        armorClass: 17,
        proficiencyBonus: 4,
        hitPoints: getHitPoints(6, 6, 0),
        mainAtkType: "scimitar",
        mainAtkDmg: getAttackDmg(1, 6, 2),
        secAtkType: "javelin",
        secAtkDmg: getAttackDmg(1, 6, 2),
        set health(dmgTaken) {
            this.hitPoints -= dmgTaken;
        }
    },
    3: {
        type: "Jackalwere",
        armorClass: 12,
        proficiencyBonus: 4,
        hitPoints: getHitPoints(4, 8, 0),
        mainAtkType: "bite",
        mainAtkDmg: getAttackDmg(1, 4, 2),
        secAtkType: "scimitar",
        secAtkDmg: getAttackDmg(1, 6, 2),
        set health(dmgTaken) {
            this.hitPoints -= dmgTaken;
        }
    }
};

const hero = {
    1: {
        name: '',
        type: "fighter",
        armorClass: 12,
        proficiencyBonus: 4,
        hitPoints: 11,
        mainAtkType: "great axe",
        mainAtkDmg: getAttackDmg(1, 10, 2),
        secAtkType: "great axe",
        secAtkDmg: getAttackDmg(1, 10, 2),
        set health(dmgTaken) {
            this.hitPoints -= dmgTaken;
        },
        set heroName(name){
            this.name = name;
        }
    },
    2: {
        name: '',
        type: "barbarian",
        armorClass: 14,
        proficiencyBonus: 5,
        hitPoints: 15,
        mainAtkType: "great sword",
        mainAtkDmg: getAttackDmg(2, 6, 3),
        secAtkType: "great sword",
        secAtkDmg: getAttackDmg(2, 6, 3),
        set health(dmgTaken) {
            this.hitPoints -= dmgTaken;
        },
        set heroName(name){
            this.name = name;
    },
},
    3: {
        name: '',
        type: "paladin",
        armorClass: 11,
        proficiencyBonus: 4,
        hitPoints: 12,
        mainAtkType: "warhammer",
        mainAtkDmg: getAttackDmg(1, 10, 3),
        secAtkType: "breath weapon",
        secAtkDmg: getAttackDmg(2, 6, 0),
        set health(dmgTaken) {
            this.hitPoints -= dmgTaken;
        },
        set heroName(name){
            this.name = name;
        }
    }
};

// helper function counts the number of heros and monsters in above objects (so I can add more easily without changing code)
function countEntries(obj) {
    let count = 0;
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop))
        count ++;
    }
    return count;
};

// helper function gets random entry from monsters or heros
function getRandomEntry(obj) {
    let entry = Math.floor((Math.random() * countEntries(obj)) + 1);
    return entry;
}

// sets a random hero's name to user input - returns number of entry so we know which was selected
function setHeroName(name) {
    let randomHero = getRandomEntry(hero);
    hero[randomHero].heroName = name;
    return randomHero;
};



//random number used in determining attack type and damage
function getRandom() {
    let attack = Math.floor((Math.random() * 2) + 1);
    return attack;
};

function getAttackType(obj, weapon) {
    if(weapon === 1) {
        return obj.mainAtkType;
    } else if (weapon === 2) {
        return obj.secAtkType;
    }
};

function typeAttackDmg(obj, weapon) {
    if(weapon === 1) {
        return obj.mainAtkDmg;
    } else if(weapon === 2) {
        return obj.secAtkDmg;
    }
};


function heroInitiative(hType, hName, mType, monst) {
    let heroType = hType;
    let heroName = hName;
    let monsterType = mType;
    let monsters = monst;
    while ((hero[heroType].hitPoints > 0) && (monster[monsterType].hitPoints > 0)) {
        let heroAtkRoll = attackRoll(hero[heroType].proficiencyBonus);
        let monsterAtkRoll = attackRoll(monster[monsterType].proficiencyBonus);
        let weapon = getRandom();
        let heroAtk = getAttackType(hero[heroType], weapon);
        let heroDmg = typeAttackDmg(hero[heroType], weapon);
        if(hero[heroType].hitPoints > 0) {
            if(heroAtkRoll >= monster[monsterType].armorClass) {
                monster[monsterType].health = heroDmg;
                console.log(`${heroName} hit the ${monsters} for ${heroDmg} hit points with their ${heroAtk}! The ${monsters} has ${monster[monsterType].hitPoints} hit points remaining.`);
            }else {
                console.log(`${heroName} missed the ${monsters} with their ${heroAtk}! The ${monsters} still has ${monster[monsterType].hitPoints} hit points remaining.`);
            }
        }

        let monsterWeapon = getRandom();
        let monsterAtk = getAttackType(monster[monsterType], monsterWeapon);
        let monsterDmg = typeAttackDmg(monster[monsterType], monsterWeapon);
        if(monster[monsterType].hitPoints > 0){
            if(monsterAtkRoll >= hero[heroType].armorClass) {
                hero[heroType].health = monsterDmg;
                console.log(`The ${monsters} hit ${heroName} for ${monsterDmg} hit points with their ${monsterAtk}! ${heroName} has ${hero[heroType].hitPoints} remaining.`);
            } else {
                console.log(`The ${monsters} missed ${heroName} with their ${monsterAtk}! ${heroName} still has ${hero[heroType].hitPoints} remaining.`);
            }
        }

        if((hero[heroType].hitPoints <= 0) || (monster[monsterType].hitPoints <= 0)) {
            if(hero[heroType].hitPoints > monster[monsterType].hitPoints) {
                console.log(`${heroName} defeated the ${monsters} and has ${hero[heroType].hitPoints} hit points remaining!`);
            } else {
                console.log(`The ${monsters} defeated the hero ${heroName} and has ${monster[monsterType].hitPoints} hit points remaining!`);
            }
            break;
        }
    }
};

function monsterInitiative(hType, hName, mType, monst) {
    let heroType = hType;
    let heroName = hName;
    let monsterType = mType;
    let monsters = monst;
    while ((hero[heroType].hitPoints > 0) && (monster[monsterType].hitPoints > 0)) {
        let heroAtkRoll = attackRoll(hero[heroType].proficiencyBonus);
        let monsterAtkRoll = attackRoll(monster[monsterType].proficiencyBonus);
        let monsterWeapon = getRandom();
        let monsterAtk = getAttackType(monster[monsterType], monsterWeapon);
        let monsterDmg = typeAttackDmg(monster[monsterType], monsterWeapon);
        if(monster[monsterType].hitPoints > 0){
            if(monsterAtkRoll >= hero[heroType].armorClass) {
                hero[heroType].health = monsterDmg;
                console.log(`The ${monsters} hit ${heroName} for ${monsterDmg} hit points with their ${monsterAtk}! ${heroName} has ${hero[heroType].hitPoints} remaining.`);
            } else {
                console.log(`The ${monsters} missed ${heroName} with their ${monsterAtk}! ${heroName} still has ${hero[heroType].hitPoints} remaining.`);
            }
        }

        let weapon = getRandom();
        let heroAtk = getAttackType(hero[heroType], weapon);
        let heroDmg = typeAttackDmg(hero[heroType], weapon);
        if(hero[heroType].hitPoints > 0) {
            if(heroAtkRoll >= monster[monsterType].armorClass) {
                monster[monsterType].health = heroDmg;
                console.log(`${heroName} hit the ${monsters} for ${heroDmg} hit points with their ${heroAtk}! The ${monsters} has ${monster[monsterType].hitPoints} hit points remaining.`);
            }else {
                console.log(`${heroName} missed the ${monsters} with their ${heroAtk}! The ${monsters} still has ${monster[monsterType].hitPoints} hit points remaining.`);
            }
        }

        if((hero[heroType].hitPoints <= 0) || (monster[monsterType].hitPoints <= 0)) {
            if(hero[heroType].hitPoints > monster[monsterType].hitPoints) {
                console.log(`${heroName} defeated the ${monsters} and has ${hero[heroType].hitPoints} hit points remaining!`);
            } else {
                console.log(`The ${monsters} defeated the hero ${heroName} and has ${monster[monsterType].hitPoints} hit points remaining!`);
            }
            break;
        }
    }
};

function playGame(name) {
    let heroType = setHeroName(name)
    let heroName = hero[heroType].name;
    let monsterType = getRandomEntry(monster);
    let monsters = monster[monsterType].type;
    let heroIntRoll = initiative();
    let monsterIntRoll = initiative();
    console.log(`${heroName} the ${hero[heroType].type} with ${hero[heroType].hitPoints} hit points is battling a ${monsters} with ${monster[monsterType].hitPoints} hit points!`);
    console.log(`${heroName} rolled a ${heroIntRoll} initiative and ${monsters} rolled a ${monsterIntRoll} initiative.`);
    if(heroIntRoll > monsterIntRoll) {
        console.log(`${heroName} attacks first!`);
        heroInitiative(heroType, heroName, monsterType, monsters);
    } else if(monsterIntRoll > heroIntRoll) {
        console.log(`The ${monsters} attacks first!`)
        monsterInitiative(heroType, heroName, monsterType, monsters);
    }
};

=======
const e = require("cors");
const { isReadable } = require("stream");

const getHitPoints = (numberDie, typeDie, modifier) => {
    let hP = 0;
    for(let i = numberDie; i > 0; i--) {
        hP += Math.floor((Math.random() * typeDie) + 1)
    }
    return (hP + modifier);
};

const getAttackDmg = (numberDie, typeDie, modifier) => {
    let dmg = 0;
    for(let j = numberDie; j > 0; j--) {
        dmg += Math.floor((Math.random() * typeDie) + 1)
    }
    return (dmg + modifier);
};

const attackRoll = (bonus) => {
    let roll = Math.floor((Math.random() * 20) + 1);
    return (roll + bonus);
};

const initiative = () => {
    let initiativeRoll = Math.floor((Math.random() * 20) + 1);
    return initiativeRoll;
};

const monster = {
    1: {
        type: "Bullywug",
        armorClass: 15,
        proficiencyBonus: 3,
        hitPoints: getHitPoints(2, 8, 2),
        mainAtkType: "bite",
        mainAtkDmg: getAttackDmg(1, 4, 1),
        secAtkType: "spear",
        secAtkDmg: getAttackDmg(1, 8, 1),
        set health(dmgTaken) {
            this.hitPoints -= dmgTaken;
        }
    },
    2: {
        type: "Goblin Boss",
        armorClass: 17,
        proficiencyBonus: 4,
        hitPoints: getHitPoints(6, 6, 0),
        mainAtkType: "scimitar",
        mainAtkDmg: getAttackDmg(1, 6, 2),
        secAtkType: "javelin",
        secAtkDmg: getAttackDmg(1, 6, 2),
        set health(dmgTaken) {
            this.hitPoints -= dmgTaken;
        }
    },
    3: {
        type: "Jackalwere",
        armorClass: 12,
        proficiencyBonus: 4,
        hitPoints: getHitPoints(4, 8, 0),
        mainAtkType: "bite",
        mainAtkDmg: getAttackDmg(1, 4, 2),
        secAtkType: "scimitar",
        secAtkDmg: getAttackDmg(1, 6, 2),
        set health(dmgTaken) {
            this.hitPoints -= dmgTaken;
        }
    }
};

const hero = {
    1: {
        name: '',
        type: "fighter",
        armorClass: 12,
        proficiencyBonus: 4,
        hitPoints: 11,
        mainAtkType: "great axe",
        mainAtkDmg: getAttackDmg(1, 10, 2),
        secAtkType: "great axe",
        secAtkDmg: getAttackDmg(1, 10, 2),
        set health(dmgTaken) {
            this.hitPoints -= dmgTaken;
        },
        set heroName(name){
            this.name = name;
        }
    },
    2: {
        name: '',
        type: "barbarian",
        armorClass: 14,
        proficiencyBonus: 5,
        hitPoints: 15,
        mainAtkType: "great sword",
        mainAtkDmg: getAttackDmg(2, 6, 3),
        secAtkType: "great sword",
        secAtkDmg: getAttackDmg(2, 6, 3),
        set health(dmgTaken) {
            this.hitPoints -= dmgTaken;
        },
        set heroName(name){
            this.name = name;
    },
},
    3: {
        name: '',
        type: "paladin",
        armorClass: 11,
        proficiencyBonus: 4,
        hitPoints: 12,
        mainAtkType: "warhammer",
        mainAtkDmg: getAttackDmg(1, 10, 3),
        secAtkType: "breath weapon",
        secAtkDmg: getAttackDmg(2, 6, 0),
        set health(dmgTaken) {
            this.hitPoints -= dmgTaken;
        },
        set heroName(name){
            this.name = name;
        }
    }
};

// helper function counts the number of heros and monsters in above objects (so I can add more easily without changing code)
function countEntries(obj) {
    let count = 0;
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop))
        count ++;
    }
    return count;
};

// helper function gets random entry from monsters or heros
function getRandomEntry(obj) {
    let entry = Math.floor((Math.random() * countEntries(obj)) + 1);
    return entry;
}

// sets a random hero's name to user input - returns number of entry so we know which was selected
function setHeroName(name) {
    let randomHero = getRandomEntry(hero);
    hero[randomHero].heroName = name;
    return randomHero;
};



//random number used in determining attack type and damage
function getRandom() {
    let attack = Math.floor((Math.random() * 2) + 1);
    return attack;
};

function getAttackType(obj, weapon) {
    if(weapon === 1) {
        return obj.mainAtkType;
    } else if (weapon === 2) {
        return obj.secAtkType;
    }
};

function typeAttackDmg(obj, weapon) {
    if(weapon === 1) {
        return obj.mainAtkDmg;
    } else if(weapon === 2) {
        return obj.secAtkDmg;
    }
};


function heroInitiative(hType, hName, mType, monst) {
    let heroType = hType;
    let heroName = hName;
    let monsterType = mType;
    let monsters = monst;
    while ((hero[heroType].hitPoints > 0) && (monster[monsterType].hitPoints > 0)) {
        let heroAtkRoll = attackRoll(hero[heroType].proficiencyBonus);
        let monsterAtkRoll = attackRoll(monster[monsterType].proficiencyBonus);
        let weapon = getRandom();
        let heroAtk = getAttackType(hero[heroType], weapon);
        let heroDmg = typeAttackDmg(hero[heroType], weapon);
        if(hero[heroType].hitPoints > 0) {
            if(heroAtkRoll >= monster[monsterType].armorClass) {
                monster[monsterType].health = heroDmg;
                console.log(`${heroName} hit the ${monsters} for ${heroDmg} hit points with their ${heroAtk}! The ${monsters} has ${monster[monsterType].hitPoints} hit points remaining.`);
            }else {
                console.log(`${heroName} missed the ${monsters} with their ${heroAtk}! The ${monsters} still has ${monster[monsterType].hitPoints} hit points remaining.`);
            }
        }

        let monsterWeapon = getRandom();
        let monsterAtk = getAttackType(monster[monsterType], monsterWeapon);
        let monsterDmg = typeAttackDmg(monster[monsterType], monsterWeapon);
        if(monster[monsterType].hitPoints > 0){
            if(monsterAtkRoll >= hero[heroType].armorClass) {
                hero[heroType].health = monsterDmg;
                console.log(`The ${monsters} hit ${heroName} for ${monsterDmg} hit points with their ${monsterAtk}! ${heroName} has ${hero[heroType].hitPoints} remaining.`);
            } else {
                console.log(`The ${monsters} missed ${heroName} with their ${monsterAtk}! ${heroName} still has ${hero[heroType].hitPoints} remaining.`);
            }
        }

        if((hero[heroType].hitPoints <= 0) || (monster[monsterType].hitPoints <= 0)) {
            if(hero[heroType].hitPoints > monster[monsterType].hitPoints) {
                console.log(`${heroName} defeated the ${monsters} and has ${hero[heroType].hitPoints} hit points remaining!`);
            } else {
                console.log(`The ${monsters} defeated the hero ${heroName} and has ${monster[monsterType].hitPoints} hit points remaining!`);
            }
            break;
        }
    }
};

function monsterInitiative(hType, hName, mType, monst) {
    let heroType = hType;
    let heroName = hName;
    let monsterType = mType;
    let monsters = monst;
    while ((hero[heroType].hitPoints > 0) && (monster[monsterType].hitPoints > 0)) {
        let heroAtkRoll = attackRoll(hero[heroType].proficiencyBonus);
        let monsterAtkRoll = attackRoll(monster[monsterType].proficiencyBonus);
        let monsterWeapon = getRandom();
        let monsterAtk = getAttackType(monster[monsterType], monsterWeapon);
        let monsterDmg = typeAttackDmg(monster[monsterType], monsterWeapon);
        if(monster[monsterType].hitPoints > 0){
            if(monsterAtkRoll >= hero[heroType].armorClass) {
                hero[heroType].health = monsterDmg;
                console.log(`The ${monsters} hit ${heroName} for ${monsterDmg} hit points with their ${monsterAtk}! ${heroName} has ${hero[heroType].hitPoints} remaining.`);
            } else {
                console.log(`The ${monsters} missed ${heroName} with their ${monsterAtk}! ${heroName} still has ${hero[heroType].hitPoints} remaining.`);
            }
        }

        let weapon = getRandom();
        let heroAtk = getAttackType(hero[heroType], weapon);
        let heroDmg = typeAttackDmg(hero[heroType], weapon);
        if(hero[heroType].hitPoints > 0) {
            if(heroAtkRoll >= monster[monsterType].armorClass) {
                monster[monsterType].health = heroDmg;
                console.log(`${heroName} hit the ${monsters} for ${heroDmg} hit points with their ${heroAtk}! The ${monsters} has ${monster[monsterType].hitPoints} hit points remaining.`);
            }else {
                console.log(`${heroName} missed the ${monsters} with their ${heroAtk}! The ${monsters} still has ${monster[monsterType].hitPoints} hit points remaining.`);
            }
        }

        if((hero[heroType].hitPoints <= 0) || (monster[monsterType].hitPoints <= 0)) {
            if(hero[heroType].hitPoints > monster[monsterType].hitPoints) {
                console.log(`${heroName} defeated the ${monsters} and has ${hero[heroType].hitPoints} hit points remaining!`);
            } else {
                console.log(`The ${monsters} defeated the hero ${heroName} and has ${monster[monsterType].hitPoints} hit points remaining!`);
            }
            break;
        }
    }
};

function playGame(name) {
    let heroType = setHeroName(name)
    let heroName = hero[heroType].name;
    let monsterType = getRandomEntry(monster);
    let monsters = monster[monsterType].type;
    let heroIntRoll = initiative();
    let monsterIntRoll = initiative();
    console.log(`${heroName} the ${hero[heroType].type} with ${hero[heroType].hitPoints} hit points is battling a ${monsters} with ${monster[monsterType].hitPoints} hit points!`);
    console.log(`${heroName} rolled a ${heroIntRoll} initiative and ${monsters} rolled a ${monsterIntRoll} initiative.`);
    if(heroIntRoll > monsterIntRoll) {
        console.log(`${heroName} attacks first!`);
        heroInitiative(heroType, heroName, monsterType, monsters);
    } else if(monsterIntRoll > heroIntRoll) {
        console.log(`The ${monsters} attacks first!`)
        monsterInitiative(heroType, heroName, monsterType, monsters);
    }
};

>>>>>>> fead12988ef759e3cb73f327962ef2030793fd5c
playGame('Delaria');