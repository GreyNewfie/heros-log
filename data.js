const quests = [
    {id: 1, name: 'The Trial', description: `You have learned well, my friends. Now has come the time of your first trial. You must first enter the catacombs that contain Fellmarg's tomb. You must seek out and destroy Verag, a foul gargoyle that higes in the catacombs. This quest is not easy, and you must work together in order to survive. This is your first step on the road to becoming true heroes. Tread carefully, my friends.`},
    {id: 2, name: 'The Rescue of Sir Ragnar', description: `Sir Ragnar, one of the King's most powerful knights, has been captured. There is reason to believe that he is being held prisoner by Ulag, the orc warlord. You are to find Sir Ragnar and bring him back to the stairway. Prince Magnus offers a reqard of 240 gold coins, to be divided among the heroes, if they rescue Sir Ragnar. No reward is earned if Sir Ragnar is killed during the escape.`},
    {id: 3, name: 'Lair of the Orc Warlord', description: `Prince Magnus has ordered that the orc warlord, Ulag, who was responsible for the imprisonment of Sir Ragnar, be sought out and destroyed. When Ulag is destroyed, the heroes are to be rewarded 180 gold coins to be divided among them. Any treasure found in Ulag's stronghold may be kept by the finder alone.`},
    {id: 4, name: 'Prince Magnus Gold', description: `Three treasure chests have been stolen while being taken to the king. A reward of 240 gold coins has been offered to any group of heroes who return the chests and all of the gold. The thieves are a well-known band of orcs whose lair is in the Dark Mountains. They are led by Gulthor, a Dread Warrior.`},
    {id: 5, name: `Melar's Maze`, description: `Long ago, a powerful wizard by the name of Melar created a Talisman of Lore that enhances the wearer's understanding of magic. It is rumored that Melar hid the talisman in an underground laboratory at the heart of his maze, fearing it might be stolen by the evil minions of Zargon. As you search for the talisman, beware of many traps and deadly monsters.`},
    {id: 6, name: 'Legacy of the Orc Warlord', description: `Ulag's four offspring, Grak, has sworn revenge on those who killed his father. Although it has taken him several months, he has finally tracked you down and captured you in an ambush. now you are all held prisoner in his dungeons while he decides when and how you will meet your fate. While the guard sleeps outside your cell, you manage to pick the lock with an old rat bone. You must find your equipment and escape to the stairway.`},
    {id: 7, name: 'The Lost Wizard', description: `Wardoz, the King's personal wizard has disappeared. His Majesty fears his wizard has been murdered or succumbed to the lures of Dread magic. You must find out waht happened to Wardoz. You are each to be paid 100 gold coins, upon returning to the stairway.`},
    {id: 8, name: 'The Fire Mage', description: `The orcs of the Dark Mountains have been using Elemental fire magic in their raids. Balur, the fire mage, is thought to be responsible for helping them. No fire magic can harm Balur and the King's wizards are unable to counter his spells. You have therfore been chosen to enter his lair, deep beneath Darkfire Crag. His Majesty offers each hero a reward of 100 gold coins for Balur's destruction.`},
    {id: 9, name: 'Race Against Time', description: `A guide has led you into an underground maze that is rumored to hold a great secret. He has led you down many dark corridors and finally you find yourself in a room with three doors. Suddenly the guide puts out his torch and in the darkness you hear him laugh. 'Farewell, my heroes,' he taunts as he makes his escape. You realize to yoru horror that it is a trap! You must escape (make it back to the stairway) or perish in this dark, forgotten hole.`},
    {id: 10, name: 'Castle of Mystery', description: `Long ago, a wizard named Ollar discovered the entrance to a gold mine. using his great powers, he built a magic castle above the mine to protect it. The lower chamnber of the castle has many magical doors and is guarded by a host of monsters who were trapped in time. Can you find the entrance to the gold mine? Others have tried, but the castle thwarted them every time.`},
    {id: 11, name: 'Bastion of Dread', description: `Lands to the east have been plagued by marauding orcs and goblins who have allied themselves with Zargon. The King has ordered that a band of worthy heroes should be sent forth to destroy them. The orcs are well-protected in a strong underground fortress known as the Bastion of Dread. They are led by a small group of Dread Warriors. You must fight your way in and kill all of the monsters you find. A hero earns a bounty of 10 gold coins for each goblin killed; 20 gold coins for each orc killed; 30 gold coins for each abomination killed; and 50 gold coins for each Dread warrior killed.`},
    {id: 12, name: 'Barak Tor - Barrow of the Witch Lord', description: `War with the eastern orcs is brewing and the King needs to unite the lands for the conflict to come. To do this, you must find the ancient Star of the West as worn by the Rulers of Legend in ages past. A reward of 200 gold coins is offered (to be divided evenly among all heroes) when the Star of the West is returned to safety. The Star of the West lies in Barak Tor, the resting place of the evil Witch Lord. He was defeated by the magical Spirit Blade long ago. This blade is the only weapon that could harm him.`},
    {id: 13, name: 'Quest for the Spirit Blade', description:`You have awoken the Witch Lord! he poses a most serious threat to the King in the coming war. The Witch Lord must be destroyed before he can bring his army of undead to attack His Majesty's forces. Your goal in this quest is to find the Spirit Blade and return it to safety. Only this ancient weapon can harm the Witch Lord. The Spirit Blade was forged by the dwarves of the World End Mountain and cooled in the elven Fountain of Leben. The sword now lies somewhere in an ancient ruined temple.`},
    {id: 14, name: 'Return to Barak Tor', description: `Now that you have found the Spirit Blade, you must return to Barak Tor and defeat the Witch Lord. The King has ridden forth to meet the eastern ocs at Darkfire Pass. If you fail, the Witch Lord will lead his army of undead and attack His Majesty's forces from the rear. Then nothing remains to prevent the forces of Dread from overrunning the land!`}
];

