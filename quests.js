const createQuest = (quest) => {
    const {id: questNum, name: questName} = quest;

    const questsContainer = document.getElementById('quests-container');

    // Quest 
    const questSheet = document.createElement('div');
    setAttributes(questSheet, {class: 'quest-sheet', id: `quest-${questNum}-sheet`});
    questsContainer.append(questSheet);

    // Quest title section
    const questTitle = document.createElement('div');
    setAttributes(questTitle, {class: 'quest-title', id:`quest-${questNum}-title`});

    const questTitleNum = document.createElement('h3');
    questTitleNum.append(`Quest ${questNum}`);

    const questTitleName = document.createElement('h4');
    questTitleName.append(questName);

    questTitle.append(questTitleNum, questTitleName);

    // Quest status section
    const questStatus = document.createElement('div');
    questStatus.setAttribute('class', 'quest-status');

    const questStatusSelLabel = document.createElement('label');
    questStatusSelLabel.setAttribute('for', `quest-${questNum}-status`);
    questStatusSelLabel.textContent = 'Quest Status: ';

    const questStatusSel = document.createElement('select');
    setAttributes(questStatusSel, {id: `quest-${questNum}-status`, name: 'quest-status'});
    addTypeOptions(questStatusSel, {'not-started': 'Not Started', 'current-quest': 'Current Quest', complete: 'Complete'});
    questStatusSel.addEventListener('change', (event) => {
        const questSheet = event.target.parentNode.parentNode;
        const questStatus = event.target.value;
        updateQuest(quests, questSheet, questStatus);
        });

    questStatus.append(questStatusSelLabel, questStatusSel);

    // Append all elements to Quest Sheet
    questSheet.append(questTitle, questStatus);
}

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

function displayQuests() {
    displayQuestList();
    const storedQuests = getStoredQuests();

    if (!storedQuests || storedQuests.length === 0) {
        createQuest(quests[0]);
    } else {
        storedQuests.forEach(storedQuest => {
            const quest = getQuest(quests, storedQuest);
            createQuest(quest);
            const questSheet = document.getElementById(storedQuest.id);
            switch (storedQuest.status) {
                case 'current-quest':
                    const currentQuest = getQuest(quests, questSheet);
                    addQuestDescription(questSheet, currentQuest.description);
                    addCurrentQuestHeroes(questSheet, storedQuest.heroes);
                    updateQuestStatus(questSheet, storedQuest);
                break;
                case 'complete':
                    addQuestDescription(questSheet, quest.description);
                    addCompletedQuestHeroes(questSheet, storedQuest.heroes);
                    updateQuestStatus(questSheet, storedQuest);
                    if (quest.id === (storedQuests.length)) {
                        displayNextQuest(questSheet);
                    }                        
                break;    
            }
        })    
    }
}

function displayQuestList() {
    const questList = document.getElementById('quest-list');

    const questListHeader = document.createElement('h3');
    questListHeader.setAttribute('class', 'quest-list-header');
    questListHeader.textContent = 'Quests List';
    questList.appendChild(questListHeader);

    quests.forEach(quest => {
        const listLi = document.createElement('li');
        listLi.setAttribute('id', `quest-${quest.id}`);
        listLi.textContent = `Quest ${quest.id}`;
        if (getStoredQuest(quest)) {
            listLi.setAttribute('class', `list-item`);
        } else {
            listLi.setAttribute('class', 'list-item not-started');
        }
        questList.appendChild(listLi);
    })
}

function displayNextQuest(questSheet) {
    const currentQuest = getQuest(quests, questSheet);
    const questId = currentQuest.id;
    const nextQuest = quests[currentQuest.id];
    if (!isQuestDisplayed(nextQuest)) {
        createQuest(nextQuest);
    }
}