const heroTypes= [
    {
        id: 'wizard',
        name: 'Wizard',
        attackDice: 1,
        defendDice: 2,
        startBodyPts: 4,
        startMindPts: 6,
        movement: 2,
        startingWeapon: 'dagger',
        startingArmor: 'none'
    },
    {
        id: 'dwarf',
        name: 'Dwarf',
        attackDice: 2,
        defendDice: 2,
        startBodyPts: 7,
        startMindPts: 3,
        movement: 2,
        startingWeapon: 'shortsword',
        startingArmor: 'none'
    },
    {
        id: 'barbarian',
        name: 'Barabarian',
        attackDice: 3,
        defendDice: 2,
        startBodyPts: 8,
        startMindPts: 2,
        movement: 2,
        startingWeapon: 'Broadsword',
        startingArmor: 'none'
    },
    {
        id: 'elf',
        name: 'Elf',
        attackDice: 2,
        defendDice: 2,
        startBodyPts: 6,
        startMindPts: 4,
        movement: 2,
        startingWeapon: 'shortsword',
        startingArmor: 'none'
    }
]

const treasure = [
    {
        id: 'potion-of-healing',
        name: 'Potion of Healing',
        description: 'In a bundle of rags, you find a small bottle of bluish liquid. You can drink this healing potion at any time, restoring the number of Body Points equal to a roll of 1 red die. You cannot, however, exceed your starting number of Body Points. This may only be used once. Do not return this card to the deck.',
        classification: 'potion'
    },
    {
        id: 'heroic-brew',
        name: 'Heroic Brew',
        description: 'You are surprised to find a leather bag hanging on the wall. If you drink its contents before you attack, you can make two attacks instead of one. This may only be used once. Do not return this card to the deck.',
        classification: 'potion'
    },
    {
        id: 'potion-of-defense',
        name: 'Potion of Defense',
        description: 'Amidst a collection of old bottles, you find a small vial containing a clear liquid. You can drink this potion at any time, giving you 2 extra combat dice the next time you defend. This may only be used once. Do not return this card to the deck.',
        classification: 'potion'
    },
    {
        id: 'potion-of-healing',
        name: 'Potion of Healing',
        description: 'In a bundle of rags, you find a small bottle of bluish liquid. you can drink this healing potion at any time, restoring the number of Body Points equal to a roll of 1 red die. You cannot, however, exceed your starting number of Body Points. This may only be used once. Do not return this card to the deck.',
        classification: 'potion'
    },
    {
        id: 'potion-of-healing',
        name: 'Potion of Healing',
        description: 'In a bundle of rags, you find a small bottle of bluish liquid. you can drink this healing potion at any time, restoring the number of Body Points equal to a roll of 1 red die. You cannot, however, exceed your starting number of Body Points. This may only be used once. Do not return this card to the deck.',
        classification: 'potion'
    },
    {
        id: 'potion-of-strength',
        name: 'Potion of Strength',
        description: 'You find a small purple flask. You may drink this strange smelling liquid at any time, enabling you to roll 2 extra combat dice the next time you attack. This may only be used once. Do not return this card to the deck.',
        classification: 'potion'
    }
]

const artifacts = [
    {
        id: 'wand-of-magic',
        name: 'Wand of Magic',
        description: 'This magical wand allows a hero to cast two seperate and different spells on their turn instead of one single spell.',
        classification: 'item'
    },
    {
        id: 'ring-of-fortitude',
        name: 'Ring of Fortitude',
        description: `This magical ring raises a hero's Body Points by 1.`,
        classification: 'item'
    },
    {
        id: 'elixir-of-life',
        name: 'Elixir of Life',
        description: 'This small bottle of pearly liquid brings a dead hero back to life, restoring all of their Body and Mind Points. This potion can only be used once.',
        classification: 'item'
    },
    {
        id: `wizards-cloak`,
        name: `Wizard's Cloak`,
        description: 'This magical cloak made of shimmery fabric is covered with mystical runes. It can be worn only by the wizard, giving them 1 extra Defend die.',
        classification: 'armor'
    },
    {
        id: 'ring-of-return',
        name: 'Ring of Return',
        description: 'When invoked, this magical ring returns all heroes that the ring wearer can see to the starting point of the quest. It can only be used once.',
        classification: 'item'
    },
    {
        id: 'rod-of-telekinesis',
        name: 'Rod of Telekinesis',
        description: 'Once per quest, you may use this rod to trap a monster within magical force. A trapped monster misses its next turn. The spell can be resisted immediately by the monster rolling 1 red die for each of their Mind Points. If a 6 is rolled, it resists the spell.',
        classification: 'item'
    },
    {
        id: 'wizards-staff',
        name: `Wizard's Staff`,
        description: 'This long ancient staff glows with a soft blue light. It can be used only buy the wizard, giving them 2 Attack dice and the ability to strike diagonally.',
        classification: 'weapon'
    },
    {
        id: 'spell-ring',
        name: 'Spell Ring',
        description: 'This ring enables a hero to cast one spell two times (not simultaneously). At the beginning of a quest, the wearer of this ring must declare which of their spells are stored in the ring.',
        classification: 'item'
    },
    {
        id: 'talisman-of-lore',
        name: 'Talisman of Lore',
        description: 'This magical medallion increases your Mind Points by 1 for as long as it is worn',
        classification: 'item'
    },
    {
        id: 'borins-armor',
        name: `Borin's Armor`,
        description: 'This magical suit of plate mail gives you 2 extra Defend dice. Unlike normal plate mail, this mysterious, ultralight metal armor does not slow down its wearer. May be combined with the helmet and/or shield. May not be used by the wizard.',
        classification: 'armor'
    },
    {
        id: 'phantom-blade',
        name: 'Phantom Blade',
        description: 'This ornate dagger gives you 1 Attack die. Once per quest, when you attack with the dagger your target may not defend themself as the weapon passes through their armor.',
        classification: 'weapon'
    },
    {
        id: 'orcs-bane',
        name: `Orc's Bane`,
        description: 'When using this magical shortsword, you roll 2 Attack die. You may attack twice if attacking an orc. May not be used by the wizard.',
        classification: 'weapon'
    },
    {
        id: 'fortunes-longsword',
        name: `Fortune's Longsword`,
        description: 'This long blade enables you to attack diagonally and gives you 3 Attack dice. Once per quest, the hero may use its power to reroll 1 Attack die. May not be used by the wizasrd.',
        classification: 'weapon'
    },
    {
        id: 'spirit-blade',
        name: 'Spirit Blade',
        description: 'This magical broadsword has an eerie handle of carved bone. When using it, roll 3 Attack dice, or roll 4 if attacking an undead monster (skeleton, zombie, or mummy). May not be used by the wizard.',
        classification: 'weapon'
    }
]