function updateQuest(quests, questSheet, questStatus) {
    const characters = getCharacters();
    const quest = getQuest(quests, questSheet);
    const storedQuest = getStoredQuest(quest);
    switch (questStatus) {
        case 'not-started':
            removeQuestHeroes(questSheet);
            deleteQuest(questSheet);
            break;
        case 'current-quest':
            if (characters === null || characters.length === 0) {
                const alert = document.querySelector('.alert');
                const alertMessage = document.querySelector('.alert-message');
                alertMessage.textContent = 'Input your character(s) before starting your quest';
                alert.classList.remove('hide-element');
                closeAlert();
                updateQuestStatus(questSheet);
            } else {
                removeQuestHeroes(questSheet);
                const quest = getQuest(quests, questSheet);
                addQuestDescription(questSheet, quest.description);
                addHeroOptions(questSheet);
                removeNotStartedClass(questSheet);
            }
            break;
        case 'complete':
            if (storedQuest) {
                addCompletedHeroOptions(questSheet);
                removeQuestHeroes(questSheet);
                displayNextQuest(questSheet); 
            } else {
                const alert = document.querySelector('.alert');
                const alertMessage = document.querySelector('.alert-message');
                alertMessage.textContent = 'You\'re not quite there. You mush start a quest before you can complete it.';
                alert.classList.remove('hide-element');
                closeAlert();
                updateQuestStatus(questSheet, storedQuest);
            }
            break;
    }
}

function isQuestDisplayed(quest) {
    const foundQuestSheet = document.getElementById(`quest-${quest.id}-sheet`);
    return foundQuestSheet;
}

function addQuestDescription(questSheet, questDescription) {
    const existingDescription = questSheet.querySelector('div.quest-description');    
    if (!existingDescription) {
    const description = document.createElement('div');
    description.setAttribute('class', 'quest-description');

    const descriptionP = document.createElement('p');
    descriptionP.append(questDescription);
    description.append(descriptionP);

    questSheet.append(description);
    }
}

function getQuest(quests, { id }) {
    const [, questNum] = id.split('-');
    const quest = quests[(questNum-1)];

    return quest;
}

function addHeroOptions(questSheet) {
    const heroes = getCharacters();
    const heroesFieldset = document.getElementById('heroes-fieldset');
    const startQuestBtn = document.getElementById('start-quest-btn');
    startQuestBtn.textContent = 'Start Quest';

    heroes.forEach((hero) => {
        const heroOptionContainer = document.createElement('div');
        heroOptionContainer.setAttribute('class', 'hero-option');

        const heroOptionLabel = document.createElement('label');
        heroOptionLabel.setAttribute('for', hero.name);
        heroOptionLabel.textContent = hero.name;
        heroOptionContainer.appendChild(heroOptionLabel);

        const heroOptionInput = document.createElement('input');
        setAttributes(heroOptionInput, {type: 'checkbox', id: hero.name, name: hero.name});
        heroOptionLabel.appendChild(heroOptionInput);

        const checkmark = document.createElement('span');
        checkmark.setAttribute('class', 'checkmark');
        heroOptionLabel.appendChild(checkmark);

        heroesFieldset.insertBefore(heroOptionContainer, startQuestBtn);
    });

    const heroesPopup = document.querySelector('.pick-heroes');
    heroesPopup.classList.add('show');

    startQuestBtn.addEventListener('click', () => {
        const selectedHeroes = getSelectedHeroes();
        addCurrentQuestHeroes(questSheet, selectedHeroes);
        storeQuest(questSheet, selectedHeroes);
        heroesPopup.classList.remove('show');
        removeHeroOptions();
    }, {
        once: true
    });
}

function addCompletedHeroOptions(questSheet) {
        const liList = document.getElementById(`hero-options-${questSheet.id}`).getElementsByTagName('li');
        const heroesFieldset = document.getElementById('heroes-fieldset');
        const startQuestBtn = document.getElementById('start-quest-btn');
        startQuestBtn.textContent = 'Complete Quest';
        const heroes = [];
    
        for (let i = 0; i < liList.length; i++) {
            const hero = liList[i].innerText;
            heroes.push(hero);
        }
    
        heroes.forEach((hero) => {
            const heroOptionContainer = document.createElement('div');
            heroOptionContainer.setAttribute('class', 'hero-option');
    
            const heroOptionLabel = document.createElement('label');
            heroOptionLabel.setAttribute('for', hero);
            heroOptionLabel.textContent = hero;
            heroOptionContainer.appendChild(heroOptionLabel);
    
            const heroOptionInput = document.createElement('input');
            setAttributes(heroOptionInput, {type: 'checkbox', id: hero, name: hero});
            heroOptionLabel.appendChild(heroOptionInput);
    
            const checkmark = document.createElement('span');
            checkmark.setAttribute('class', 'checkmark');
            heroOptionLabel.appendChild(checkmark);
    
            heroesFieldset.insertBefore(heroOptionContainer, startQuestBtn);    
        });
    
        const chooseHeroesLabel = document.getElementById('heroes-fieldset').querySelector('legend');
        chooseHeroesLabel.textContent = 'Which heroes completed the quest?';
    
        const heroesPopup = document.querySelector('.pick-heroes');
        heroesPopup.classList.add('show');
    
        startQuestBtn.addEventListener('click', () => {
            const selectedHeroes = getSelectedHeroes();
            addCompletedQuestHeroes(questSheet, selectedHeroes);
            storeQuest(questSheet, selectedHeroes);
            heroesPopup.classList.remove('show');
            removeHeroOptions();
        }, {
            once: true
        });    
}