const equipment = [
    {
        id: 'longsword',
        name: 'Longsword',
        description: 'This long blade gives you the attack strength of 3 combat dice. Because of its length, the longsword enables you to attack diagonally. May not be used by the wizard.',
        classification: 'weapon',
        cost: '350 gold coins'
    }, 
    {
        id: 'potion-of-speed',
        name: 'Potion of Speed',
        description: 'You may drink the potion at any time. It allows you to roll twice as many dice as usual the next time you move. The card is then discarded.',
        classification: 'potion',
        cost: '200 gold coins'
    },
    {
        id: 'dagger',
        name: 'Dagger',
        description: 'This sharp knife gives you the attack strength of 1 combat die. A dagger can also be thrown at any monster you can see but is lost once it is thrown.',
        classification: 'weapon',
        cost: '25 gold coins'
    },
    {
        id: 'bracers',
        name: 'Bracers',
        description: 'These hardened leather bracers give you 1 extra Defend die. May be combined with the helmet and/or shield.',
        classification: 'armor',
        cost: '550 gold coins'
    },
    {
        id: 'longsword',
        name: 'Longsword',
        description: 'This long blade gives you the attack strength of 3 combat dice. Because of its length, the longsword enables you to attack diagonally. May not be used by the wizard.',
        classification: 'weapon',
        cost: '350 gold coins'
    },
    {
        id: 'battle-axe',
        name: 'Battle Axe',
        description: 'This heavy, double-edged axe gives you the attack strength of 4 combat dice. You may not use a shield when using this weapon. May not be used by the wizard.',
        classification: 'weapon',
        cost: '450 gold coins'
    },
    {
        id: 'battle-axe',
        name: 'Battle Axe',
        description: 'This heavy, double-edged axe gives you the attack strength of 4 combat dice. You may not use a shield when using this weapon. May not be used by the wizard.',
        classification: 'weapon',
        cost: '450 gold coins'
    },
    {
        id: 'holy-water',
        name: 'Holy Water',
        description: 'You may use the holy water instead of attacking. It kills any undead creature (skeleton, zombie or mummy). the card is then discarded after use.',
        classification: 'item',
        cost: '400 gold coins'
    },
    {
        id: 'staff',
        name: 'Staff',
        description: 'This long, sturdy, wooden staff gives you the attack strength of 1 combat die. Because of its length, the staff enables you to attack diagonally. You may not use a shield when using this weapon.',
        classification: 'weapon',
        cost: '100 gold coins'
    },
    {
        id: 'helmet',
        name: 'Helmet',
        description: 'This protective headpiece gives you 1 extra Defend die. May not be worn by the wizard.',
        classification: 'armor',
        cost: '125 gold coins'
    },
    {
        id: 'crossbow',
        name: 'Crossbow',
        description: 'This long-range weapon gives you the attack strength of 3 combat dice. You may fire at any monster that you can see. However, you cannot fire at a monster that is adjacent to you. You have an unlimited supply of arrows. May not be used by the wizard.',
        classification: 'weapon',
        cost: '350 gold coins'
    },
    {
        id: 'broadsword',
        name: 'Broadsword',
        description: 'This wide blade gives you the attack strength of 3 combat dice. May not be used by the wizard.',
        classification: 'weapon',
        cost: '250 gold coins'
    },
    {
        id: 'shortsword',
        name: 'Shortsword',
        description: 'This short sword gives you the attack strength of 2 combat dice. May not be used by the wizard.',
        classification: 'weapon',
        cost: '150 gold coins'
    },
    {
        id: 'shield',
        name: 'Shield',
        description: 'This hand-held armor gives you 1 extra Defend dice. May not be used with the battle axe or staff. May not be used by the wizard.',
        classification: 'armor',
        cost: '150 gold coins'
    },
    {
        id: 'shield',
        name: 'Shield',
        description: 'This hand-held armor gives you 1 extra Defend dice. May not be used with the battle axe or staff. May not be used by the wizard.',
        classification: 'armor',
        cost: '150 gold coins'
    },
    {
        id: 'shield',
        name: 'Shield',
        description: 'This hand-held armor gives you 1 extra Defend dice. May not be used with the battle axe or staff. May not be used by the wizard.',
        classification: 'armor',
        cost: '150 gold coins'
    },
    {
        id: 'chain-mail',
        name: 'Chain Mail',
        description: 'This light metal armor gives you 1 extra Defend die. May by combined with the helmet and/or shield. May not be worn by the wizard.',
        classification: 'armor',
        cost: '500 gold coins'
    },
    {
        id: 'handaxe',
        name: 'Handaxe',
        description: 'This handaxe allows you to roll 2 Attack dice. It can also be thrown at any monster in your line of sight but is lost once it is thrown.',
        classification: 'weapon',
        cost: '200 gold coins'
    },
    {
        id: 'crossbow',
        name: 'Crossbow',
        description: 'This long-range weapon gives you the attack strength of 3 combat dice. You may fire at any monster that you can see. However, you cannot fire at a monster that is adjacent to you. You have an unlimited supply of arrows. May not be used by the wizard.',
        classification: 'weapon',
        cost: '350 gold coins'
    },
    {
        id: 'helmet',
        name: 'Helmet',
        description: 'This protective headpiece gives you 1 extra Defend die. May not be worn by the wizard.',
        classification: 'armor',
        cost: '125 gold coins'
    },
    {
        id: 'helmet',
        name: 'Helmet',
        description: 'This protective headpiece gives you 1 extra Defend die. May not be worn by the wizard.',
        classification: 'armor',
        cost: '125 gold coins'
    },
    {
        id: 'tool-kit',
        name: 'Tool Kit',
        description: 'This tool kit gives you a 50 percent chance to disarm any searched-for-and-found (but unsprung) trap. (See "Action 6: Disarm a Trap" in the the rulebook.)',
        classification: 'item',
        cost: '250 gold coins'
    },
    {
        id: 'plate-mail',
        name: 'Plate Mail',
        description: 'This heavy metal armor gives you 2 extra Defend dice. However, because it is so heavy, you may only roll 1 red die for movement while wearing it. May be combined with the helmet and/or shield. May not be worn by the wizard.',
        classification: 'armor',
        cost: '850 gold coins'
    },
    {
        id: 'potion-of-speed',
        name: 'Potion of Speed',
        description: 'You may drink the potion at any time. It allows you to roll twice as many dice as usual the next time you move. The card is then discarded.',
        classification: 'potion',
        cost: '200 gold coins'
    },
    {
        id: 'holy-water',
        name: 'Holy Water',
        description: 'You may use the holy water instead of attacking. It kills any undead creatue (skeleton, zombie, or mummy). The card is then discarded after use.',
        classification: 'item',
        cost: '400 gold coins'
    }
]