function getSelectedHeroes() {
    const heroOptions = document.querySelectorAll('fieldset input');
    const selectedHeroes = [];

    heroOptions.forEach((hero) => {
        if (hero.checked) {
            selectedHeroes.push(hero.name);
        }
    })
    return selectedHeroes;
}

function addCurrentQuestHeroes(questSheet, selectedHeroes) {    
    if (!questSheet.querySelector('div.quest-heroes')) {
        const heroesOnQuestDiv = document.createElement('div');
        heroesOnQuestDiv.setAttribute('class', 'quest-heroes');

        const heroesOnQuestH4 = document.createElement('h4');
        heroesOnQuestH4.textContent = 'Heroes on Quest';
        heroesOnQuestDiv.appendChild(heroesOnQuestH4);

        const heroesOnQuestUl = document.createElement('ul');
        heroesOnQuestUl.setAttribute('id', `hero-options-${questSheet.id}`);
        heroesOnQuestDiv.appendChild(heroesOnQuestUl);

        questSheet.append(heroesOnQuestDiv);

        selectedHeroes.forEach((hero) => {
            const heroList = document.getElementById(`hero-options-${questSheet.id}`);
            const heroesOnQuestLi = document.createElement('li');
            heroesOnQuestLi.textContent = hero;
            heroList.appendChild(heroesOnQuestLi);
        });
    }
}

function addCompletedQuestHeroes(questSheet, selectedHeroes) {
    
    if (!questSheet.querySelector('div.quest-heroes')) {
        const heroesOnQuestDiv = document.createElement('div');
        heroesOnQuestDiv.setAttribute('class', 'quest-heroes');

        const heroesOnQuestH4 = document.createElement('h4');
        heroesOnQuestH4.textContent = 'Quest Completed By:';
        heroesOnQuestDiv.appendChild(heroesOnQuestH4);

        const heroesOnQuestUl = document.createElement('ul');
        heroesOnQuestUl.setAttribute('id', `hero-options-${questSheet.id}`);
        heroesOnQuestDiv.appendChild(heroesOnQuestUl);

        questSheet.append(heroesOnQuestDiv);

        selectedHeroes.forEach((hero) => {
            const heroList = document.getElementById(`hero-options-${questSheet.id}`);
            const heroesOnQuestLi = document.createElement('li');
            heroesOnQuestLi.textContent = hero;
            heroList.appendChild(heroesOnQuestLi);
        });
    }
}

function removeHeroOptions() {
    const heroOpptions = document.querySelectorAll('.hero-option');
    heroOpptions.forEach((option) => {
        option.remove();
    });
}

function removeQuestHeroes(currentQuest) {
    const currentQuestDescription = currentQuest.querySelector('.quest-description');
    const currentHeroesOnQuest = currentQuest.querySelector('.quest-heroes');

    if (currentHeroesOnQuest) {
        currentHeroesOnQuest.remove();
    }
}

function updateQuestStatus(quest, storedQuest) {
    const status = quest.getElementsByTagName('select');
    if (storedQuest) {
        status[0].value = storedQuest.status;
    } else {
        status[0].value = 'not-started';
    }
}

function removeNotStartedClass({ id }) {
    const array = id.split('-');
    const questId = `${array[0]}-${array[1]}`;
    const quest = document.getElementById(questId);
    quest.classList.remove('not-started');
}

displayQuests();